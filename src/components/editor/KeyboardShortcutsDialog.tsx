import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsDialogProps {
  trigger?: React.ReactNode;
}

const shortcuts = [
  { keys: ["Ctrl", "Enter"], description: "Run code" },
  { keys: ["Ctrl", "Shift", "Enter"], description: "Submit code" },
  { keys: ["Ctrl", "S"], description: "Save code (auto-saved)" },
  { keys: ["Ctrl", "/"], description: "Toggle line comment" },
  { keys: ["Ctrl", "D"], description: "Select next occurrence" },
  { keys: ["Ctrl", "Z"], description: "Undo" },
  { keys: ["Ctrl", "Shift", "Z"], description: "Redo" },
  { keys: ["Ctrl", "F"], description: "Find" },
  { keys: ["Ctrl", "H"], description: "Find and replace" },
  { keys: ["Tab"], description: "Indent selection" },
  { keys: ["Shift", "Tab"], description: "Outdent selection" },
  { keys: ["Ctrl", "A"], description: "Select all" },
  { keys: ["Alt", "↑"], description: "Move line up" },
  { keys: ["Alt", "↓"], description: "Move line down" },
];

const KeyboardShortcutsDialog = ({ trigger }: KeyboardShortcutsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
            <Keyboard className="h-3 w-3 sm:mr-1" />
            <span className="hidden sm:inline">Shortcuts</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50"
            >
              <span className="text-sm text-foreground">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <span key={keyIndex} className="flex items-center">
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border border-border rounded">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="mx-1 text-muted-foreground">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Tip: On Mac, use ⌘ instead of Ctrl
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsDialog;
