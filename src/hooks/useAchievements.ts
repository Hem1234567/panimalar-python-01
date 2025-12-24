import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Achievement {
  id: string;
  key: string;
  name: string;
  xp_reward: number;
}

export const useAchievements = () => {
  const checkAndAwardAchievement = useCallback(async (
    userId: string,
    achievementKey: string
  ) => {
    try {
      // Get the achievement
      const { data: achievement } = await supabase
        .from("achievements")
        .select("*")
        .eq("key", achievementKey)
        .maybeSingle();

      if (!achievement) return null;

      // Check if already earned
      const { data: existing } = await supabase
        .from("user_achievements")
        .select("id")
        .eq("user_id", userId)
        .eq("achievement_id", achievement.id)
        .maybeSingle();

      if (existing) return null;

      // Award the achievement
      const { error } = await supabase
        .from("user_achievements")
        .insert({ user_id: userId, achievement_id: achievement.id });

      if (error) throw error;

      // Update user XP
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp")
        .eq("user_id", userId)
        .single();

      if (profile) {
        await supabase
          .from("profiles")
          .update({ xp: profile.xp + achievement.xp_reward })
          .eq("user_id", userId);
      }

      // Show achievement toast
      toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`, {
        description: `+${achievement.xp_reward} XP`,
        duration: 5000,
      });

      return achievement;
    } catch (error) {
      console.error("Error awarding achievement:", error);
      return null;
    }
  }, []);

  const checkProgressAchievements = useCallback(async (userId: string) => {
    try {
      // Get solved problems count
      const { data: submissions } = await supabase
        .from("submissions")
        .select("problem_id")
        .eq("user_id", userId)
        .eq("status", "Accepted");

      if (!submissions) return;

      const uniqueSolved = new Set(submissions.map(s => s.problem_id)).size;

      // Check progress achievements
      if (uniqueSolved >= 5) await checkAndAwardAchievement(userId, "solve_5");
      if (uniqueSolved >= 10) await checkAndAwardAchievement(userId, "solve_10");
      if (uniqueSolved >= 25) await checkAndAwardAchievement(userId, "solve_25");
      if (uniqueSolved >= 50) await checkAndAwardAchievement(userId, "solve_50");

      // Check streak achievements
      const { data: profile } = await supabase
        .from("profiles")
        .select("streak")
        .eq("user_id", userId)
        .single();

      if (profile) {
        if (profile.streak >= 3) await checkAndAwardAchievement(userId, "streak_3");
        if (profile.streak >= 7) await checkAndAwardAchievement(userId, "streak_7");
        if (profile.streak >= 30) await checkAndAwardAchievement(userId, "streak_30");
      }
    } catch (error) {
      console.error("Error checking progress achievements:", error);
    }
  }, [checkAndAwardAchievement]);

  const checkSubmissionAchievements = useCallback(async (
    userId: string, 
    isAccepted: boolean,
    submissionTime?: Date
  ) => {
    try {
      // First submission
      const { data: submissions, count } = await supabase
        .from("submissions")
        .select("id", { count: "exact" })
        .eq("user_id", userId);

      if (count === 1) {
        await checkAndAwardAchievement(userId, "first_submission");
      }

      // First accepted
      if (isAccepted) {
        const { data: acceptedSubmissions } = await supabase
          .from("submissions")
          .select("id")
          .eq("user_id", userId)
          .eq("status", "Accepted");

        if (acceptedSubmissions && acceptedSubmissions.length === 1) {
          await checkAndAwardAchievement(userId, "first_accepted");
        }
      }

      // Time-based achievements
      if (submissionTime) {
        const hour = submissionTime.getHours();
        if (hour >= 0 && hour < 6) {
          await checkAndAwardAchievement(userId, "night_owl");
        }
        if (hour >= 4 && hour < 6) {
          await checkAndAwardAchievement(userId, "early_bird");
        }
      }

      // Check progress achievements
      if (isAccepted) {
        await checkProgressAchievements(userId);
      }
    } catch (error) {
      console.error("Error checking submission achievements:", error);
    }
  }, [checkAndAwardAchievement, checkProgressAchievements]);

  return {
    checkAndAwardAchievement,
    checkProgressAchievements,
    checkSubmissionAchievements,
  };
};
