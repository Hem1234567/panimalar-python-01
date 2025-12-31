import { motion } from "framer-motion";
import { 
  Trophy, Award, Star, Rocket, CheckCircle, Flame, Zap, 
  Timer, Moon, Sunrise, Crown, LucideIcon 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xp_reward: number;
}

interface AchievementCardProps {
  achievement: Achievement;
  earned: boolean;
  earnedAt?: string;
}

const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  award: Award,
  star: Star,
  rocket: Rocket,
  "check-circle": CheckCircle,
  flame: Flame,
  zap: Zap,
  timer: Timer,
  moon: Moon,
  sunrise: Sunrise,
  crown: Crown,
};

const categoryColors: Record<string, string> = {
  milestones: "bg-blue-500/20 text-blue-400",
  progress: "bg-green-500/20 text-green-400",
  streaks: "bg-orange-500/20 text-orange-400",
  mastery: "bg-purple-500/20 text-purple-400",
  special: "bg-pink-500/20 text-pink-400",
};

const AchievementCard = ({ achievement, earned, earnedAt }: AchievementCardProps) => {
  const IconComponent = iconMap[achievement.icon] || Trophy;
  const categoryColor = categoryColors[achievement.category] || categoryColors.milestones;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: earned ? 1.02 : 1 }}
      className={`p-4 rounded-xl border transition-all ${
        earned 
          ? "bg-card border-primary/30 shadow-lg shadow-primary/10" 
          : "bg-secondary/30 border-border opacity-60 grayscale"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-lg ${earned ? "bg-primary/20" : "bg-muted"}`}>
          <IconComponent className={`h-6 w-6 ${earned ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold truncate ${earned ? "text-foreground" : "text-muted-foreground"}`}>
              {achievement.name}
            </h3>
            {earned && (
              <Badge variant="default" className="shrink-0 text-xs">
                +{achievement.xp_reward} XP
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className={`text-xs ${categoryColor}`}>
              {achievement.category}
            </Badge>
            {earned && earnedAt && (
              <span className="text-xs text-muted-foreground">
                {new Date(earnedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
