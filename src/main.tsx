import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Security: Add meta tags for Content Security Policy
if (import.meta.env.PROD) {
  // Create CSP meta tag
  const cspMeta = document.createElement("meta");
  cspMeta.httpEquiv = "Content-Security-Policy";
  cspMeta.content = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
  document.head.appendChild(cspMeta);

  // X-Content-Type-Options
  const xContentType = document.createElement("meta");
  xContentType.httpEquiv = "X-Content-Type-Options";
  xContentType.content = "nosniff";
  document.head.appendChild(xContentType);

  // Referrer Policy
  const referrerPolicy = document.createElement("meta");
  referrerPolicy.name = "referrer";
  referrerPolicy.content = "strict-origin-when-cross-origin";
  document.head.appendChild(referrerPolicy);
}

createRoot(document.getElementById("root")!).render(<App />);
