import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock problem data
const mockProblem = {
  id: "1",
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  statement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
  inputFormat: "The first line contains the array of integers separated by spaces.\nThe second line contains the target integer.",
  outputFormat: "Print the two indices separated by a space.",
  constraints: `- 2 ≤ nums.length ≤ 10⁴
- -10⁹ ≤ nums[i] ≤ 10⁹
- -10⁹ ≤ target ≤ 10⁹
- Only one valid answer exists.`,
  samples: [
    {
      input: "2 7 11 15\n9",
      output: "0 1",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "3 2 4\n6",
      output: "1 2",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
  ],
};

const defaultCode = `def solve(nums, target):
    # Your code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Read input
nums = list(map(int, input().split()))
target = int(input())

# Solve and print result
result = solve(nums, target)
print(*result)
`;

const ProblemDetail = () => {
  const { id } = useParams();
  const [code, setCode] = useState(defaultCode);
  const [activeTab, setActiveTab] = useState("description");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"success" | "error" | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    setVerdict(null);

    // Simulate running code
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOutput("0 1");
    setVerdict("success");
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput(null);
    setVerdict(null);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOutput("All test cases passed! +50 XP");
    setVerdict("success");
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{mockProblem.title} - PyChef</title>
        <meta
          name="description"
          content={`Solve the ${mockProblem.title} problem on PyChef. ${mockProblem.difficulty} difficulty.`}
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
              {mockProblem.title}
            </h1>
            <Badge
              variant="secondary"
              className={`${
                mockProblem.difficulty === "Easy"
                  ? "bg-difficulty-easy/20 text-difficulty-easy"
                  : mockProblem.difficulty === "Medium"
                  ? "bg-difficulty-medium/20 text-difficulty-medium"
                  : "bg-difficulty-hard/20 text-difficulty-hard"
              }`}
            >
              {mockProblem.difficulty}
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
            {/* Toggle Button (Desktop) */}
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
                      Submissions
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="p-6 m-0">
                    <div className="prose prose-invert max-w-none">
                      {/* Problem Statement */}
                      <div className="mb-6">
                        <p className="text-foreground whitespace-pre-line">
                          {mockProblem.statement}
                        </p>
                      </div>

                      {/* Input/Output Format */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Input Format
                        </h3>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {mockProblem.inputFormat}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Output Format
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {mockProblem.outputFormat}
                        </p>
                      </div>

                      {/* Constraints */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Constraints
                        </h3>
                        <pre className="text-sm text-muted-foreground bg-secondary p-4 rounded-lg whitespace-pre-line">
                          {mockProblem.constraints}
                        </pre>
                      </div>

                      {/* Sample Test Cases */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Examples
                        </h3>
                        {mockProblem.samples.map((sample, index) => (
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

                      {/* Tags */}
                      <div className="mt-6 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Tags:</span>
                        {mockProblem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="submissions" className="p-6 m-0">
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Your submissions will appear here
                      </p>
                    </div>
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
            {/* Editor Header */}
            <div className="h-10 border-b border-border bg-secondary/50 flex items-center px-4">
              <span className="text-sm text-muted-foreground font-mono">
                solution.py
              </span>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: 14,
                  fontFamily: "JetBrains Mono, monospace",
                  minimap: { enabled: false },
                  padding: { top: 16 },
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Output Panel */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border bg-card"
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                  {verdict === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      verdict === "success" ? "text-accent" : "text-destructive"
                    }`}
                  >
                    {verdict === "success" ? "Accepted" : "Wrong Answer"}
                  </span>
                </div>
                <div className="p-4">
                  <pre className="text-sm font-mono text-foreground">{output}</pre>
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
