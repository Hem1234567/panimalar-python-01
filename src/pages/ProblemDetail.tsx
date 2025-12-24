import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Editor, { OnMount } from "@monaco-editor/react";
import { editor, MarkerSeverity } from "monaco-editor";
import {
  ArrowLeft,
  Play,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Save,
  RotateCcw,
  Wand2,
  Copy,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import FloatingActionButtons from "@/components/mobile/FloatingActionButtons";
import MobileViewToggle from "@/components/mobile/MobileViewToggle";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import KeyboardShortcutsDialog from "@/components/editor/KeyboardShortcutsDialog";
import CodeHistoryPanel from "@/components/editor/CodeHistoryPanel";
import HintsPanel from "@/components/editor/HintsPanel";
import CodeTemplatesPanel from "@/components/editor/CodeTemplatesPanel";
import AchievementsPanel from "@/components/achievements/AchievementsPanel";
import DifficultyVoting from "@/components/social/DifficultyVoting";
import Comments from "@/components/social/Comments";
import { useSettings } from "@/contexts/SettingsContext";
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
  message?: string;
}

const defaultCode = `# Write your Python solution here

def solve():
    # Read input
    line = input()
    
    # Your solution
    
    # Print output
    print(line)

solve()
`;

// Common Python error patterns for highlighting
const pythonErrorPatterns = [
  { regex: /\bprint\s+[^(]/, message: "Missing parentheses in print. Use print()" },
  { regex: /\bindent(?:ation)?error/i, message: "Indentation error detected" },
  { regex: /=\s*=/, message: "Use '==' for comparison, not '= ='" },
  { regex: /def\s+\w+[^(]/, message: "Function definition missing parentheses" },
  { regex: /\bif\s+[^:]+[^:]$/, message: "Missing colon after if statement" },
  { regex: /\bfor\s+[^:]+[^:]$/, message: "Missing colon after for statement" },
  { regex: /\bwhile\s+[^:]+[^:]$/, message: "Missing colon after while statement" },
  { regex: /\belif\s+[^:]+[^:]$/, message: "Missing colon after elif statement" },
  { regex: /\belse[^:]$/, message: "Missing colon after else" },
  { regex: /\bimport\s+os\b/, message: "Warning: 'os' module may be blocked" },
  { regex: /\bimport\s+subprocess\b/, message: "Warning: 'subprocess' module is blocked" },
  { regex: /\bopen\s*\(/, message: "Warning: File operations may be blocked" },
];

const getStorageKey = (problemId: string) => `pychef_code_${problemId}`;

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const { settings } = useSettings();
  const { checkSubmissionAchievements } = useAchievements();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<{ editor: typeof editor; MarkerSeverity: typeof MarkerSeverity } | null>(null);
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [code, setCode] = useState(defaultCode);
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"success" | "error" | "info" | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [editorTheme, setEditorTheme] = useState(settings.editorTheme);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileView, setMobileView] = useState<"description" | "editor">("description");

  // Handle loading code from history
  const handleLoadCode = (historyCode: string) => {
    setCode(historyCode);
    if (id) {
      localStorage.setItem(getStorageKey(id), historyCode);
      setLastSaved(new Date());
    }
  };

  // Swipe gesture for mobile view toggle
  const swipeHandlers = useSwipeGesture({
    threshold: 75,
    onSwipeLeft: () => setMobileView("editor"),
    onSwipeRight: () => setMobileView("description"),
  });

  // Load saved code from localStorage
  useEffect(() => {
    if (id) {
      const savedCode = localStorage.getItem(getStorageKey(id));
      if (savedCode) {
        setCode(savedCode);
        setLastSaved(new Date());
      }
    }
  }, [id]);

  // Auto-save code to localStorage with debounce
  useEffect(() => {
    if (!id) return;
    
    const timeoutId = setTimeout(() => {
      if (code && code !== defaultCode) {
        localStorage.setItem(getStorageKey(id), code);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [code, id]);

  // Check for Python errors and add markers
  const checkPythonErrors = useCallback((codeText: string) => {
    if (!monacoRef.current || !editorRef.current) return;
    
    const model = editorRef.current.getModel();
    if (!model) return;

    const markers: editor.IMarkerData[] = [];
    const lines = codeText.split("\n");

    lines.forEach((line, index) => {
      pythonErrorPatterns.forEach((pattern) => {
        if (pattern.regex.test(line)) {
          markers.push({
            severity: pattern.message.startsWith("Warning") 
              ? monacoRef.current!.MarkerSeverity.Warning 
              : monacoRef.current!.MarkerSeverity.Error,
            startLineNumber: index + 1,
            startColumn: 1,
            endLineNumber: index + 1,
            endColumn: line.length + 1,
            message: pattern.message,
          });
        }
      });
    });

    monacoRef.current.editor.setModelMarkers(model, "python-checker", markers);
  }, []);

  const handleEditorMount: OnMount = (editorInstance, monaco) => {
    editorRef.current = editorInstance;
    monacoRef.current = { editor: monaco.editor, MarkerSeverity: monaco.MarkerSeverity };
    checkPythonErrors(code);

    // Add keyboard shortcuts
    editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });
    editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      handleSubmit();
    });
  };

  const handleResetCode = () => {
    if (id) {
      localStorage.removeItem(getStorageKey(id));
      setCode(defaultCode);
      setLastSaved(null);
      setValidationError(null);
      toast.success("Code reset to default template");
    }
  };

  // Simple Python code formatter
  const formatPythonCode = () => {
    const lines = code.split("\n");
    const formattedLines: string[] = [];
    let indentLevel = 0;
    const indentSize = 4;

    for (let line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine === "") {
        formattedLines.push("");
        continue;
      }

      if (/^(elif|else|except|finally)\b/.test(trimmedLine)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indent = " ".repeat(indentLevel * indentSize);
      let formattedLine = indent + trimmedLine;

      formattedLine = formattedLine
        .replace(/\s*=\s*/g, " = ")
        .replace(/\s*==\s*/g, " == ")
        .replace(/\s*!=\s*/g, " != ")
        .replace(/\s*<=\s*/g, " <= ")
        .replace(/\s*>=\s*/g, " >= ")
        .replace(/\s*\+=\s*/g, " += ")
        .replace(/\s*-=\s*/g, " -= ")
        .replace(/,\s*/g, ", ")
        .replace(/\s+,/g, ",");

      const leadingSpaces = formattedLine.match(/^\s*/)?.[0] || "";
      const restOfLine = formattedLine.slice(leadingSpaces.length);
      formattedLine = leadingSpaces + restOfLine.replace(/  +/g, " ");

      formattedLines.push(formattedLine);

      if (trimmedLine.endsWith(":")) {
        indentLevel++;
      }
    }

    const formatted = formattedLines.join("\n");
    setCode(formatted);
    toast.success("Code formatted");
  };

  useEffect(() => {
    if (id) {
      fetchProblem();
    }
  }, [id]);

  useEffect(() => {
    if (id && user) {
      fetchSubmissions();
    }
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

    const samplesData = Array.isArray(data.samples) ? data.samples : [];
    const problemData: Problem = {
      id: data.id,
      title: data.title,
      statement: data.statement,
      difficulty: data.difficulty,
      tags: data.tags || [],
      input_format: data.input_format || "",
      output_format: data.output_format || "",
      constraints: data.constraints || "",
      samples: samplesData as unknown as Sample[],
      time_limit: data.time_limit,
    };

    setProblem(problemData);
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

    if (data) {
      setSubmissions(data);
    }
  };

  const validateCode = (): boolean => {
    setValidationError(null);
    
    const trimmedCode = code.trim();
    
    if (!trimmedCode) {
      setValidationError("Code cannot be empty");
      toast.error("Please write some code before running");
      return false;
    }
    
    if (trimmedCode === defaultCode.trim()) {
      setValidationError("Please modify the default template");
      toast.error("Please write your solution before running");
      return false;
    }
    
    if (trimmedCode.length < 10) {
      setValidationError("Code is too short");
      toast.error("Code seems incomplete");
      return false;
    }
    
    return true;
  };

  const updateStep = (stepIndex: number, status: ExecutionStep["status"], message?: string) => {
    setExecutionSteps(prev => prev.map((step, i) => 
      i === stepIndex ? { ...step, status, message } : step
    ));
  };

  const handleRun = async () => {
    if (!user) {
      toast.error("Please log in to run code");
      navigate("/auth");
      return;
    }

    if (!validateCode()) return;

    setIsRunning(true);
    setOutput(null);
    setVerdict(null);
    setExecutionSteps([
      { step: "Parsing code", status: "running" },
      { step: "Validating syntax", status: "pending" },
      { step: "Running with sample input", status: "pending" },
      { step: "Generating output", status: "pending" },
    ]);

    try {
      await new Promise(r => setTimeout(r, 300));
      updateStep(0, "done");
      updateStep(1, "running");
      
      await new Promise(r => setTimeout(r, 300));
      updateStep(1, "done");
      updateStep(2, "running");

      const { data, error } = await supabase.functions.invoke("python-judge", {
        body: {
          problem_id: id,
          code,
          user_id: user.id,
          run_only: true,
        },
      });

      if (error) throw error;

      updateStep(2, "done");
      updateStep(3, "running");
      await new Promise(r => setTimeout(r, 200));
      updateStep(3, "done");

      setOutput(data.output);
      setVerdict(data.status === "Executed" ? "info" : "error");
    } catch (error) {
      console.error("Run error:", error);
      setExecutionSteps(prev => prev.map(step => 
        step.status === "running" ? { ...step, status: "error" } : step
      ));
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

    if (!validateCode()) return;

    setIsSubmitting(true);
    setOutput(null);
    setVerdict(null);
    setExecutionSteps([
      { step: "Parsing code", status: "running" },
      { step: "Validating syntax", status: "pending" },
      { step: "Running test cases", status: "pending" },
      { step: "Comparing outputs", status: "pending" },
      { step: "Recording submission", status: "pending" },
    ]);

    try {
      await new Promise(r => setTimeout(r, 300));
      updateStep(0, "done");
      updateStep(1, "running");
      
      await new Promise(r => setTimeout(r, 300));
      updateStep(1, "done");
      updateStep(2, "running");

      const { data, error } = await supabase.functions.invoke("python-judge", {
        body: {
          problem_id: id,
          code,
          user_id: user.id,
          run_only: false,
        },
      });

      if (error) throw error;

      updateStep(2, "done");
      updateStep(3, "running");
      await new Promise(r => setTimeout(r, 200));
      updateStep(3, "done");
      updateStep(4, "running");
      await new Promise(r => setTimeout(r, 200));
      updateStep(4, "done");

      setOutput(data.output);
      setVerdict(data.status === "Accepted" ? "success" : "error");

      if (data.status === "Accepted") {
        toast.success("🎉 Accepted! +50 XP");
        refreshProfile();
        // Check for achievements
        if (user) {
          checkSubmissionAchievements(user.id, true, new Date());
        }
      } else {
        toast.error(data.status);
        // Check for first submission achievement even if not accepted
        if (user) {
          checkSubmissionAchievements(user.id, false, new Date());
        }
      }

      fetchSubmissions();
    } catch (error) {
      console.error("Submit error:", error);
      setExecutionSteps(prev => prev.map(step => 
        step.status === "running" ? { ...step, status: "error" } : step
      ));
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
        <header className="h-12 sm:h-14 border-b border-border bg-card flex items-center px-2 sm:px-4 gap-2 sm:gap-4">
          <Link
            to="/problems"
            className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          <div className="h-6 w-px bg-border hidden sm:block" />

          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <h1 className="font-semibold text-foreground truncate text-sm sm:text-base">
              {problem.title}
            </h1>
            <Badge
              variant="secondary"
              className={`text-xs shrink-0 ${
                problem.difficulty === "Easy"
                  ? "bg-difficulty-easy/20 text-difficulty-easy"
                  : problem.difficulty === "Medium"
                  ? "bg-difficulty-medium/20 text-difficulty-medium"
                  : "bg-difficulty-hard/20 text-difficulty-hard"
              }`}
            >
              {problem.difficulty}
            </Badge>
          </div>

          {/* Desktop Run/Submit buttons and features */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            <AchievementsPanel />
            {id && <HintsPanel problemId={id} />}
            {id && <Comments problemId={id} />}
            {problem && <DifficultyVoting problemId={id!} currentDifficulty={problem.difficulty} />}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
              className="px-2 sm:px-3"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
              ) : (
                <Play className="h-4 w-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">Run</span>
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="px-2 sm:px-3"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
              ) : (
                <Send className="h-4 w-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">Submit</span>
            </Button>
          </div>
        </header>

        {/* Mobile View Toggle */}
        <MobileViewToggle activeView={mobileView} onViewChange={setMobileView} />

        {/* Main Content */}
        <div 
          className="flex-1 flex flex-col md:flex-row overflow-hidden"
          {...swipeHandlers}
        >
          {/* Problem Description - Desktop always visible, Mobile conditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              isDescriptionExpanded ? "md:w-1/2" : "md:w-12"
            } border-r border-border bg-card overflow-hidden transition-all duration-300 flex-col ${
              mobileView === "description" ? "flex" : "hidden md:flex"
            } ${mobileView === "description" ? "flex-1" : ""}`}
          >
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="hidden md:flex items-center justify-center h-10 border-b border-border hover:bg-secondary transition-colors"
            >
              {isDescriptionExpanded ? (
                <ChevronDown className="h-4 w-4 rotate-90" />
              ) : (
                <ChevronUp className="h-4 w-4 rotate-90" />
              )}
            </button>

            {isDescriptionExpanded && (
              <div className="flex-1 overflow-y-auto pb-24 md:pb-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
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
                    <div className="prose prose-invert max-w-none">
                      <div className="mb-6">
                        <p className="text-foreground whitespace-pre-line text-sm sm:text-base">
                          {problem.statement}
                        </p>
                      </div>

                      {problem.input_format && (
                        <div className="mb-6">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Input Format
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm whitespace-pre-line">
                            {problem.input_format}
                          </p>
                        </div>
                      )}

                      {problem.output_format && (
                        <div className="mb-6">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Output Format
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm">
                            {problem.output_format}
                          </p>
                        </div>
                      )}

                      {problem.constraints && (
                        <div className="mb-6">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Constraints
                          </h3>
                          <pre className="text-xs sm:text-sm text-muted-foreground bg-secondary p-3 sm:p-4 rounded-lg whitespace-pre-line overflow-x-auto">
                            {problem.constraints}
                          </pre>
                        </div>
                      )}

                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                          Examples
                        </h3>
                        {problem.samples.map((sample, index) => (
                          <div
                            key={index}
                            className="mb-4 rounded-lg border border-border overflow-hidden"
                          >
                            <div className="bg-secondary/50 px-3 sm:px-4 py-2 border-b border-border">
                              <span className="text-xs sm:text-sm font-medium text-foreground">
                                Example {index + 1}
                              </span>
                            </div>
                            <div className="p-3 sm:p-4 space-y-3">
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Input
                                </span>
                                <pre className="mt-1 p-2 sm:p-3 bg-secondary rounded text-xs sm:text-sm font-mono text-foreground overflow-x-auto">
                                  {sample.input}
                                </pre>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Output
                                </span>
                                <pre className="mt-1 p-2 sm:p-3 bg-secondary rounded text-xs sm:text-sm font-mono text-foreground overflow-x-auto">
                                  {sample.output}
                                </pre>
                              </div>
                              {sample.explanation && (
                                <div>
                                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Explanation
                                  </span>
                                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                                    {sample.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm text-muted-foreground">Tags:</span>
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
                        <p className="text-muted-foreground">
                          No submissions yet
                        </p>
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
                                <CheckCircle2 className="h-5 w-5 text-accent" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <span
                                className={`font-medium text-sm ${
                                  sub.status === "Accepted"
                                    ? "text-accent"
                                    : "text-destructive"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {new Date(sub.created_at).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </motion.div>

          {/* Code Editor - Desktop always visible, Mobile conditional */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex-col ${
              isFullscreen 
                ? "fixed inset-0 z-50 bg-background" 
                : "md:flex-1 min-h-[400px] md:min-h-0"
            } ${mobileView === "editor" ? "flex flex-1" : "hidden md:flex"}`}
          >
            <div className="h-auto min-h-10 border-b border-border bg-secondary/50 flex flex-wrap items-center px-2 sm:px-4 py-2 gap-2 justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                  solution.py
                </span>
                <span className="text-xs text-muted-foreground hidden lg:inline">
                  Ctrl+Enter: Run | Ctrl+Shift+Enter: Submit
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                {lastSaved && (
                  <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                    <Save className="h-3 w-3" />
                    <span>Saved {lastSaved.toLocaleTimeString()}</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    toast.success("Code copied to clipboard");
                  }}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-3 w-3 sm:mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditorTheme(editorTheme === "vs-dark" ? "light" : "vs-dark")}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {editorTheme === "vs-dark" ? (
                    <Sun className="h-3 w-3 sm:mr-1" />
                  ) : (
                    <Moon className="h-3 w-3 sm:mr-1" />
                  )}
                  <span className="hidden sm:inline">{editorTheme === "vs-dark" ? "Light" : "Dark"}</span>
                </Button>
                <KeyboardShortcutsDialog />
                {id && <CodeHistoryPanel problemId={id} onLoadCode={handleLoadCode} />}
                <CodeTemplatesPanel currentCode={code} onLoadTemplate={handleLoadCode} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={formatPythonCode}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-primary"
                >
                  <Wand2 className="h-3 w-3 sm:mr-1" />
                  <span className="hidden sm:inline">Format</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground hidden sm:flex"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-3 w-3 sm:mr-1" />
                  ) : (
                    <Maximize2 className="h-3 w-3 sm:mr-1" />
                  )}
                  <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <RotateCcw className="h-3 w-3 sm:mr-1" />
                      <span className="hidden sm:inline">Reset</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset code?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will delete your saved code and restore the default template. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetCode} className="bg-destructive hover:bg-destructive/90">
                        Reset Code
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="flex-1 pb-24 md:pb-0">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme={editorTheme}
                value={code}
                onMount={handleEditorMount}
                onChange={(value) => {
                  const newCode = value || "";
                  setCode(newCode);
                  if (validationError) setValidationError(null);
                  checkPythonErrors(newCode);
                }}
                options={{
                  fontSize: settings.fontSize,
                  fontFamily: "JetBrains Mono, monospace",
                  minimap: { enabled: false },
                  padding: { top: 16 },
                  lineNumbers: settings.showLineNumbers ? "on" : "off",
                  scrollBeyondLastLine: false,
                  wordWrap: settings.wordWrap ? "on" : "off",
                  automaticLayout: true,
                  glyphMargin: true,
                }}
              />
            </div>

            {/* Validation Error */}
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-destructive/30 bg-destructive/10 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">{validationError}</span>
                </div>
              </motion.div>
            )}

            {/* Execution Steps */}
            {(isRunning || isSubmitting) && executionSteps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border bg-card px-4 py-3"
              >
                <div className="space-y-2">
                  {executionSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {step.status === "pending" && (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      {step.status === "running" && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      )}
                      {step.status === "done" && (
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      )}
                      {step.status === "error" && (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`text-xs sm:text-sm ${
                        step.status === "pending" ? "text-muted-foreground" :
                        step.status === "running" ? "text-foreground" :
                        step.status === "done" ? "text-accent" :
                        "text-destructive"
                      }`}>
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Output Panel */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-t ${
                  verdict === "success" ? "border-accent/30 bg-accent/10" :
                  verdict === "error" ? "border-destructive/30 bg-destructive/10" :
                  "border-border bg-card"
                } px-4 py-3`}
              >
                <div className="flex items-start gap-2">
                  {verdict === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  )}
                  {verdict === "error" && (
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  {verdict === "info" && (
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  )}
                  <pre className={`text-xs sm:text-sm font-mono whitespace-pre-wrap ${
                    verdict === "success" ? "text-accent" :
                    verdict === "error" ? "text-destructive" :
                    "text-foreground"
                  }`}>
                    {output}
                  </pre>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Mobile Floating Action Buttons */}
        <FloatingActionButtons
          onRun={handleRun}
          onSubmit={handleSubmit}
          isRunning={isRunning}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
};

export default ProblemDetail;
