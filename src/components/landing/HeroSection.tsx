import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Level up your Python skills
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master Python through
              <span className="block text-gradient">Competitive Coding</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg">
              Practice algorithmic problems, compete with developers worldwide,
              and track your progress. The ultimate platform for Python
              enthusiasts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  Start Coding
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link to="/problems">
                <Button variant="outline" size="xl">
                  Browse Problems
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Problems</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100K+</p>
                <p className="text-sm text-muted-foreground">Submissions</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Code Card */}
              <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/70" />
                    <div className="w-3 h-3 rounded-full bg-warning/70" />
                    <div className="w-3 h-3 rounded-full bg-success/70" />
                  </div>
                  <span className="ml-4 text-sm text-muted-foreground font-mono">
                    solution.py
                  </span>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <pre className="text-muted-foreground">
                    <code>
                      <span className="text-primary">def</span>{" "}
                      <span className="text-accent">solve</span>(nums):
                      {"\n"}
                      {"    "}
                      <span className="text-muted-foreground/70">
                        # Find the two numbers that sum to target
                      </span>
                      {"\n"}
                      {"    "}seen = {}
                      {"{}"}{"\n"}
                      {"    "}
                      <span className="text-primary">for</span> i, num{" "}
                      <span className="text-primary">in</span> enumerate(nums):
                      {"\n"}
                      {"        "}complement = target - num{"\n"}
                      {"        "}
                      <span className="text-primary">if</span> complement{" "}
                      <span className="text-primary">in</span> seen:{"\n"}
                      {"            "}
                      <span className="text-primary">return</span> [seen[complement], i]
                      {"\n"}
                      {"        "}seen[num] = i{"\n"}
                      {"    "}
                      <span className="text-primary">return</span> []
                    </code>
                  </pre>
                </div>

                {/* Result Bar */}
                <div className="px-6 py-4 bg-success/10 border-t border-success/20">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-success" />
                    <span className="text-sm font-semibold text-success">
                      All test cases passed!
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -bottom-4 p-4 rounded-xl bg-secondary border border-border shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                    <Code2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">+50 XP</p>
                    <p className="text-xs text-muted-foreground">Problem Solved!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
