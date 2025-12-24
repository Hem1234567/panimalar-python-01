import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Trophy,
  Target,
  Flame,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface RecentProblem {
  id: string;
  title: string;
  difficulty: string;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading } = useAuth();
  const [recentProblems, setRecentProblems] = useState<RecentProblem[]>([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchRecentActivity();
    }
  }, [user]);

  const fetchRecentActivity = async () => {
    if (!user) return;

    // Fetch recent submissions with problem info
    const { data: submissions } = await supabase
      .from("submissions")
      .select("problem_id, status, problems(id, title, difficulty)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (submissions) {
      const uniqueProblems = new Map<string, RecentProblem>();
      submissions.forEach((sub: any) => {
        if (sub.problems && !uniqueProblems.has(sub.problem_id)) {
          uniqueProblems.set(sub.problem_id, {
            id: sub.problems.id,
            title: sub.problems.title,
            difficulty: sub.problems.difficulty,
            status: sub.status === "Accepted" ? "solved" : "attempted",
          });
        }
      });
      setRecentProblems(Array.from(uniqueProblems.values()).slice(0, 3));
    }

    // Count solved problems
    const { data: solvedData } = await supabase
      .from("submissions")
      .select("problem_id")
      .eq("user_id", user.id)
      .eq("status", "Accepted");

    if (solvedData) {
      const uniqueSolved = new Set(solvedData.map((s) => s.problem_id));
      setSolvedCount(uniqueSolved.size);
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

  if (!user || !profile) {
    return null;
  }

  const xpToNextLevel = (profile.level + 1) * 300;
  const xpProgress = (profile.xp / xpToNextLevel) * 100;

  return (
    <>
      <Helmet>
        <title>Dashboard - PyChef</title>
        <meta
          name="description"
          content="Track your coding progress, XP, and streaks on PyChef."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {profile.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                Keep up the great work! You've solved {solvedCount} problems.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {[
                {
                  icon: Zap,
                  label: "Total XP",
                  value: profile.xp.toLocaleString(),
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  icon: Trophy,
                  label: "Level",
                  value: profile.level,
                  color: "text-warning",
                  bg: "bg-warning/10",
                },
                {
                  icon: Flame,
                  label: "Day Streak",
                  value: profile.streak,
                  color: "text-destructive",
                  bg: "bg-destructive/10",
                },
                {
                  icon: Target,
                  label: "Solved",
                  value: solvedCount,
                  color: "text-accent",
                  bg: "bg-accent/10",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Level Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Level Progress
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {profile.xp} / {xpToNextLevel} XP
                  </span>
                </div>

                <div className="relative h-4 rounded-full bg-secondary overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(xpProgress, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-sm font-bold text-primary-foreground">
                      {profile.level}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Current Level
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Next Level
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary border border-border text-sm font-bold text-foreground">
                      {profile.level + 1}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link to="/problems">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Practice Problems
                    </Button>
                  </Link>
                  <Link to="/leaderboard">
                    <Button variant="outline" className="w-full justify-start">
                      <Trophy className="h-4 w-4 mr-2" />
                      View Leaderboard
                    </Button>
                  </Link>
                  <Link to="/submissions">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      My Submissions
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Recent Problems
                </h2>
                <Link
                  to="/problems"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {recentProblems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No recent activity. Start solving problems!
                  </p>
                  <Link to="/problems">
                    <Button variant="hero">Browse Problems</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentProblems.map((problem) => (
                    <Link
                      key={problem.id}
                      to={`/problems/${problem.id}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircle2
                          className={`h-5 w-5 ${
                            problem.status === "solved"
                              ? "text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-medium text-foreground">
                          {problem.title}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          problem.difficulty === "Easy"
                            ? "difficulty-easy"
                            : problem.difficulty === "Medium"
                            ? "difficulty-medium"
                            : "difficulty-hard"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
