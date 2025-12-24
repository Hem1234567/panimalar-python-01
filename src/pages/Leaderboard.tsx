import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const mockUsers = [
  { rank: 1, name: "Alice Chen", xp: 15420, level: 25, solved: 156 },
  { rank: 2, name: "Bob Smith", xp: 14890, level: 24, solved: 148 },
  { rank: 3, name: "Carol Wu", xp: 13200, level: 22, solved: 132 },
  { rank: 4, name: "David Kim", xp: 11500, level: 20, solved: 115 },
  { rank: 5, name: "Eva Martinez", xp: 10200, level: 18, solved: 102 },
];

const Leaderboard = () => {
  return (
    <>
      <Helmet>
        <title>Leaderboard - PyChef</title>
        <meta name="description" content="See top Python coders on PyChef leaderboard." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
              <p className="text-muted-foreground">Top performers ranked by XP</p>
            </motion.div>
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">User</div>
                <div className="col-span-2">XP</div>
                <div className="col-span-2">Level</div>
                <div className="col-span-2">Solved</div>
              </div>
              {mockUsers.map((user, index) => (
                <motion.div key={user.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-secondary/30 items-center">
                  <div className="col-span-1">
                    {user.rank <= 3 ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.rank === 1 ? "bg-warning/20 text-warning" : user.rank === 2 ? "bg-muted-foreground/20 text-muted-foreground" : "bg-orange-500/20 text-orange-500"}`}>
                        <Medal className="h-4 w-4" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground">{user.rank}</span>
                    )}
                  </div>
                  <div className="col-span-5 font-medium text-foreground">{user.name}</div>
                  <div className="col-span-2 text-primary font-semibold">{user.xp.toLocaleString()}</div>
                  <div className="col-span-2 text-muted-foreground">{user.level}</div>
                  <div className="col-span-2 text-muted-foreground">{user.solved}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Leaderboard;
