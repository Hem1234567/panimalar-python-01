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
      className="fixed bottom-6 right-6 z-40 flex gap-3"
    >
      <Button
        variant="outline"
        size="lg"
        onClick={onRun}
        disabled={isRunning || isSubmitting}
        className="h-12 px-5 text-sm font-semibold bg-[#1e1e1e] hover:bg-[#2a2a2a] border-[#444] text-[#ccc] shadow-lg"
      >
        {isRunning ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Play className="h-4 w-4 mr-2" />
        )}
        Run
      </Button>
      <Button
        size="lg"
        onClick={onSubmit}
        disabled={isRunning || isSubmitting}
        className="h-12 px-5 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Send className="h-4 w-4 mr-2" />
        )}
        Submit
      </Button>
    </motion.div>
  );
};

export default FloatingActionButtons;