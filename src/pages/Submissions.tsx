import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";
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
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">My Submissions</h1>
              <p className="text-muted-foreground">Track all your code submissions</p>
            </motion.div>

            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
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
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-secondary/30 items-center"
                    >
                      <div className="col-span-1">
                        {sub.status === "Accepted" ? (
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div className="col-span-4 font-medium text-foreground">
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
