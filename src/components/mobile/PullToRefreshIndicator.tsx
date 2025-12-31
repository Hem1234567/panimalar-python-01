import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowDown } from "lucide-react";

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  threshold?: number;
}

const PullToRefreshIndicator = ({
  pullDistance,
  isRefreshing,
  threshold = 80,
}: PullToRefreshIndicatorProps) => {
  const progress = Math.min(pullDistance / threshold, 1);
  const shouldShow = pullDistance > 10 || isRefreshing;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-0 right-0 flex justify-center z-50 pointer-events-none"
          style={{ top: pullDistance > 0 ? pullDistance - 40 : 0 }}
        >
          <div className="bg-secondary border border-border rounded-full p-2 shadow-lg">
            {isRefreshing ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <motion.div
                animate={{ rotate: progress >= 1 ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowDown
                  className={`h-5 w-5 transition-colors ${
                    progress >= 1 ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PullToRefreshIndicator;
