import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Loader2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AchievementCard from "./AchievementCard";

interface Achievement {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xp_reward: number;
}

interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
}

const AchievementsPanel = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    
    const { data: achievementsData } = await supabase
      .from("achievements")
      .select("*")
      .order("category", { ascending: true });

    if (achievementsData) {
      setAchievements(achievementsData);
    }

    if (user) {
      const { data: userAchievementsData } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id);

      if (userAchievementsData) {
        setUserAchievements(userAchievementsData);
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, user]);

  const earnedIds = new Set(userAchievements.map(ua => ua.achievement_id));
  const earnedCount = earnedIds.size;
  const totalCount = achievements.length;

  const categories = [...new Set(achievements.map(a => a.category))];

  const getEarnedAt = (achievementId: string) => {
    const ua = userAchievements.find(u => u.achievement_id === achievementId);
    return ua?.earned_at;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="hidden sm:inline">Achievements</span>
          {earnedCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              {earnedCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
            <span className="text-sm font-normal text-muted-foreground">
              ({earnedCount}/{totalCount})
            </span>
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="earned">Earned</TabsTrigger>
              <TabsTrigger value="locked">Locked</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-3 pr-4">
                  {categories.map(category => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 capitalize">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {achievements
                          .filter(a => a.category === category)
                          .map(achievement => (
                            <AchievementCard
                              key={achievement.id}
                              achievement={achievement}
                              earned={earnedIds.has(achievement.id)}
                              earnedAt={getEarnedAt(achievement.id)}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="earned" className="mt-4">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-2 pr-4">
                  {achievements
                    .filter(a => earnedIds.has(a.id))
                    .map(achievement => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        earned={true}
                        earnedAt={getEarnedAt(achievement.id)}
                      />
                    ))}
                  {earnedIds.size === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No achievements earned yet</p>
                      <p className="text-sm">Keep solving problems!</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="locked" className="mt-4">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-2 pr-4">
                  {achievements
                    .filter(a => !earnedIds.has(a.id))
                    .map(achievement => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        earned={false}
                      />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AchievementsPanel;
