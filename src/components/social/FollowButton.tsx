import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, UserMinus, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface FollowButtonProps {
  targetUserId: string;
  targetUserName?: string;
  showCount?: boolean;
}

const FollowButton = ({ targetUserId, targetUserName, showCount = false }: FollowButtonProps) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && targetUserId) {
      checkFollowStatus();
      if (showCount) {
        fetchFollowersCount();
      }
    }
  }, [user, targetUserId]);

  const checkFollowStatus = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", targetUserId)
      .maybeSingle();

    setIsFollowing(!!data);
  };

  const fetchFollowersCount = async () => {
    const { count } = await supabase
      .from("follows")
      .select("id", { count: "exact" })
      .eq("following_id", targetUserId);

    setFollowersCount(count || 0);
  };

  const handleFollow = async () => {
    if (!user) {
      toast.error("Please log in to follow users");
      return;
    }

    if (user.id === targetUserId) {
      toast.error("You can't follow yourself");
      return;
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", user.id)
          .eq("following_id", targetUserId);

        if (error) throw error;
        setIsFollowing(false);
        if (showCount) setFollowersCount(prev => prev - 1);
        toast.success(`Unfollowed ${targetUserName || "user"}`);
      } else {
        const { error } = await supabase
          .from("follows")
          .insert({
            follower_id: user.id,
            following_id: targetUserId,
          });

        if (error) throw error;
        setIsFollowing(true);
        if (showCount) setFollowersCount(prev => prev + 1);
        toast.success(`Following ${targetUserName || "user"}`);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.id === targetUserId) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        onClick={handleFollow}
        disabled={isLoading || !user}
        className="gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isFollowing ? (
          <UserMinus className="h-4 w-4" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      {showCount && (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Users className="h-4 w-4" />
          {followersCount}
        </span>
      )}
    </div>
  );
};

export default FollowButton;
