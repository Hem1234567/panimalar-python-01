import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    }, 1000); // Save after 1 second of inactivity

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
      
      // Skip empty lines
      if (trimmedLine === "") {
        formattedLines.push("");
        continue;
      }

      // Decrease indent for these keywords at the start
      if (/^(elif|else|except|finally)\b/.test(trimmedLine)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Add proper indentation
      const indent = " ".repeat(indentLevel * indentSize);
      let formattedLine = indent + trimmedLine;

      // Fix spacing around operators
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

      // Fix multiple spaces (except in strings and at line start)
      const leadingSpaces = formattedLine.match(/^\s*/)?.[0] || "";
      const restOfLine = formattedLine.slice(leadingSpaces.length);
      formattedLine = leadingSpaces + restOfLine.replace(/  +/g, " ");

      formattedLines.push(formattedLine);

      // Increase indent after colons (for blocks)
      if (trimmedLine.endsWith(":")) {
        indentLevel++;
      }

      // Handle return/break/continue/pass - might decrease indent on next non-empty line
      if (/^(return|break|continue|pass)\b/.test(trimmedLine) && !trimmedLine.endsWith(":")) {
        // Don't automatically decrease, let the next block keyword handle it
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

    // Cast the data properly
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
      // Simulate step progression
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
      } else {
        toast.error(data.status);
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
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4">
          <Link
            to="/problems"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-3 flex-1">
            <h1 className="font-semibold text-foreground truncate">
              {problem.title}
            </h1>
            <Badge
              variant="secondary"
              className={`${
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

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Problem Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              isDescriptionExpanded ? "lg:w-1/2" : "lg:w-12"
            } border-r border-border bg-card overflow-hidden transition-all duration-300 flex flex-col`}
          >
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="hidden lg:flex items-center justify-center h-10 border-b border-border hover:bg-secondary transition-colors"
            >
              {isDescriptionExpanded ? (
                <ChevronDown className="h-4 w-4 rotate-90" />
              ) : (
                <ChevronUp className="h-4 w-4 rotate-90" />
              )}
            </button>

            {isDescriptionExpanded && (
              <div className="flex-1 overflow-y-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="description"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="submissions"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                    >
                      Submissions ({submissions.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="p-6 m-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="mb-6">
                        <p className="text-foreground whitespace-pre-line">
                          {problem.statement}
                        </p>
                      </div>

                      {problem.input_format && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Input Format
                          </h3>
                          <p className="text-muted-foreground text-sm whitespace-pre-line">
                            {problem.input_format}
                          </p>
                        </div>
                      )}

                      {problem.output_format && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Output Format
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {problem.output_format}
                          </p>
                        </div>
                      )}

                      {problem.constraints && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Constraints
                          </h3>
                          <pre className="text-sm text-muted-foreground bg-secondary p-4 rounded-lg whitespace-pre-line">
                            {problem.constraints}
                          </pre>
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Examples
                        </h3>
                        {problem.samples.map((sample, index) => (
                          <div
                            key={index}
                            className="mb-4 rounded-lg border border-border overflow-hidden"
                          >
                            <div className="bg-secondary/50 px-4 py-2 border-b border-border">
                              <span className="text-sm font-medium text-foreground">
                                Example {index + 1}
                              </span>
                            </div>
                            <div className="p-4 space-y-3">
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Input
                                </span>
                                <pre className="mt-1 p-3 bg-secondary rounded text-sm font-mono text-foreground">
                                  {sample.input}
                                </pre>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Output
                                </span>
                                <pre className="mt-1 p-3 bg-secondary rounded text-sm font-mono text-foreground">
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

                      <div className="mt-6 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Tags:</span>
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="submissions" className="p-6 m-0">
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
                                className={`font-medium ${
                                  sub.status === "Accepted"
                                    ? "text-accent"
                                    : "text-destructive"
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
            )}
          </motion.div>

          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col min-h-[400px] lg:min-h-0"
          >
            <div className="h-10 border-b border-border bg-secondary/50 flex items-center px-4 justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono">
                  solution.py
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  Ctrl+Enter: Run | Ctrl+Shift+Enter: Submit
                </span>
              </div>
              <div className="flex items-center gap-3">
                {lastSaved && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Save className="h-3 w-3" />
                    <span>Saved {lastSaved.toLocaleTimeString()}</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={formatPythonCode}
                  className="h-7 text-xs text-muted-foreground hover:text-primary"
                >
                  <Wand2 className="h-3 w-3 mr-1" />
                  Format
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
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

            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onMount={handleEditorMount}
                onChange={(value) => {
                  const newCode = value || "";
                  setCode(newCode);
                  if (validationError) setValidationError(null);
                  checkPythonErrors(newCode);
                }}
                options={{
                  fontSize: 14,
                  fontFamily: "JetBrains Mono, monospace",
                  minimap: { enabled: false },
                  padding: { top: 16 },
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
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
                    <div key={index} className="flex items-center gap-3">
                      {step.status === "pending" && (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      {step.status === "running" && (
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      )}
                      {step.status === "done" && (
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      )}
                      {step.status === "error" && (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span
                        className={`text-sm ${
                          step.status === "running"
                            ? "text-primary font-medium"
                            : step.status === "done"
                            ? "text-accent"
                            : step.status === "error"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Output */}
            {output && !isRunning && !isSubmitting && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border bg-card"
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                  {verdict === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  ) : verdict === "error" ? (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-info" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      verdict === "success"
                        ? "text-accent"
                        : verdict === "error"
                        ? "text-destructive"
                        : "text-info"
                    }`}
                  >
                    {verdict === "success"
                      ? "Accepted"
                      : verdict === "error"
                      ? "Error"
                      : "Output"}
                  </span>
                </div>
                <div className="p-4 max-h-40 overflow-y-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {output}
                  </pre>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
