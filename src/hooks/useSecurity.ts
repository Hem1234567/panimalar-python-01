import { useEffect } from "react";

/**
 * Security hook that implements various client-side security measures.
 * Note: These are deterrents only - determined users can always bypass client-side protections.
 * Real security must be implemented server-side (RLS, authentication, etc.)
 */
export const useSecurityMeasures = (enableAll: boolean = true) => {
  useEffect(() => {
    if (!enableAll) return;

    // Disable right-click context menu in production
    const handleContextMenu = (e: MouseEvent) => {
      if (import.meta.env.PROD) {
        e.preventDefault();
      }
    };

    // Disable common dev tool keyboard shortcuts in production
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!import.meta.env.PROD) return;

      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    // Console warning message
    if (import.meta.env.PROD) {
      const warningStyles = [
        "color: red",
        "font-size: 24px",
        "font-weight: bold",
      ].join(";");

      const messageStyles = [
        "color: black",
        "font-size: 14px",
      ].join(";");

      console.log("%c⚠️ STOP!", warningStyles);
      console.log(
        "%cThis browser feature is intended for developers. If someone told you to copy and paste something here to enable a feature or 'hack' someone's account, it is a scam and will give them access to your account.",
        messageStyles
      );
    }

    // Clear console periodically in production
    let consoleClearInterval: ReturnType<typeof setInterval> | null = null;
    if (import.meta.env.PROD) {
      consoleClearInterval = setInterval(() => {
        console.clear();
      }, 10000);
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      if (consoleClearInterval) {
        clearInterval(consoleClearInterval);
      }
    };
  }, [enableAll]);
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check password strength
 */
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push("Password should be at least 8 characters");

  if (password.length >= 12) score++;

  if (/[a-z]/.test(password)) score++;
  else feedback.push("Include lowercase letters");

  if (/[A-Z]/.test(password)) score++;
  else feedback.push("Include uppercase letters");

  if (/[0-9]/.test(password)) score++;
  else feedback.push("Include numbers");

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else feedback.push("Include special characters");

  return { score, feedback };
};

/**
 * Generate a secure random token
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
};
