import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, CheckCircle2, Circle, Clock, Loader2, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import PullToRefreshIndicator from "@/components/mobile/PullToRefreshIndicator";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
}

interface Submission {
  problem_id: string;
  status: string;
}

const Problems = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchProblems = useCallback(async () => {
    const { data, error } = await supabase
      .from("problems")
      .select("id, title, difficulty, tags")
      .order("difficulty", { ascending: true });

    if (data) {
      setProblems(data);
    }
    setIsLoading(false);
  }, []);

  const fetchUserSubmissions = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("submissions")
      .select("problem_id, status")
      .eq("user_id", user.id);

    if (data) {
      const submissionMap = new Map<string, string>();
      data.forEach((sub: Submission) => {
        const existing = submissionMap.get(sub.problem_id);
        if (!existing || sub.status === "Accepted") {
          submissionMap.set(sub.problem_id, sub.status);
        }
      });
      setUserSubmissions(submissionMap);
    }
  }, [user]);

  const handleRefresh = useCallback(async () => {
    await Promise.all([fetchProblems(), fetchUserSubmissions()]);
  }, [fetchProblems, fetchUserSubmissions]);

  const { containerRef, pullDistance, isRefreshing, handlers } = usePullToRefresh({
    onRefresh: handleRefresh,
  });

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  useEffect(() => {
    if (user) {
      fetchUserSubmissions();
    }
  }, [user, fetchUserSubmissions]);

  const getSubmissionStatus = (problemId: string) => {
    const status = userSubmissions.get(problemId);
    if (!status) return "unsolved";
    if (status === "Accepted") return "solved";
    return "attempted";
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      problem.difficulty.toLowerCase() === difficultyFilter;
    
    const status = getSubmissionStatus(problem.id);
    const matchesStatus = statusFilter === "all" || status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Problems - PyChef</title>
        <meta
          name="description"
          content="Browse and solve Python programming challenges. Filter by difficulty and track your progress."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main 
          ref={containerRef}
          className="pt-20 sm:pt-24 pb-16 relative overflow-auto"
          {...handlers}
        >
          <PullToRefreshIndicator pullDistance={pullDistance} isRefreshing={isRefreshing} />
          
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Problem Set
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Practice Python with {problems.length} carefully crafted problems
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 sm:h-12 bg-secondary border-border"
                />
              </div>

              <div className="flex gap-3">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="flex-1 h-11 sm:h-12 bg-secondary border-border">
                    <Filter className="h-4 w-4 mr-2 shrink-0" />
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="flex-1 h-11 sm:h-12 bg-secondary border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="solved">Solved</SelectItem>
                    <SelectItem value="attempted">Attempted</SelectItem>
                    <SelectItem value="unsolved">Unsolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Problems List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden"
            >
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-4">Tags</div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {/* Problems List */}
              {!isLoading && (
                <div className="divide-y divide-border">
                  {filteredProblems.map((problem, index) => {
                    const status = getSubmissionStatus(problem.id);
                    return (
                      <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          to={`/problems/${problem.id}`}
                          className="block hover:bg-secondary/50 transition-colors"
                        >
                          {/* Desktop View */}
                          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center">
                            <div className="col-span-1">
                              {status === "solved" ? (
                                <CheckCircle2 className="h-5 w-5 text-accent" />
                              ) : status === "attempted" ? (
                                <Clock className="h-5 w-5 text-warning" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>

                            <div className="col-span-5">
                              <span className="font-medium text-foreground hover:text-primary transition-colors">
                                {problem.title}
                              </span>
                            </div>

                            <div className="col-span-2">
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
                            </div>

                            <div className="col-span-4 flex gap-1 flex-wrap">
                              {problem.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {problem.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{problem.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Mobile View */}
                          <div className="md:hidden px-4 py-4">
                            <div className="flex items-start gap-3">
                              <div className="shrink-0 mt-0.5">
                                {status === "solved" ? (
                                  <CheckCircle2 className="h-5 w-5 text-accent" />
                                ) : status === "attempted" ? (
                                  <Clock className="h-5 w-5 text-warning" />
                                ) : (
                                  <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <span className="font-medium text-foreground text-sm truncate">
                                    {problem.title}
                                  </span>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                </div>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className={`text-xs font-medium ${
                                      problem.difficulty === "Easy"
                                        ? "difficulty-easy"
                                        : problem.difficulty === "Medium"
                                        ? "difficulty-medium"
                                        : "difficulty-hard"
                                    }`}
                                  >
                                    {problem.difficulty}
                                  </span>
                                  
                                  <span className="text-muted-foreground">•</span>
                                  
                                  <div className="flex gap-1 flex-wrap">
                                    {problem.tags.slice(0, 2).map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs py-0"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                    {problem.tags.length > 2 && (
                                      <Badge variant="secondary" className="text-xs py-0">
                                        +{problem.tags.length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {!isLoading && filteredProblems.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <p className="text-muted-foreground">
                    No problems found matching your criteria.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Pull to refresh hint on mobile */}
            <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">
              Pull down to refresh
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Problems;
