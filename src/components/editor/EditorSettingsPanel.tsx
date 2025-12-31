import { memo, useState } from "react";
import { Settings, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useEditorSettings, EditorSettings } from "@/hooks/useEditorSettings";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface EditorSettingsPanelProps {
  onSettingsChange?: (settings: EditorSettings) => void;
}

const EditorSettingsPanel = memo(({ onSettingsChange }: EditorSettingsPanelProps) => {
  const { user } = useAuth();
  const { settings, isLoading, isSaving, updateSettings, resetSettings } = useEditorSettings();
  const [open, setOpen] = useState(false);

  const handleSettingChange = async <K extends keyof EditorSettings>(
    key: K,
    value: EditorSettings[K]
  ) => {
    const next = { ...settings, [key]: value };
    await updateSettings({ [key]: value });
    onSettingsChange?.(next);
  };

  const handleReset = async () => {
    const next = await resetSettings();
    onSettingsChange?.(next);
    toast.success("Editor settings reset to defaults");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Editor settings</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Editor Settings
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Your settings are saved to your account automatically."
              : "Sign in to save settings to your account."}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6 py-2">
            {/* Theme Selection */}
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.editor_theme}
                onValueChange={(value) => handleSettingChange("editor_theme", value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vs-dark">Dark (VS Code)</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="hc-black">High Contrast Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="fontSize">Font Size</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {settings.font_size}px
                </span>
              </div>
              <Slider
                id="fontSize"
                min={10}
                max={24}
                step={1}
                value={[settings.font_size]}
                onValueChange={([value]) => handleSettingChange("font_size", value)}
              />
            </div>

            <Separator />

            {/* Toggle Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="wordWrap">Word Wrap</Label>
                  <p className="text-xs text-muted-foreground">
                    Wrap long lines to fit the editor width
                  </p>
                </div>
                <Switch
                  id="wordWrap"
                  checked={settings.word_wrap}
                  onCheckedChange={(checked) => handleSettingChange("word_wrap", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="lineNumbers">Line Numbers</Label>
                  <p className="text-xs text-muted-foreground">
                    Show line numbers in the gutter
                  </p>
                </div>
                <Switch
                  id="lineNumbers"
                  checked={settings.show_line_numbers}
                  onCheckedChange={(checked) =>
                    handleSettingChange("show_line_numbers", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSave">Auto Save</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically save code to local storage
                  </p>
                </div>
                <Switch
                  id="autoSave"
                  checked={settings.auto_save}
                  onCheckedChange={(checked) => handleSettingChange("auto_save", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="vimMode">Vim Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable Vim keybindings in the editor
                  </p>
                </div>
                <Switch
                  id="vimMode"
                  checked={settings.vim_mode}
                  onCheckedChange={(checked) => handleSettingChange("vim_mode", checked)}
                />
              </div>
            </div>

            <Separator />

            {/* Reset Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Reset to Defaults
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
});

EditorSettingsPanel.displayName = "EditorSettingsPanel";

export default EditorSettingsPanel;
