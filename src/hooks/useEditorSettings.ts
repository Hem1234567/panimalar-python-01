import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface EditorSettings {
  editor_theme: string;
  font_size: number;
  word_wrap: boolean;
  vim_mode: boolean;
  show_line_numbers: boolean;
  auto_save: boolean;
}

export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  editor_theme: "vs-dark",
  font_size: 14,
  word_wrap: false,
  vim_mode: false,
  show_line_numbers: true,
  auto_save: true,
};

const STORAGE_KEY = "pychef-editor-settings";

export const useEditorSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_EDITOR_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);

      if (!user) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            setSettings({ ...DEFAULT_EDITOR_SETTINGS, ...JSON.parse(stored) });
          } catch {
            setSettings(DEFAULT_EDITOR_SETTINGS);
          }
        } else {
          setSettings(DEFAULT_EDITOR_SETTINGS);
        }

        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_settings")
          .select("editor_theme, font_size, word_wrap, vim_mode, show_line_numbers, auto_save")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setSettings({
            editor_theme: data.editor_theme,
            font_size: data.font_size,
            word_wrap: data.word_wrap,
            vim_mode: data.vim_mode,
            show_line_numbers: data.show_line_numbers,
            auto_save: data.auto_save,
          });
        } else {
          // Ensure a default row exists for authenticated users
          await supabase
            .from("user_settings")
            .upsert({ user_id: user.id, ...DEFAULT_EDITOR_SETTINGS }, { onConflict: "user_id" });
          setSettings(DEFAULT_EDITOR_SETTINGS);
        }
      } catch (error) {
        console.error("Error fetching editor settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSettings();
  }, [user]);

  const persistSettings = useCallback(
    async (next: EditorSettings) => {
      if (!user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return;
      }

      setIsSaving(true);
      try {
        const { error } = await supabase
          .from("user_settings")
          .upsert({ user_id: user.id, ...next }, { onConflict: "user_id" });

        if (error) throw error;
      } catch (error) {
        console.error("Error saving editor settings:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [user]
  );

  const updateSettings = useCallback(
    async (updates: Partial<EditorSettings>) => {
      const next = { ...settingsRef.current, ...updates };
      setSettings(next);
      await persistSettings(next);
    },
    [persistSettings]
  );

  const resetSettings = useCallback(async () => {
    const next = DEFAULT_EDITOR_SETTINGS;
    setSettings(next);

    if (!user) {
      localStorage.removeItem(STORAGE_KEY);
      return next;
    }

    await persistSettings(next);
    return next;
  }, [persistSettings, user]);

  return {
    settings,
    isLoading,
    isSaving,
    updateSettings,
    resetSettings,
  };
};
