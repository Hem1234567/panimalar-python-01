import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, CheckCircle2, Circle, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockProblems = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    acceptance: 49.5,
    status: "solved",
  },
  {
    id: "2",
    title: "Palindrome Number",
    difficulty: "Easy",
    tags: ["Math"],
    acceptance: 53.2,
    status: "solved",
  },
  {
    id: "3",
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    acceptance: 45.8,
    status: "attempted",
  },
  {
    id: "4",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    acceptance: 40.1,
    status: "unsolved",
  },
  {
    id: "5",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "DP"],
    acceptance: 50.2,
    status: "unsolved",
  },
  {
    id: "6",
    title: "Longest Substring",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    acceptance: 33.8,
    status: "unsolved",
  },
  {
    id: "7",
    title: "Binary Tree Inorder",
    difficulty: "Easy",
    tags: ["Tree", "Stack", "DFS"],
    acceptance: 72.3,
    status: "unsolved",
  },
  {
    id: "8",
    title: "N-Queens",
    difficulty: "Hard",
    tags: ["Backtracking", "Recursion"],
    acceptance: 62.7,
    status: "unsolved",
  },
];

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProblems = mockProblems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      problem.difficulty.toLowerCase() === difficultyFilter;
    const matchesStatus =
      statusFilter === "all" || problem.status === statusFilter;

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

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Problem Set
              </h1>
              <p className="text-muted-foreground">
                Practice Python with {mockProblems.length}+ carefully crafted
                problems
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-secondary border-border"
                />
              </div>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full md:w-40 h-12 bg-secondary border-border">
                  <Filter className="h-4 w-4 mr-2" />
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
                <SelectTrigger className="w-full md:w-40 h-12 bg-secondary border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="attempted">Attempted</SelectItem>
                  <SelectItem value="unsolved">Unsolved</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Problems Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-card border border-border overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2 hidden md:block">Acceptance</div>
                <div className="col-span-2 hidden lg:block">Tags</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredProblems.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/problems/${problem.id}`}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-secondary/50 transition-colors items-center"
                    >
                      <div className="col-span-1">
                        {problem.status === "solved" ? (
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                        ) : problem.status === "attempted" ? (
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

                      <div className="col-span-2 hidden md:block">
                        <span className="text-sm text-muted-foreground">
                          {problem.acceptance}%
                        </span>
                      </div>

                      <div className="col-span-2 hidden lg:flex gap-1 flex-wrap">
                        {problem.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {problem.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{problem.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <p className="text-muted-foreground">
                    No problems found matching your criteria.
                  </p>
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

export default Problems;
