import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Medal, Loader2, Trophy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import PullToRefreshIndicator from "@/components/mobile/PullToRefreshIndicator";

interface LeaderboardUser {
  user_id: string;
  name: string;
  xp: number;
  level: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from("profiles")
      .select("user_id, name, xp, level")
      .order("xp", { ascending: false })
      .limit(50);

    if (data) {
      setUsers(data);
    }
    setIsLoading(false);
  }, []);

  const { containerRef, pullDistance, isRefreshing, handlers } = usePullToRefresh({
    onRefresh: fetchLeaderboard,
  });

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <>
      <Helmet>
        <title>Leaderboard - PyChef</title>
        <meta name="description" content="See top Python coders on PyChef leaderboard." />
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Top performers ranked by XP</p>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-secondary/50 border-b border-border text-xs sm:text-sm font-medium text-muted-foreground">
                  <div className="col-span-2 sm:col-span-1">Rank</div>
                  <div className="col-span-6 sm:col-span-7">User</div>
                  <div className="col-span-2">XP</div>
                  <div className="col-span-2">Level</div>
                </div>

                {/* Mobile Header */}
                <div className="sm:hidden px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    <span>Top Performers</span>
                  </div>
                </div>

                {users.map((user, index) => (
                  <motion.div
                    key={user.user_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/30"
                  >
                    {/* Desktop View */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 items-center">
                      <div className="col-span-2 sm:col-span-1">
                        {index < 3 ? (
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                              index === 0
                                ? "bg-warning/20 text-warning"
                                : index === 1
                                ? "bg-muted-foreground/20 text-muted-foreground"
                                : "bg-orange-500/20 text-orange-500"
                            }`}
                          >
                            <Medal className="h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div className="col-span-6 sm:col-span-7 font-medium text-foreground text-sm truncate">{user.name}</div>
                      <div className="col-span-2 text-primary font-semibold text-sm">{user.xp.toLocaleString()}</div>
                      <div className="col-span-2 text-muted-foreground text-sm">{user.level}</div>
                    </div>

                    {/* Mobile View */}
                    <div className="sm:hidden px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
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
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <span className="text-muted-foreground text-sm font-medium">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{user.name}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-primary font-semibold">{user.xp.toLocaleString()} XP</span>
                            <span className="text-xs text-muted-foreground">Level {user.level}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {users.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-muted-foreground">No users yet. Be the first!</p>
                  </div>
                )}
              </div>
            )}

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

export default Leaderboard;
