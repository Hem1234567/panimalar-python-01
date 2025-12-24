import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Zap, Trophy, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface DailyChallenge {
  id: string;
  problem_id: string;
  challenge_date: string;
  bonus_xp: number;
  problem?: {
    id: string;
    title: string;
    difficulty: string;
  };
}

const DailyChallengeCard = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodaysChallenge();
  }, [user]);

  const fetchTodaysChallenge = async () => {
    setIsLoading(true);

    const today = new Date().toISOString().split("T")[0];

    // Get today's challenge
    const { data: challengeData } = await supabase
      .from("daily_challenges")
      .select("*, problem:problems(id, title, difficulty)")
      .eq("challenge_date", today)
      .maybeSingle();

    if (challengeData) {
      // Transform the data to match our interface
      const transformedChallenge: DailyChallenge = {
        id: challengeData.id,
        problem_id: challengeData.problem_id,
        challenge_date: challengeData.challenge_date,
        bonus_xp: challengeData.bonus_xp,
        problem: challengeData.problem as DailyChallenge["problem"],
      };
      setChallenge(transformedChallenge);

      // Check if user completed it
      if (user) {
        const { data: completion } = await supabase
          .from("daily_challenge_completions")
          .select("id")
          .eq("user_id", user.id)
          .eq("challenge_id", challengeData.id)
          .maybeSingle();

        setIsCompleted(!!completion);
      }
    }

    setIsLoading(false);
  };

  const difficultyColors = {
    Easy: "bg-difficulty-easy/20 text-difficulty-easy",
    Medium: "bg-difficulty-medium/20 text-difficulty-medium",
    Hard: "bg-difficulty-hard/20 text-difficulty-hard",
  };

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!challenge || !challenge.problem) {
    return (
      <Card className="relative overflow-hidden border-dashed">
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No daily challenge today</p>
          <p className="text-sm text-muted-foreground">Check back tomorrow!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className={`relative overflow-hidden ${isCompleted ? "border-green-500/50" : "border-primary/50"} bg-gradient-to-br from-card to-secondary/30`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Daily Challenge</CardTitle>
                <CardDescription>
                  {new Date(challenge.challenge_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
            </div>
            {isCompleted && (
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                {challenge.problem.title}
              </h3>
              <Badge 
                variant="secondary" 
                className={difficultyColors[challenge.problem.difficulty as keyof typeof difficultyColors]}
              >
                {challenge.problem.difficulty}
              </Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-primary">
                <Zap className="h-5 w-5" />
                <span className="text-2xl font-bold">+{challenge.bonus_xp}</span>
              </div>
              <span className="text-xs text-muted-foreground">Bonus XP</span>
            </div>
          </div>

          <Link to={`/problems/${challenge.problem.id}`}>
            <Button 
              className="w-full" 
              variant={isCompleted ? "secondary" : "hero"}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <>
                  <Trophy className="h-4 w-4 mr-2" />
                  Challenge Completed!
                </>
              ) : (
                <>
                  Start Challenge
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailyChallengeCard;
