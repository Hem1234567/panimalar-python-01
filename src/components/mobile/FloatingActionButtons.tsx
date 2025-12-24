import { motion } from "framer-motion";
import { Play, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonsProps {
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
}

const FloatingActionButtons = ({
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
}: FloatingActionButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-4 left-4 z-40 flex gap-3 md:hidden"
    >
      <Button
        variant="outline"
        size="lg"
        onClick={onRun}
        disabled={isRunning || isSubmitting}
        className="flex-1 h-14 text-base font-semibold bg-background/95 backdrop-blur-sm border-2 shadow-lg"
      >
        {isRunning ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <Play className="h-5 w-5 mr-2" />
        )}
        Run
      </Button>
      <Button
        variant="hero"
        size="lg"
        onClick={onSubmit}
        disabled={isRunning || isSubmitting}
        className="flex-1 h-14 text-base font-semibold shadow-lg"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <Send className="h-5 w-5 mr-2" />
        )}
        Submit
      </Button>
    </motion.div>
  );
};

export default FloatingActionButtons;
