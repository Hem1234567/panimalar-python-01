import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const mockSubmissions = [
  { id: "1", problem: "Two Sum", status: "Accepted", time: "2 min ago" },
  { id: "2", problem: "Palindrome", status: "Accepted", time: "1 hour ago" },
  { id: "3", problem: "Merge Intervals", status: "Wrong Answer", time: "2 hours ago" },
];

const Submissions = () => {
  return (
    <>
      <Helmet>
        <title>Submissions - PyChef</title>
        <meta name="description" content="View your code submissions on PyChef." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated={true} />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">My Submissions</h1>
              <p className="text-muted-foreground">Track all your code submissions</p>
            </motion.div>
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              {mockSubmissions.map((sub, i) => (
                <Link key={sub.id} to={`/problems/${sub.id}`} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-secondary/30">
                  <div className="flex items-center gap-4">
                    {sub.status === "Accepted" ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <XCircle className="h-5 w-5 text-destructive" />}
                    <span className="font-medium text-foreground">{sub.problem}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={sub.status === "Accepted" ? "text-accent" : "text-destructive"}>{sub.status}</span>
                    <span className="text-sm text-muted-foreground">{sub.time}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Submissions;
