import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Clock, CheckCircle2, XCircle, Code, ArrowRight, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface SubmissionWithCode {
  id: string;
  code: string;
  status: string;
  created_at: string;
  execution_time: number | null;
}

interface CodeHistoryPanelProps {
  problemId: string;
  onLoadCode: (code: string) => void;
}

const CodeHistoryPanel = ({ problemId, onLoadCode }: CodeHistoryPanelProps) => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionWithCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithCode | null>(null);
  const [compareSubmission, setCompareSubmission] = useState<SubmissionWithCode | null>(null);
  const [isCompareMode, setIsCompareMode] = useState(false);

  const fetchSubmissions = async () => {
    if (!user || !problemId) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("id, code, status, created_at, execution_time")
      .eq("user_id", user.id)
      .eq("problem_id", problemId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      toast.error("Failed to load submission history");
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchSubmissions();
    }
  }, [isOpen, user, problemId]);

  const handleLoadCode = (submission: SubmissionWithCode) => {
    onLoadCode(submission.code);
    setIsOpen(false);
    toast.success("Code loaded from history");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleCompare = (submission: SubmissionWithCode) => {
    if (!compareSubmission) {
      setCompareSubmission(submission);
      setIsCompareMode(true);
      toast.info("Select another submission to compare");
    } else if (compareSubmission.id !== submission.id) {
      setSelectedSubmission(submission);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "Accepted") {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "Accepted" ? "default" : "destructive";
    return <Badge variant={variant} className="text-xs">{status}</Badge>;
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Submission History
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-4">
            {isCompareMode && compareSubmission && (
              <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Comparing with:</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(compareSubmission.status)}
                    <span className="text-sm">
                      {formatDistanceToNow(new Date(compareSubmission.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => {
                      setCompareSubmission(null);
                      setIsCompareMode(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No submissions yet</p>
                <p className="text-sm">Submit your code to see history</p>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-3 pr-4">
                  <AnimatePresence>
                    {submissions.map((submission, index) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-lg border transition-colors ${
                          compareSubmission?.id === submission.id 
                            ? "bg-primary/10 border-primary" 
                            : "bg-card border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(submission.status)}
                            {getStatusBadge(submission.status)}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
                          </div>
                        </div>

                        {submission.execution_time && (
                          <p className="text-xs text-muted-foreground mb-3">
                            Execution: {submission.execution_time.toFixed(3)}s
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleLoadCode(submission)}
                            className="gap-1"
                          >
                            <ArrowRight className="h-3 w-3" />
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyCode(submission.code)}
                            className="gap-1"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedSubmission(submission)}
                            className="gap-1"
                          >
                            <Code className="h-3 w-3" />
                            View
                          </Button>
                          {isCompareMode && compareSubmission?.id !== submission.id && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleCompare(submission)}
                              className="gap-1"
                            >
                              Compare
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Code View Dialog */}
      <Dialog open={!!selectedSubmission && !compareSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Submission Code
              {selectedSubmission && getStatusBadge(selectedSubmission.status)}
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDistanceToNow(new Date(selectedSubmission.created_at), { addSuffix: true })}
                </span>
                {selectedSubmission.execution_time && (
                  <span>Execution: {selectedSubmission.execution_time.toFixed(3)}s</span>
                )}
              </div>
              <ScrollArea className="h-[400px] rounded-lg border bg-muted">
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                  {selectedSubmission.code}
                </pre>
              </ScrollArea>
              <div className="flex gap-2">
                <Button onClick={() => handleLoadCode(selectedSubmission)}>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Load into Editor
                </Button>
                <Button variant="outline" onClick={() => handleCopyCode(selectedSubmission.code)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Compare Dialog */}
      <Dialog 
        open={!!compareSubmission && !!selectedSubmission} 
        onOpenChange={() => {
          setSelectedSubmission(null);
          setCompareSubmission(null);
          setIsCompareMode(false);
        }}
      >
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Compare Submissions</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {compareSubmission && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusBadge(compareSubmission.status)}
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(compareSubmission.created_at), { addSuffix: true })}
                  </span>
                </div>
                <ScrollArea className="h-[400px] rounded-lg border bg-muted">
                  <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                    {compareSubmission.code}
                  </pre>
                </ScrollArea>
              </div>
            )}
            {selectedSubmission && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedSubmission.status)}
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(selectedSubmission.created_at), { addSuffix: true })}
                  </span>
                </div>
                <ScrollArea className="h-[400px] rounded-lg border bg-muted">
                  <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                    {selectedSubmission.code}
                  </pre>
                </ScrollArea>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CodeHistoryPanel;
