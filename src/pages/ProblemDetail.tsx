import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Editor, { OnMount } from "@monaco-editor/react";
import { editor, MarkerSeverity } from "monaco-editor";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Terminal,
  Play,
  Send,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import MobileViewToggle from "@/components/mobile/MobileViewToggle";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import HintsPanel from "@/components/editor/HintsPanel";
import AchievementsPanel from "@/components/achievements/AchievementsPanel";
import DifficultyVoting from "@/components/social/DifficultyVoting";
import Comments from "@/components/social/Comments";
import { useEditorSettings } from "@/hooks/useEditorSettings";
import { useAchievements } from "@/hooks/useAchievements";

interface Sample {
  input: string;
  output: string;
  explanation?: string;
}

interface Problem {
  id: string;
  title: string;
  statement: string;
  difficulty: string;
  tags: string[];
  input_format: string;
  output_format: string;
  constraints: string;
  samples: Sample[];
  time_limit: number;
}

interface Submission {
  id: string;
  status: string;
  created_at: string;
  execution_time: number;
}

interface ExecutionStep {
  step: string;
  status: "pending" | "running" | "done" | "error";
}

const DEFAULT_CODE = `# Write your Python solution here

def solve():
    # Read input
    line = input()
    
    # Your solution
    
    # Print output
    print(line)

solve()
`;

