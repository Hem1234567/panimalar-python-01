import { memo } from "react";
import {
  Play,
  Send,
  RotateCcw,
  Wand2,
  Copy,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  Save,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import KeyboardShortcutsDialog from "./KeyboardShortcutsDialog";
import CodeHistoryPanel from "./CodeHistoryPanel";
import CodeTemplatesPanel from "./CodeTemplatesPanel";
import { toast } from "sonner";

interface EditorToolbarProps {
  code: string;
  problemId?: string;
  editorTheme: string;
  isFullscreen: boolean;
  isRunning: boolean;
  isSubmitting: boolean;
  lastSaved: Date | null;
  onRun: () => void;
  onSubmit: () => void;
  onFormat: () => void;
  onReset: () => void;
  onToggleTheme: () => void;
  onToggleFullscreen: () => void;
  onLoadCode: (code: string) => void;
}

const EditorToolbar = memo(({
  code,
  problemId,
  editorTheme,
  isFullscreen,
  isRunning,
  isSubmitting,
  lastSaved,
  onRun,
  onSubmit,
  onFormat,
  onReset,
  onToggleTheme,
  onToggleFullscreen,
  onLoadCode,
}: EditorToolbarProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Primary Toolbar - Actions */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 md:px-4">
        {/* Left: Run & Submit */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onRun}
                disabled={isRunning || isSubmitting}
                size="sm"
                variant="secondary"
                className="gap-1.5 font-medium"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Run</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Run code with sample input</p>
              <p className="text-xs text-muted-foreground">Ctrl+Enter</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onSubmit}
                disabled={isRunning || isSubmitting}
                size="sm"
                className="gap-1.5 font-medium bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Submit</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Submit solution for judging</p>
              <p className="text-xs text-muted-foreground">Ctrl+Shift+Enter</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Right: Editor Controls */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onFormat}
                className="h-8 w-8"
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Format code</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy code</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-5 mx-1 hidden sm:block" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                className="h-8 w-8"
              >
                {editorTheme === "vs-dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {editorTheme === "vs-dark" ? "Light theme" : "Dark theme"}
            </TooltipContent>
          </Tooltip>

          <div className="hidden md:flex items-center">
            <KeyboardShortcutsDialog />
            {problemId && (
              <CodeHistoryPanel problemId={problemId} onLoadCode={onLoadCode} />
            )}
            <CodeTemplatesPanel currentCode={code} onLoadTemplate={onLoadCode} />
          </div>

          <Separator orientation="vertical" className="h-5 mx-1 hidden sm:block" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFullscreen}
                className="h-8 w-8 hidden sm:flex"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </TooltipContent>
          </Tooltip>

          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Reset code</TooltipContent>
            </Tooltip>
            <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Reset code?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete your saved code and restore the default template. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onReset}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Reset Code
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 md:px-4 bg-secondary/50 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="font-mono text-foreground/80">solution.py</span>
          <span className="hidden sm:inline">Python 3.11</span>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="flex items-center gap-1">
              <Save className="h-3 w-3" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          <span className="hidden lg:inline">
            Ctrl+Enter: Run · Ctrl+Shift+Enter: Submit
          </span>
        </div>
      </div>
    </div>
  );
});

EditorToolbar.displayName = "EditorToolbar";

export default EditorToolbar;
