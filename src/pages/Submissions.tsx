import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Submission {
  id: string;
  problem_id: string;
  status: string;
  created_at: string;
  execution_time: number;
  problems: {
    title: string;
    difficulty: string;
  };
}

const Submissions = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  const fetchSubmissions = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("submissions")
      .select("id, problem_id, status, created_at, execution_time, problems(title, difficulty)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (data) {
      setSubmissions(data as unknown as Submission[]);
    }
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Submissions - PyChef</title>
        <meta name="description" content="View your code submissions on PyChef." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 sm:pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">My Submissions</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Track all your code submissions</p>
            </motion.div>

            <div className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">Status</div>
                <div className="col-span-4">Problem</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Result</div>
                <div className="col-span-3">Submitted</div>
              </div>

              {submissions.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No submissions yet</p>
                </div>
              ) : (
                submissions.map((sub, index) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      to={`/problems/${sub.problem_id}`}
                      className="block border-b border-border last:border-0 hover:bg-secondary/30"
                    >
                      {/* Desktop View */}
                      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center">
                        <div className="col-span-1">
                          {sub.status === "Accepted" ? (
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div className="col-span-4 font-medium text-foreground truncate">
                          {sub.problems?.title || "Unknown Problem"}
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`text-sm font-medium ${
                              sub.problems?.difficulty === "Easy"
                                ? "difficulty-easy"
                                : sub.problems?.difficulty === "Medium"
                                ? "difficulty-medium"
                                : "difficulty-hard"
                            }`}
                          >
                            {sub.problems?.difficulty || "-"}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`text-sm font-medium ${
                              sub.status === "Accepted" ? "text-accent" : "text-destructive"
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>
                        <div className="col-span-3 text-sm text-muted-foreground">
                          {new Date(sub.created_at).toLocaleString()}
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div className="md:hidden px-4 py-4">
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 mt-0.5">
                            {sub.status === "Accepted" ? (
                              <CheckCircle2 className="h-5 w-5 text-accent" />
                            ) : (
                              <XCircle className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-medium text-foreground text-sm truncate">
                                {sub.problems?.title || "Unknown Problem"}
                              </span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                            </div>
                            
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span
                                className={`font-medium ${
                                  sub.status === "Accepted" ? "text-accent" : "text-destructive"
                                }`}
                              >
                                {sub.status}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span
                                className={`font-medium ${
                                  sub.problems?.difficulty === "Easy"
                                    ? "difficulty-easy"
                                    : sub.problems?.difficulty === "Medium"
                                    ? "difficulty-medium"
                                    : "difficulty-hard"
                                }`}
                              >
                                {sub.problems?.difficulty || "-"}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">
                                {formatDate(sub.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Submissions;
