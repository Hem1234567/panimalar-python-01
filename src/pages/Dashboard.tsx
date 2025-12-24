import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

// Mock data
const recentProblems = [
  { id: "1", title: "Two Sum", difficulty: "Easy", status: "solved" },
  { id: "2", title: "Palindrome Number", difficulty: "Easy", status: "solved" },
  { id: "3", title: "Merge Intervals", difficulty: "Medium", status: "attempted" },
];

const Dashboard = () => {
  const user = {
    name: "John Developer",
    xp: 1250,
    level: 5,
    streak: 7,
    solved: 23,
    accuracy: 78,
  };

  const xpToNextLevel = 1500;
  const xpProgress = (user.xp / xpToNextLevel) * 100;

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
        <Navbar isAuthenticated={true} />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                Keep up the great work! You're on a {user.streak}-day streak.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {[
                {
                  icon: Zap,
                  label: "Total XP",
                  value: user.xp.toLocaleString(),
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  icon: Trophy,
                  label: "Level",
                  value: user.level,
                  color: "text-warning",
                  bg: "bg-warning/10",
                },
                {
                  icon: Flame,
                  label: "Day Streak",
                  value: user.streak,
                  color: "text-destructive",
                  bg: "bg-destructive/10",
                },
                {
                  icon: Target,
                  label: "Accuracy",
                  value: `${user.accuracy}%`,
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
                    {user.xp} / {xpToNextLevel} XP
                  </span>
                </div>

                <div className="relative h-4 rounded-full bg-secondary overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-sm font-bold text-primary-foreground">
                      {user.level}
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
                      {user.level + 1}
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
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
