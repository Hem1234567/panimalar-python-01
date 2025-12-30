import { useState, useEffect, useCallback } from "react";
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

const defaultSettings: EditorSettings = {
  editor_theme: "vs-dark",
  font_size: 14,
  word_wrap: false,
  vim_mode: false,
  show_line_numbers: true,
  auto_save: true,
};

export const useEditorSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<EditorSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch settings from database
  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) {
        // Use localStorage for non-authenticated users
        const stored = localStorage.getItem("pychef-editor-settings");
        if (stored) {
          try {
            setSettings({ ...defaultSettings, ...JSON.parse(stored) });
          } catch {
            setSettings(defaultSettings);
          }
        }
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_settings")
          .select("*")
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
        }
      } catch (error) {
        console.error("Error fetching editor settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [user]);

  // Save settings to database
  const updateSettings = useCallback(
    async (updates: Partial<EditorSettings>) => {
      const newSettings = { ...settings, ...updates };
      setSettings(newSettings);

      if (!user) {
        // Save to localStorage for non-authenticated users
        localStorage.setItem("pychef-editor-settings", JSON.stringify(newSettings));
        return;
      }

      setIsSaving(true);
      try {
        const { error } = await supabase
          .from("user_settings")
          .upsert(
            {
              user_id: user.id,
              ...newSettings,
            },
            { onConflict: "user_id" }
          );

        if (error) throw error;
      } catch (error) {
        console.error("Error saving editor settings:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [settings, user]
  );

  const resetSettings = useCallback(async () => {
    setSettings(defaultSettings);

    if (!user) {
      localStorage.removeItem("pychef-editor-settings");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert(
          {
            user_id: user.id,
            ...defaultSettings,
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;
    } catch (error) {
      console.error("Error resetting editor settings:", error);
    } finally {
      setIsSaving(false);
    }
  }, [user]);

  return {
    settings,
    isLoading,
    isSaving,
    updateSettings,
    resetSettings,
  };
};
