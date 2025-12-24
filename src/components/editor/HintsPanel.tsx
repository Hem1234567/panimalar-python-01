import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Lock, Unlock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Hint {
  id: string;
  hint_order: number;
  content: string;
  xp_cost: number;
}

interface ViewedHint {
  hint_id: string;
}

interface HintsPanelProps {
  problemId: string;
}

const HintsPanel = ({ problemId }: HintsPanelProps) => {
  const { user, profile, refreshProfile } = useAuth();
  const [hints, setHints] = useState<Hint[]>([]);
  const [viewedHints, setViewedHints] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unlockingHintId, setUnlockingHintId] = useState<string | null>(null);

  const fetchHints = async () => {
    setIsLoading(true);
    
    const { data: hintsData } = await supabase
      .from("problem_hints")
      .select("*")
      .eq("problem_id", problemId)
      .order("hint_order", { ascending: true });

    if (hintsData) {
      setHints(hintsData);
    }

    if (user) {
      const { data: viewedData } = await supabase
        .from("user_hint_views")
        .select("hint_id")
        .eq("user_id", user.id);

      if (viewedData) {
        setViewedHints(new Set(viewedData.map(v => v.hint_id)));
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && problemId) {
      fetchHints();
    }
  }, [isOpen, problemId, user]);

  const unlockHint = async (hint: Hint) => {
    if (!user || !profile) {
      toast.error("Please log in to unlock hints");
      return;
    }

    if (profile.xp < hint.xp_cost) {
      toast.error(`Not enough XP. You need ${hint.xp_cost} XP to unlock this hint.`);
      return;
    }

    setUnlockingHintId(hint.id);

    try {
      // Deduct XP
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ xp: profile.xp - hint.xp_cost })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // Record the view
      const { error: insertError } = await supabase
        .from("user_hint_views")
        .insert({ user_id: user.id, hint_id: hint.id });

      if (insertError) throw insertError;

      setViewedHints(prev => new Set([...prev, hint.id]));
      refreshProfile();
      toast.success("Hint unlocked!");
    } catch (error) {
      console.error("Error unlocking hint:", error);
      toast.error("Failed to unlock hint");
    } finally {
      setUnlockingHintId(null);
    }
  };

  const canUnlockHint = (hint: Hint, index: number): boolean => {
    if (viewedHints.has(hint.id)) return false;
    if (index === 0) return true;
    // Must unlock previous hints first
    const previousHint = hints[index - 1];
    return previousHint ? viewedHints.has(previousHint.id) : true;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          <span className="hidden sm:inline">Hints</span>
          {hints.length > 0 && (
            <span className="text-xs text-muted-foreground">
              ({viewedHints.size}/{hints.length})
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Progressive Hints
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          {profile && (
            <div className="mb-4 p-3 rounded-lg bg-secondary/50 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your XP</span>
              <span className="font-semibold text-primary">{profile.xp} XP</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : hints.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hints available for this problem</p>
              <p className="text-sm">Try solving it on your own!</p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-4 pr-4">
                <AnimatePresence>
                  {hints.map((hint, index) => {
                    const isUnlocked = viewedHints.has(hint.id);
                    const canUnlock = canUnlockHint(hint, index);
                    const isLocked = !isUnlocked && !canUnlock;

                    return (
                      <motion.div
                        key={hint.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          isUnlocked 
                            ? "bg-card border-primary/30" 
                            : isLocked
                            ? "bg-muted/50 border-border opacity-50"
                            : "bg-card border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isUnlocked ? (
                              <Unlock className="h-4 w-4 text-green-500" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="font-medium text-foreground">
                              Hint {hint.hint_order}
                            </span>
                          </div>
                          {!isUnlocked && (
                            <span className="text-xs text-muted-foreground">
                              -{hint.xp_cost} XP
                            </span>
                          )}
                        </div>

                        {isUnlocked ? (
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {hint.content}
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {isLocked ? (
                              <Alert variant="default" className="py-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-xs">
                                  Unlock previous hints first
                                </AlertDescription>
                              </Alert>
                            ) : (
                              <Button
                                onClick={() => unlockHint(hint)}
                                disabled={unlockingHintId === hint.id}
                                className="w-full"
                                variant="secondary"
                              >
                                {unlockingHintId === hint.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                  <Unlock className="h-4 w-4 mr-2" />
                                )}
                                Unlock for {hint.xp_cost} XP
                              </Button>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </ScrollArea>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HintsPanel;
