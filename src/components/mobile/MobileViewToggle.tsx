import { motion } from "framer-motion";
import { FileText, Code } from "lucide-react";

interface MobileViewToggleProps {
  activeView: "description" | "editor";
  onViewChange: (view: "description" | "editor") => void;
}

const MobileViewToggle = ({ activeView, onViewChange }: MobileViewToggleProps) => {
  return (
    <div className="flex md:hidden bg-secondary border-b border-border p-1 gap-1">
      <button
        onClick={() => onViewChange("description")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
          activeView === "description"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <FileText className="h-4 w-4" />
        Problem
      </button>
      <button
        onClick={() => onViewChange("editor")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
          activeView === "editor"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Code className="h-4 w-4" />
        Code
      </button>
    </div>
  );
};

export default MobileViewToggle;
