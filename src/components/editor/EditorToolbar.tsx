import { memo } from "react";
import { Save } from "lucide-react";

interface EditorToolbarProps {
  lastSaved: Date | null;
}

const EditorToolbar = memo(({ lastSaved }: EditorToolbarProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-[#333] text-sm">
      {/* Left: Filename & Python version */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-[#ccc] font-medium">solution.py</span>
        <span className="text-[#888]">Python 3.11</span>
      </div>
      
      {/* Right: Save status & shortcuts */}
      <div className="flex items-center gap-4 text-[#888]">
        {lastSaved && (
          <div className="flex items-center gap-1.5">
            <Save className="h-3.5 w-3.5" />
            <span>Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        )}
        <span className="hidden sm:inline">
          Ctrl+Enter: Run · Ctrl+Shift+Enter: Submit
        </span>
      </div>
    </div>
  );
});

EditorToolbar.displayName = "EditorToolbar";

export default EditorToolbar;