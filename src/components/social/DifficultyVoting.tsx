import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface DifficultyVotingProps {
  problemId: string;
  currentDifficulty: string;
}

interface VoteCounts {
  Easy: number;
  Medium: number;
  Hard: number;
}

const DifficultyVoting = ({ problemId, currentDifficulty }: DifficultyVotingProps) => {
  const { user } = useAuth();
  const [votes, setVotes] = useState<VoteCounts>({ Easy: 0, Medium: 0, Hard: 0 });
  const [userVote, setUserVote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchVotes = async () => {
    const { data: allVotes } = await supabase
      .from("difficulty_votes")
      .select("perceived_difficulty")
      .eq("problem_id", problemId);

    if (allVotes) {
      const counts: VoteCounts = { Easy: 0, Medium: 0, Hard: 0 };
      allVotes.forEach(v => {
        if (v.perceived_difficulty in counts) {
          counts[v.perceived_difficulty as keyof VoteCounts]++;
        }
      });
      setVotes(counts);
    }

    if (user) {
      const { data: myVote } = await supabase
        .from("difficulty_votes")
        .select("perceived_difficulty")
        .eq("problem_id", problemId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (myVote) {
        setUserVote(myVote.perceived_difficulty);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVotes();
    }
  }, [isOpen, problemId, user]);

  const handleVote = async (difficulty: string) => {
    if (!user) {
      toast.error("Please log in to vote");
      return;
    }

    setIsLoading(true);

    try {
      if (userVote) {
        // Update existing vote
        const { error } = await supabase
          .from("difficulty_votes")
          .update({ perceived_difficulty: difficulty })
          .eq("problem_id", problemId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Insert new vote
        const { error } = await supabase
          .from("difficulty_votes")
          .insert({
            user_id: user.id,
            problem_id: problemId,
            perceived_difficulty: difficulty,
          });

        if (error) throw error;
      }

      setUserVote(difficulty);
      await fetchVotes();
      toast.success("Vote recorded!");
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to record vote");
    } finally {
      setIsLoading(false);
    }
  };

  const totalVotes = votes.Easy + votes.Medium + votes.Hard;
  const getPercentage = (count: number) => totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

  const difficultyColors = {
    Easy: "bg-difficulty-easy/20 text-difficulty-easy",
    Medium: "bg-difficulty-medium/20 text-difficulty-medium",
    Hard: "bg-difficulty-hard/20 text-difficulty-hard",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Rate Difficulty</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Rate Problem Difficulty
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            How difficult did you find this problem?
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(["Easy", "Medium", "Hard"] as const).map((difficulty) => (
              <Button
                key={difficulty}
                variant={userVote === difficulty ? "default" : "outline"}
                className={`flex-col h-auto py-4 ${userVote === difficulty ? "" : difficultyColors[difficulty]}`}
                onClick={() => handleVote(difficulty)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="font-semibold">{difficulty}</span>
                    <span className="text-xs mt-1">{votes[difficulty]} votes</span>
                  </>
                )}
              </Button>
            ))}
          </div>

          {totalVotes > 0 && (
            <div className="space-y-2 mt-4">
              <div className="text-sm font-medium text-center mb-3">
                Community Perception ({totalVotes} votes)
              </div>
              {(["Easy", "Medium", "Hard"] as const).map((difficulty) => (
                <div key={difficulty} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={difficultyColors[difficulty].split(" ")[1]}>{difficulty}</span>
                    <span>{getPercentage(votes[difficulty])}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getPercentage(votes[difficulty])}%` }}
                      className={`h-full ${difficulty === "Easy" ? "bg-green-500" : difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center pt-2">
            Official difficulty: <Badge variant="secondary" className={difficultyColors[currentDifficulty as keyof typeof difficultyColors]}>{currentDifficulty}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultyVoting;
