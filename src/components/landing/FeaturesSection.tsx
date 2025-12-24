import { motion } from "framer-motion";
import { Code, Trophy, TrendingUp, Zap, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Interactive Python Editor",
    description:
      "Write, run, and test your Python code directly in the browser with our powerful Monaco editor.",
  },
  {
    icon: Zap,
    title: "Instant Verdicts",
    description:
      "Get immediate feedback on your solutions with our lightning-fast judge system.",
  },
  {
    icon: Trophy,
    title: "Compete & Rank",
    description:
      "Challenge yourself against others on the global leaderboard and earn your place at the top.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Monitor your XP, level, and daily streaks as you improve your coding skills.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join thousands of developers practicing algorithms and data structures together.",
  },
  {
    icon: Shield,
    title: "Secure Execution",
    description:
      "Your code runs in isolated environments with strict security measures.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to
            <span className="text-gradient"> level up</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From practicing algorithms to competing with the best, PyChef has all
            the tools you need to become a better programmer.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-gradient-primary transition-all duration-300 mb-4">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