const getStorageKey = (problemId: string) => `pychef_code_${problemId}`;

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const { settings: editorSettings } = useEditorSettings();
  const { checkSubmissionAchievements } = useAchievements();
  
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<{ editor: typeof editor; MarkerSeverity: typeof MarkerSeverity } | null>(null);
  const vimModeRef = useRef<{ dispose: () => void } | null>(null);

  const [problem, setProblem] = useState<Problem | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"success" | "error" | "info" | null>(null);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [mobileView, setMobileView] = useState<"description" | "editor" | "output">("description");

  // Swipe gesture for mobile
  const swipeHandlers = useSwipeGesture({
    threshold: 75,
    onSwipeLeft: () => setMobileView("editor"),
    onSwipeRight: () => setMobileView("description"),
  });

  // Force layout when editor becomes visible
  useEffect(() => {
    if (mobileView !== "editor") return;
    const raf = requestAnimationFrame(() => editorRef.current?.layout());
    const timeout = setTimeout(() => editorRef.current?.layout(), 60);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [mobileView]);

  // Vim mode toggle
  useEffect(() => {
    const editorInstance = editorRef.current;
    if (!editorInstance) return;

    let cancelled = false;

    const applyVim = async () => {
      vimModeRef.current?.dispose();
      vimModeRef.current = null;

      if (!editorSettings.vim_mode) return;

      const { initVimMode } = await import("monaco-vim");
      if (cancelled) return;

      const statusNode = document.createElement("div");
      vimModeRef.current = initVimMode(editorInstance, statusNode);
    };

    applyVim();

    return () => {
      cancelled = true;
      vimModeRef.current?.dispose();
      vimModeRef.current = null;
    };
  }, [editorSettings.vim_mode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      vimModeRef.current?.dispose();
    };
  }, []);

  // Load saved code
  useEffect(() => {
    if (id) {
      const savedCode = localStorage.getItem(getStorageKey(id));
      if (savedCode) {
        setCode(savedCode);
        setLastSaved(new Date());
      }
    }
  }, [id]);

  // Auto-save
  useEffect(() => {
    if (!id || !editorSettings.auto_save) return;

    const timeout = setTimeout(() => {
      if (code && code !== DEFAULT_CODE) {
        localStorage.setItem(getStorageKey(id), code);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [code, id, editorSettings.auto_save]);

  // Fetch problem
  useEffect(() => {
    if (id) fetchProblem();
  }, [id]);

  // Fetch submissions
  useEffect(() => {
    if (id && user) fetchSubmissions();
  }, [id, user]);

  const fetchProblem = async () => {
    const { data, error } = await supabase
      .from("problems")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Problem not found");
      navigate("/problems");
      return;
    }

    setProblem({
      id: data.id,
      title: data.title,
      statement: data.statement,
      difficulty: data.difficulty,
      tags: data.tags || [],
      input_format: data.input_format || "",
      output_format: data.output_format || "",
      constraints: data.constraints || "",
      samples: (Array.isArray(data.samples) ? data.samples : []) as unknown as Sample[],
      time_limit: data.time_limit,
    });
    setIsLoading(false);
  };

  const fetchSubmissions = async () => {
    if (!user || !id) return;

    const { data } = await supabase
      .from("submissions")
      .select("id, status, created_at, execution_time")
      .eq("user_id", user.id)
      .eq("problem_id", id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (data) setSubmissions(data);
  };

  const handleEditorMount: OnMount = (editorInstance, monaco) => {
    editorRef.current = editorInstance;
    monacoRef.current = { editor: monaco.editor, MarkerSeverity: monaco.MarkerSeverity };

    // Keyboard shortcuts
    editorInstance.onKeyDown((e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (!isCmdOrCtrl) return;

      if (e.keyCode === monaco.KeyCode.Enter) {
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) handleSubmit();
        else handleRun();
      }
    });
  };

  const updateStep = (stepIndex: number, status: ExecutionStep["status"]) => {
    setExecutionSteps((prev) =>
      prev.map((step, i) => (i === stepIndex ? { ...step, status } : step))
    );
  };

  const handleRun = async () => {
    if (!user) {
      toast.error("Please log in to run code");
      navigate("/auth");
      return;
    }

    if (code.trim().length < 10) {
      toast.error("Please write some code first");
      return;
    }

    setIsRunning(true);
    setOutput(null);
    setVerdict(null);
    if (window.innerWidth < 768) setMobileView("output");

    setExecutionSteps([
      { step: "Parsing code", status: "running" },
      { step: "Validating syntax", status: "pending" },
      { step: "Running with sample input", status: "pending" },
      { step: "Generating output", status: "pending" },
    ]);

    try {
      await new Promise((r) => setTimeout(r, 300));
      updateStep(0, "done");
      updateStep(1, "running");

      await new Promise((r) => setTimeout(r, 300));
      updateStep(1, "done");
      updateStep(2, "running");

      const { data, error } = await supabase.functions.invoke("python-judge", {
        body: { problem_id: id, code, user_id: user.id, run_only: true },
      });

      if (error) throw error;

      updateStep(2, "done");
      updateStep(3, "running");
      await new Promise((r) => setTimeout(r, 200));
      updateStep(3, "done");

      setOutput(data.output);
      setVerdict(data.status === "Executed" ? "info" : "error");
    } catch (error) {
      console.error("Run error:", error);
      setExecutionSteps((prev) =>
        prev.map((step) =>
          step.status === "running" ? { ...step, status: "error" } : step
        )
      );
      setOutput("Failed to execute code. Please try again.");
      setVerdict("error");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to submit");
      navigate("/auth");
      return;
    }

    if (code.trim().length < 10) {
      toast.error("Please write some code first");
      return;
    }

    setIsSubmitting(true);
    setOutput(null);
    setVerdict(null);
    if (window.innerWidth < 768) setMobileView("output");

    setExecutionSteps([
      { step: "Parsing code", status: "running" },
      { step: "Validating syntax", status: "pending" },
      { step: "Running test cases", status: "pending" },
      { step: "Comparing outputs", status: "pending" },
      { step: "Recording submission", status: "pending" },
    ]);

    try {
      await new Promise((r) => setTimeout(r, 300));
      updateStep(0, "done");
      updateStep(1, "running");

      await new Promise((r) => setTimeout(r, 300));
      updateStep(1, "done");
      updateStep(2, "running");

      const { data, error } = await supabase.functions.invoke("python-judge", {
        body: { problem_id: id, code, user_id: user.id, run_only: false },
      });

      if (error) throw error;

      updateStep(2, "done");
      updateStep(3, "running");
      await new Promise((r) => setTimeout(r, 200));
      updateStep(3, "done");
      updateStep(4, "running");
      await new Promise((r) => setTimeout(r, 200));
      updateStep(4, "done");

      setOutput(data.output);
      setVerdict(data.status === "Accepted" ? "success" : "error");

      if (data.status === "Accepted") {
        toast.success("🎉 Accepted! +50 XP");
        refreshProfile();
        checkSubmissionAchievements(user.id, true, new Date());
      } else {
        toast.error(data.status);
        checkSubmissionAchievements(user.id, false, new Date());
      }

      fetchSubmissions();
    } catch (error) {
      console.error("Submit error:", error);
      setExecutionSteps((prev) =>
        prev.map((step) =>
          step.status === "running" ? { ...step, status: "error" } : step
        )
      );
      setOutput("Failed to submit code. Please try again.");
      setVerdict("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{problem.title} - PyChef</title>
        <meta
          name="description"
          content={`Solve the ${problem.title} problem on PyChef. ${problem.difficulty} difficulty.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="h-12 sm:h-14 border-b border-border bg-card flex items-center px-3 sm:px-4 gap-3">
          <Link
            to="/problems"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Problems</span>
          </Link>

          <div className="h-5 w-px bg-border hidden sm:block" />

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="font-semibold text-foreground truncate text-sm sm:text-base">
              {problem.title}
            </h1>
            <Badge
              variant="secondary"
              className={`text-xs shrink-0 ${
                problem.difficulty === "Easy"
                  ? "bg-green-500/20 text-green-400"
                  : problem.difficulty === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {problem.difficulty}
            </Badge>
          </div>

          {/* Desktop features */}
          <div className="hidden md:flex items-center gap-2">
            <AchievementsPanel />
            {id && <HintsPanel problemId={id} />}
            {id && <Comments problemId={id} />}
            {problem && (
              <DifficultyVoting
                problemId={id!}
                currentDifficulty={problem.difficulty}
              />
            )}
          </div>
        </header>

        {/* Mobile View Toggle */}
        <MobileViewToggle
          activeView={mobileView}
          onViewChange={setMobileView}
          hasOutput={!!output}
        />

        {/* Main Content */}
        <div
          className="flex-1 flex flex-col md:flex-row overflow-hidden"
          {...swipeHandlers}
        >
          {/* Problem Description */}
          <div
            className={`md:w-1/2 border-r border-border bg-card overflow-hidden flex-col ${
              mobileView === "description" ? "flex flex-1" : "hidden md:flex"
            }`}
          >
            <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto">
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="submissions"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
                  >
                    Submissions ({submissions.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-4 sm:p-6 m-0">
                  <div className="space-y-6">
                    <p className="text-foreground whitespace-pre-line text-sm sm:text-base">
                      {problem.statement}
                    </p>

                    {problem.input_format && (
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-2">
                          Input Format
                        </h3>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {problem.input_format}
                        </p>
                      </div>
                    )}

                    {problem.output_format && (
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-2">
                          Output Format
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {problem.output_format}
                        </p>
                      </div>
                    )}

                    {problem.constraints && (
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-2">
                          Constraints
                        </h3>
                        <pre className="text-sm text-muted-foreground bg-secondary p-3 rounded-lg whitespace-pre-line">
                          {problem.constraints}
                        </pre>
                      </div>
                    )}

                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-3">
                        Examples
                      </h3>
                      {problem.samples.map((sample, index) => (
                        <div
                          key={index}
                          className="mb-4 rounded-lg border border-border overflow-hidden"
                        >
                          <div className="bg-secondary/50 px-4 py-2 border-b border-border">
                            <span className="text-sm font-medium">
                              Example {index + 1}
                            </span>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                Input
                              </span>
                              <pre className="mt-1 p-3 bg-secondary rounded text-sm font-mono">
                                {sample.input}
                              </pre>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                Output
                              </span>
                              <pre className="mt-1 p-3 bg-secondary rounded text-sm font-mono">
                                {sample.output}
                              </pre>
                            </div>
                            {sample.explanation && (
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Explanation
                                </span>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {sample.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-muted-foreground">Tags:</span>
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="submissions" className="p-4 sm:p-6 m-0">
                  {submissions.length === 0 ? (
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No submissions yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                        >
                          <div className="flex items-center gap-3">
                            {sub.status === "Accepted" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400" />
                            )}
                            <span
                              className={`font-medium text-sm ${
                                sub.status === "Accepted"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {sub.status}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(sub.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Code Editor Panel */}
          <div
            className={`flex flex-col md:flex-1 bg-secondary ${
              mobileView === "editor" ? "flex flex-1" : "hidden md:flex"
            }`}
          >
            {/* Editor Header */}
            <div className="h-12 flex items-center justify-between px-4 bg-muted border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium text-foreground">
                    solution.py
                  </span>
                  <Badge variant="secondary" className="text-xs font-normal">
                    Python 3.11
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {lastSaved && (
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <Save className="h-3.5 w-3.5" />
                    <span>
                      {lastSaved.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
                <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono">
                    ⌘↵
                  </kbd>
                  <span>Run</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono ml-2">
                    ⌘⇧↵
                  </kbd>
                  <span>Submit</span>
                </div>
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 min-h-0 relative bg-[hsl(var(--editor-bg))]">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onMount={handleEditorMount}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: editorSettings.font_size,
                  fontFamily: "JetBrains Mono, monospace",
                  minimap: { enabled: false },
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: editorSettings.show_line_numbers ? "on" : "off",
                  scrollBeyondLastLine: false,
                  wordWrap: editorSettings.word_wrap ? "on" : "off",
                  automaticLayout: true,
                  cursorBlinking: "smooth",
                  cursorSmoothCaretAnimation: "on",
                  smoothScrolling: true,
                  renderLineHighlight: "all",
                  lineHeight: 1.6,
                  folding: true,
                  bracketPairColorization: { enabled: true },
                }}
              />
            </div>

            {/* Execution Progress */}
            {(isRunning || isSubmitting) && executionSteps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border-t border-border bg-muted px-4 py-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {isSubmitting ? "Submitting..." : "Running..."}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {executionSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {step.status === "pending" && (
                        <div className="h-3 w-3 rounded-full border border-muted-foreground/30" />
                      )}
                      {step.status === "running" && (
                        <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                      )}
                      {step.status === "done" && (
                        <CheckCircle2 className="h-3 w-3 text-success" />
                      )}
                      {step.status === "error" && (
                        <XCircle className="h-3 w-3 text-destructive" />
                      )}
                      <span
                        className={`text-xs ${
                          step.status === "pending"
                            ? "text-muted-foreground"
                            : step.status === "running"
                            ? "text-foreground"
                            : step.status === "done"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Output Panel */}
            {output && !isRunning && !isSubmitting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`border-t overflow-hidden ${
                  verdict === "success"
                    ? "border-success/30 bg-success/5"
                    : verdict === "error"
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-border bg-muted"
                }`}
              >
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    {verdict === "success" && (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          Accepted
                        </span>
                      </>
                    )}
                    {verdict === "error" && (
                      <>
                        <XCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">
                          Failed
                        </span>
                      </>
                    )}
                    {verdict === "info" && (
                      <>
                        <Terminal className="h-4 w-4 text-info" />
                        <span className="text-sm font-medium text-info">
                          Output
                        </span>
                      </>
                    )}
                  </div>
                  <pre
                    className={`text-sm font-mono whitespace-pre-wrap p-3 rounded-lg ${
                      verdict === "success"
                        ? "bg-success/10 text-success"
                        : verdict === "error"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {output}
                  </pre>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile Output View */}
          <div
            className={`flex-1 flex-col bg-muted overflow-auto ${
              mobileView === "output" ? "flex md:hidden" : "hidden"
            }`}
          >
            <div className="h-12 border-b border-border flex items-center px-4 bg-card">
              <Terminal className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Output</span>
            </div>
            <div className="flex-1 p-4">
              {(isRunning || isSubmitting) && executionSteps.length > 0 && (
                <div className="space-y-2 mb-4 p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {isSubmitting ? "Submitting..." : "Running..."}
                    </span>
                  </div>
                  {executionSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {step.status === "pending" && (
                        <div className="h-3 w-3 rounded-full border border-muted-foreground/30" />
                      )}
                      {step.status === "running" && (
                        <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                      )}
                      {step.status === "done" && (
                        <CheckCircle2 className="h-3 w-3 text-success" />
                      )}
                      {step.status === "error" && (
                        <XCircle className="h-3 w-3 text-destructive" />
                      )}
                      <span
                        className={`text-xs ${
                          step.status === "pending"
                            ? "text-muted-foreground"
                            : step.status === "running"
                            ? "text-foreground"
                            : step.status === "done"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {output ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg overflow-hidden ${
                    verdict === "success"
                      ? "bg-success/10 border border-success/30"
                      : verdict === "error"
                      ? "bg-destructive/10 border border-destructive/30"
                      : "bg-card border border-border"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-inherit flex items-center gap-2">
                    {verdict === "success" && (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <span className="font-medium text-success">Accepted</span>
                      </>
                    )}
                    {verdict === "error" && (
                      <>
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span className="font-medium text-destructive">Failed</span>
                      </>
                    )}
                    {verdict === "info" && (
                      <>
                        <AlertCircle className="h-5 w-5 text-info" />
                        <span className="font-medium text-info">Executed</span>
                      </>
                    )}
                  </div>
                  <pre
                    className={`p-4 text-sm font-mono whitespace-pre-wrap ${
                      verdict === "success"
                        ? "text-success"
                        : verdict === "error"
                        ? "text-destructive"
                        : "text-foreground"
                    }`}
                  >
                    {output}
                  </pre>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="p-4 rounded-full bg-secondary mb-4">
                    <Terminal className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground">No output yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Run your code to see the output here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="h-12 px-6 text-sm font-semibold bg-card hover:bg-secondary border-border shadow-card backdrop-blur-sm"
          >
            {isRunning ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run
          </Button>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="h-12 px-6 text-sm font-semibold bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-button"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Submit
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default ProblemDetail;