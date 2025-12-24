import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Medal, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardUser {
  user_id: string;
  name: string;
  xp: number;
  level: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("user_id, name, xp, level")
      .order("xp", { ascending: false })
      .limit(50);

    if (data) {
      setUsers(data);
    }
    setIsLoading(false);
  };

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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-7">User</div>
                  <div className="col-span-2">XP</div>
                  <div className="col-span-2">Level</div>
                </div>
                {users.map((user, index) => (
                  <motion.div
                    key={user.user_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-secondary/30 items-center"
                  >
                    <div className="col-span-1">
                      {index < 3 ? (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0
                              ? "bg-warning/20 text-warning"
                              : index === 1
                              ? "bg-muted-foreground/20 text-muted-foreground"
                              : "bg-orange-500/20 text-orange-500"
                          }`}
                        >
                          <Medal className="h-4 w-4" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <div className="col-span-7 font-medium text-foreground">{user.name}</div>
                    <div className="col-span-2 text-primary font-semibold">{user.xp.toLocaleString()}</div>
                    <div className="col-span-2 text-muted-foreground">{user.level}</div>
                  </motion.div>
                ))}

                {users.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-muted-foreground">No users yet. Be the first!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Leaderboard;
