# Project Context

## File: .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.vercel

```

## File: components.json

```
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}

```

## File: eslint.config.js

```
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);

```

## File: index.html

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    
    <title>PyChef - Learn Python Coding</title>
    <meta name="description" content="Master Python programming through interactive challenges and coding exercises. Practice with real problems and track your progress." />
    <meta name="author" content="PyChef" />
    
    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#6366f1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="PyChef" />
    <link rel="apple-touch-icon" href="/pwa-192x192.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="PyChef - Learn Python Coding" />
    <meta property="og:description" content="Master Python programming through interactive challenges and coding exercises" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@PyChef" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## File: package.json

```
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@monaco-editor/react": "^4.7.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@supabase/supabase-js": "^2.89.0",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.26",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "monaco-editor": "^0.55.1",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "vite-plugin-pwa": "^1.2.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "lovable-tagger": "^1.1.13",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19"
  }
}

```

## File: postcss.config.js

```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

## File: README.md

```
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

```

## File: tailwind.config.ts

```
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
        difficulty: {
          easy: "hsl(var(--difficulty-easy))",
          medium: "hsl(var(--difficulty-medium))",
          hard: "hsl(var(--difficulty-hard))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

```

## File: tsconfig.app.json

```
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitAny": false,
    "noFallthroughCasesInSwitch": false,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## File: tsconfig.json

```
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}

```

## File: tsconfig.node.json

```
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

## File: vite.config.ts

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "PyChef - Learn Python Coding",
        short_name: "PyChef",
        description: "Master Python programming through interactive challenges and coding exercises",
        theme_color: "#6366f1",
        background_color: "#0a0a0a",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

```

## File: public\placeholder.svg

```
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" fill="none"><rect width="1200" height="1200" fill="#EAEAEA" rx="3"/><g opacity=".5"><g opacity=".5"><path fill="#FAFAFA" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/></g><path stroke="url(#a)" stroke-width="2.418" d="M0-1.209h553.581" transform="scale(1 -1) rotate(45 1163.11 91.165)"/><path stroke="url(#b)" stroke-width="2.418" d="M404.846 598.671h391.726"/><path stroke="url(#c)" stroke-width="2.418" d="M599.5 795.742V404.017"/><path stroke="url(#d)" stroke-width="2.418" d="m795.717 796.597-391.441-391.44"/><path fill="#fff" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/><g clip-path="url(#e)"><path fill="#666" fill-rule="evenodd" d="M616.426 586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074 8.463-8.463h2.565l7.18 7.181V586.58Zm-15.715 14.654 3.698 3.699 1.283 1.282-2.565 2.565-1.282-1.283-5.2-5.199h-6.066l-5.514 5.514-.073.073v2.876a2.418 2.418 0 0 0 2.418 2.418h26.598a2.418 2.418 0 0 0 2.418-2.418v-8.317l-8.463-8.463-7.181 7.181-.071.072Zm-19.347 5.442v4.085a6.045 6.045 0 0 0 6.046 6.045h26.598a6.044 6.044 0 0 0 6.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z" clip-rule="evenodd"/></g><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/></g><defs><linearGradient id="a" x1="554.061" x2="-.48" y1=".083" y2=".087" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="b" x1="796.912" x2="404.507" y1="599.963" y2="599.965" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="600.792" x2="600.794" y1="403.677" y2="796.082" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="d" x1="404.85" x2="796.972" y1="403.903" y2="796.02" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><clipPath id="e"><path fill="#fff" d="M581.364 580.535h38.689v38.689h-38.689z"/></clipPath></defs></svg>
```

## File: public\robots.txt

```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

```

## File: src\App.css

```
/* Clean reset - removing Vite defaults that interfere with full-page layouts */
#root {
  min-height: 100vh;
}


/* Monaco Editor - prevent the internal textarea from rendering as a visible box.
   On mobile, keep it functional (Monaco relies on it more heavily), but make it invisible.
   On desktop, fully apply a visually-hidden pattern.
*/

/* Mobile-first: invisible but functional */
.monaco-editor textarea,
textarea.inputarea,
.monaco-editor textarea.inputarea,
.monaco-editor .inputarea {
  /* Mobile-safe: don't fight Monaco positioning; just make it invisible */
  opacity: 0 !important;
  background: transparent !important;
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
  color: transparent !important;
  caret-color: transparent !important;
}

/* Desktop: fully visually-hidden (keeps focus/IME working) */
@media (min-width: 768px) {
  .monaco-editor textarea,
  textarea.inputarea,
  .monaco-editor textarea.inputarea,
  .monaco-editor .inputarea {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    min-width: 1px !important;
    min-height: 1px !important;
    max-width: 1px !important;
    max-height: 1px !important;
    margin: -1px !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
    overflow: hidden !important;
    resize: none !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    white-space: nowrap !important;
    opacity: 0 !important;
    background: transparent !important;
  }
}


```

## File: src\App.tsx

```
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { useSecurityMeasures } from "@/hooks/useSecurity";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Submissions from "./pages/Submissions";
import Admin from "./pages/Admin";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SecurityWrapper = ({ children }: { children: React.ReactNode }) => {
  // Enable security measures in production
  useSecurityMeasures(import.meta.env.PROD);
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <TooltipProvider>
              <SecurityWrapper>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/problems" element={<Problems />} />
                    <Route path="/problems/:id" element={<ProblemDetail />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/submissions" element={<Submissions />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/install" element={<Install />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </SecurityWrapper>
            </TooltipProvider>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

```

## File: src\index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* PyChef Design System - Competitive Programming Theme */

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --primary: 250 89% 55%;
    --primary-foreground: 0 0% 100%;

    --secondary: 220 14% 96%;
    --secondary-foreground: 222 47% 11%;

    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;

    --accent: 142 71% 45%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 250 89% 55%;

    --radius: 0.75rem;

    /* Custom tokens */
    --success: 142 71% 45%;
    --warning: 38 92% 50%;
    --error: 0 84% 60%;
    --info: 217 91% 60%;
    
    /* Difficulty colors */
    --difficulty-easy: 142 71% 40%;
    --difficulty-medium: 38 92% 45%;
    --difficulty-hard: 0 84% 55%;
    
    /* Code editor */
    --editor-bg: 220 14% 96%;
    --editor-line: 220 13% 91%;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(250 89% 55%) 0%, hsl(280 89% 50%) 100%);
    --gradient-success: linear-gradient(135deg, hsl(142 71% 45%) 0%, hsl(160 71% 40%) 100%);
    --gradient-card: linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 14% 98%) 100%);
    --gradient-hero: linear-gradient(180deg, hsl(220 14% 98%) 0%, hsl(220 14% 96%) 100%);

    /* Shadows */
    --shadow-glow: 0 0 40px hsl(250 89% 55% / 0.1);
    --shadow-card: 0 4px 24px hsl(222 47% 11% / 0.08);
    --shadow-button: 0 4px 16px hsl(250 89% 55% / 0.2);

    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 222 47% 11%;
    --sidebar-primary: 250 89% 55%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 220 14% 96%;
    --sidebar-accent-foreground: 222 47% 11%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 250 89% 55%;
  }

  .dark {
    --background: 222 47% 6%;
    --foreground: 210 40% 98%;

    --card: 222 47% 8%;
    --card-foreground: 210 40% 98%;

    --popover: 222 47% 10%;
    --popover-foreground: 210 40% 98%;

    --primary: 250 89% 60%;
    --primary-foreground: 210 40% 98%;

    --secondary: 222 47% 12%;
    --secondary-foreground: 210 40% 98%;

    --muted: 222 47% 14%;
    --muted-foreground: 215 20% 55%;

    --accent: 142 71% 45%;
    --accent-foreground: 222 47% 6%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --border: 222 47% 16%;
    --input: 222 47% 14%;
    --ring: 250 89% 60%;

    /* Custom tokens */
    --success: 142 71% 45%;
    --warning: 38 92% 50%;
    --error: 0 84% 60%;
    --info: 217 91% 60%;
    
    /* Difficulty colors */
    --difficulty-easy: 142 71% 45%;
    --difficulty-medium: 38 92% 50%;
    --difficulty-hard: 0 84% 60%;
    
    /* Code editor */
    --editor-bg: 222 47% 5%;
    --editor-line: 222 47% 10%;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(250 89% 60%) 0%, hsl(280 89% 55%) 100%);
    --gradient-success: linear-gradient(135deg, hsl(142 71% 45%) 0%, hsl(160 71% 40%) 100%);
    --gradient-card: linear-gradient(180deg, hsl(222 47% 10%) 0%, hsl(222 47% 8%) 100%);
    --gradient-hero: linear-gradient(180deg, hsl(222 47% 8%) 0%, hsl(222 47% 4%) 100%);

    /* Shadows */
    --shadow-glow: 0 0 40px hsl(250 89% 60% / 0.15);
    --shadow-card: 0 4px 24px hsl(0 0% 0% / 0.3);
    --shadow-button: 0 4px 16px hsl(250 89% 60% / 0.25);

    --sidebar-background: 222 47% 6%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-primary: 250 89% 60%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 222 47% 12%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 222 47% 14%;
    --sidebar-ring: 250 89% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Space Grotesk', sans-serif;
  }

  code, pre, .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent;
    background-image: var(--gradient-primary);
  }

  .bg-gradient-primary {
    background-image: var(--gradient-primary);
  }

  .bg-gradient-success {
    background-image: var(--gradient-success);
  }

  .bg-gradient-hero {
    background-image: var(--gradient-hero);
  }

  .shadow-glow {
    box-shadow: var(--shadow-glow);
  }

  .shadow-card {
    box-shadow: var(--shadow-card);
  }

  .shadow-button {
    box-shadow: var(--shadow-button);
  }

  .difficulty-easy {
    @apply text-[hsl(var(--difficulty-easy))];
  }

  .difficulty-medium {
    @apply text-[hsl(var(--difficulty-medium))];
  }

  .difficulty-hard {
    @apply text-[hsl(var(--difficulty-hard))];
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slide-up 0.5s ease-out forwards;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px hsl(250 89% 60% / 0.2); }
  50% { box-shadow: 0 0 40px hsl(250 89% 60% / 0.4); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

```

## File: src\main.tsx

```
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./App.css";

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

```

## File: src\vite-env.d.ts

```
/// <reference types="vite/client" />

```

## File: src\components\NavLink.tsx

```
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

```

## File: src\components\achievements\AchievementCard.tsx

```
import { motion } from "framer-motion";
import { 
  Trophy, Award, Star, Rocket, CheckCircle, Flame, Zap, 
  Timer, Moon, Sunrise, Crown, LucideIcon 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xp_reward: number;
}

interface AchievementCardProps {
  achievement: Achievement;
  earned: boolean;
  earnedAt?: string;
}

const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  award: Award,
  star: Star,
  rocket: Rocket,
  "check-circle": CheckCircle,
  flame: Flame,
  zap: Zap,
  timer: Timer,
  moon: Moon,
  sunrise: Sunrise,
  crown: Crown,
};

const categoryColors: Record<string, string> = {
  milestones: "bg-blue-500/20 text-blue-400",
  progress: "bg-green-500/20 text-green-400",
  streaks: "bg-orange-500/20 text-orange-400",
  mastery: "bg-purple-500/20 text-purple-400",
  special: "bg-pink-500/20 text-pink-400",
};

const AchievementCard = ({ achievement, earned, earnedAt }: AchievementCardProps) => {
  const IconComponent = iconMap[achievement.icon] || Trophy;
  const categoryColor = categoryColors[achievement.category] || categoryColors.milestones;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: earned ? 1.02 : 1 }}
      className={`p-4 rounded-xl border transition-all ${
        earned 
          ? "bg-card border-primary/30 shadow-lg shadow-primary/10" 
          : "bg-secondary/30 border-border opacity-60 grayscale"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-lg ${earned ? "bg-primary/20" : "bg-muted"}`}>
          <IconComponent className={`h-6 w-6 ${earned ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold truncate ${earned ? "text-foreground" : "text-muted-foreground"}`}>
              {achievement.name}
            </h3>
            {earned && (
              <Badge variant="default" className="shrink-0 text-xs">
                +{achievement.xp_reward} XP
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className={`text-xs ${categoryColor}`}>
              {achievement.category}
            </Badge>
            {earned && earnedAt && (
              <span className="text-xs text-muted-foreground">
                {new Date(earnedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;

```

## File: src\components\achievements\AchievementsPanel.tsx

```
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Loader2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AchievementCard from "./AchievementCard";

interface Achievement {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xp_reward: number;
}

interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
}

const AchievementsPanel = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    
    const { data: achievementsData } = await supabase
      .from("achievements")
      .select("*")
      .order("category", { ascending: true });

    if (achievementsData) {
      setAchievements(achievementsData);
    }

    if (user) {
      const { data: userAchievementsData } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id);

      if (userAchievementsData) {
        setUserAchievements(userAchievementsData);
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, user]);

  const earnedIds = new Set(userAchievements.map(ua => ua.achievement_id));
  const earnedCount = earnedIds.size;
  const totalCount = achievements.length;

  const categories = [...new Set(achievements.map(a => a.category))];

  const getEarnedAt = (achievementId: string) => {
    const ua = userAchievements.find(u => u.achievement_id === achievementId);
    return ua?.earned_at;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="hidden sm:inline">Achievements</span>
          {earnedCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              {earnedCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
            <span className="text-sm font-normal text-muted-foreground">
              ({earnedCount}/{totalCount})
            </span>
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="earned">Earned</TabsTrigger>
              <TabsTrigger value="locked">Locked</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-3 pr-4">
                  {categories.map(category => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 capitalize">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {achievements
                          .filter(a => a.category === category)
                          .map(achievement => (
                            <AchievementCard
                              key={achievement.id}
                              achievement={achievement}
                              earned={earnedIds.has(achievement.id)}
                              earnedAt={getEarnedAt(achievement.id)}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="earned" className="mt-4">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-2 pr-4">
                  {achievements
                    .filter(a => earnedIds.has(a.id))
                    .map(achievement => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        earned={true}
                        earnedAt={getEarnedAt(achievement.id)}
                      />
                    ))}
                  {earnedIds.size === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No achievements earned yet</p>
                      <p className="text-sm">Keep solving problems!</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="locked" className="mt-4">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-2 pr-4">
                  {achievements
                    .filter(a => !earnedIds.has(a.id))
                    .map(achievement => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        earned={false}
                      />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AchievementsPanel;

```

## File: src\components\challenges\DailyChallengeCard.tsx

```
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Zap, Trophy, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface DailyChallenge {
  id: string;
  problem_id: string;
  challenge_date: string;
  bonus_xp: number;
  problem?: {
    id: string;
    title: string;
    difficulty: string;
  };
}

const DailyChallengeCard = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodaysChallenge();
  }, [user]);

  const fetchTodaysChallenge = async () => {
    setIsLoading(true);

    const today = new Date().toISOString().split("T")[0];

    // Get today's challenge
    const { data: challengeData } = await supabase
      .from("daily_challenges")
      .select("*, problem:problems(id, title, difficulty)")
      .eq("challenge_date", today)
      .maybeSingle();

    if (challengeData) {
      // Transform the data to match our interface
      const transformedChallenge: DailyChallenge = {
        id: challengeData.id,
        problem_id: challengeData.problem_id,
        challenge_date: challengeData.challenge_date,
        bonus_xp: challengeData.bonus_xp,
        problem: challengeData.problem as DailyChallenge["problem"],
      };
      setChallenge(transformedChallenge);

      // Check if user completed it
      if (user) {
        const { data: completion } = await supabase
          .from("daily_challenge_completions")
          .select("id")
          .eq("user_id", user.id)
          .eq("challenge_id", challengeData.id)
          .maybeSingle();

        setIsCompleted(!!completion);
      }
    }

    setIsLoading(false);
  };

  const difficultyColors = {
    Easy: "bg-difficulty-easy/20 text-difficulty-easy",
    Medium: "bg-difficulty-medium/20 text-difficulty-medium",
    Hard: "bg-difficulty-hard/20 text-difficulty-hard",
  };

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!challenge || !challenge.problem) {
    return (
      <Card className="relative overflow-hidden border-dashed">
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No daily challenge today</p>
          <p className="text-sm text-muted-foreground">Check back tomorrow!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className={`relative overflow-hidden ${isCompleted ? "border-green-500/50" : "border-primary/50"} bg-gradient-to-br from-card to-secondary/30`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Daily Challenge</CardTitle>
                <CardDescription>
                  {new Date(challenge.challenge_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
            </div>
            {isCompleted && (
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                {challenge.problem.title}
              </h3>
              <Badge 
                variant="secondary" 
                className={difficultyColors[challenge.problem.difficulty as keyof typeof difficultyColors]}
              >
                {challenge.problem.difficulty}
              </Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-primary">
                <Zap className="h-5 w-5" />
                <span className="text-2xl font-bold">+{challenge.bonus_xp}</span>
              </div>
              <span className="text-xs text-muted-foreground">Bonus XP</span>
            </div>
          </div>

          <Link to={`/problems/${challenge.problem.id}`}>
            <Button 
              className="w-full" 
              variant={isCompleted ? "secondary" : "hero"}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <>
                  <Trophy className="h-4 w-4 mr-2" />
                  Challenge Completed!
                </>
              ) : (
                <>
                  Start Challenge
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailyChallengeCard;

```

## File: src\components\editor\CodeHistoryPanel.tsx

```
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Clock, CheckCircle2, XCircle, Code, ArrowRight, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface SubmissionWithCode {
  id: string;
  code: string;
  status: string;
  created_at: string;
  execution_time: number | null;
}

interface CodeHistoryPanelProps {
  problemId: string;
  onLoadCode: (code: string) => void;
}

const CodeHistoryPanel = ({ problemId, onLoadCode }: CodeHistoryPanelProps) => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionWithCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithCode | null>(null);
  const [compareSubmission, setCompareSubmission] = useState<SubmissionWithCode | null>(null);
  const [isCompareMode, setIsCompareMode] = useState(false);

  const fetchSubmissions = async () => {
    if (!user || !problemId) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("id, code, status, created_at, execution_time")
      .eq("user_id", user.id)
      .eq("problem_id", problemId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      toast.error("Failed to load submission history");
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchSubmissions();
    }
  }, [isOpen, user, problemId]);

  const handleLoadCode = (submission: SubmissionWithCode) => {
    onLoadCode(submission.code);
    setIsOpen(false);
    toast.success("Code loaded from history");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleCompare = (submission: SubmissionWithCode) => {
    if (!compareSubmission) {
      setCompareSubmission(submission);
      setIsCompareMode(true);
      toast.info("Select another submission to compare");
    } else if (compareSubmission.id !== submission.id) {
      setSelectedSubmission(submission);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "Accepted") {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "Accepted" ? "default" : "destructive";
    return <Badge variant={variant} className="text-xs">{status}</Badge>;
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Submission History
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-4">
            {isCompareMode && compareSubmission && (
              <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Comparing with:</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(compareSubmission.status)}
                    <span className="text-sm">
                      {formatDistanceToNow(new Date(compareSubmission.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => {
                      setCompareSubmission(null);
                      setIsCompareMode(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No submissions yet</p>
                <p className="text-sm">Submit your code to see history</p>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-3 pr-4">
                  <AnimatePresence>
                    {submissions.map((submission, index) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-lg border transition-colors ${
                          compareSubmission?.id === submission.id 
                            ? "bg-primary/10 border-primary" 
                            : "bg-card border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(submission.status)}
                            {getStatusBadge(submission.status)}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
                          </div>
                        </div>

                        {submission.execution_time && (
                          <p className="text-xs text-muted-foreground mb-3">
                            Execution: {submission.execution_time.toFixed(3)}s
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleLoadCode(submission)}
                            className="gap-1"
                          >
                            <ArrowRight className="h-3 w-3" />
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyCode(submission.code)}
                            className="gap-1"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedSubmission(submission)}
                            className="gap-1"
                          >
                            <Code className="h-3 w-3" />
                            View
                          </Button>
                          {isCompareMode && compareSubmission?.id !== submission.id && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleCompare(submission)}
                              className="gap-1"
                            >
                              Compare
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Code View Dialog */}
      <Dialog open={!!selectedSubmission && !compareSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Submission Code
              {selectedSubmission && getStatusBadge(selectedSubmission.status)}
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDistanceToNow(new Date(selectedSubmission.created_at), { addSuffix: true })}
                </span>
                {selectedSubmission.execution_time && (
                  <span>Execution: {selectedSubmission.execution_time.toFixed(3)}s</span>
                )}
              </div>
              <ScrollArea className="h-[400px] rounded-lg border bg-muted">
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                  {selectedSubmission.code}
                </pre>
              </ScrollArea>
              <div className="flex gap-2">
                <Button onClick={() => handleLoadCode(selectedSubmission)}>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Load into Editor
                </Button>
                <Button variant="outline" onClick={() => handleCopyCode(selectedSubmission.code)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Compare Dialog */}
      <Dialog 
        open={!!compareSubmission && !!selectedSubmission} 
        onOpenChange={() => {
          setSelectedSubmission(null);
          setCompareSubmission(null);
          setIsCompareMode(false);
        }}
      >
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Compare Submissions</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {compareSubmission && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusBadge(compareSubmission.status)}
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(compareSubmission.created_at), { addSuffix: true })}
                  </span>
                </div>
                <ScrollArea className="h-[400px] rounded-lg border bg-muted">
                  <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                    {compareSubmission.code}
                  </pre>
                </ScrollArea>
              </div>
            )}
            {selectedSubmission && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedSubmission.status)}
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(selectedSubmission.created_at), { addSuffix: true })}
                  </span>
                </div>
                <ScrollArea className="h-[400px] rounded-lg border bg-muted">
                  <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                    {selectedSubmission.code}
                  </pre>
                </ScrollArea>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CodeHistoryPanel;

```

## File: src\components\editor\CodeTemplatesPanel.tsx

```
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, Plus, Trash2, Edit2, ArrowRight, Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string | null;
  code: string;
  language: string;
  created_at: string;
}

interface CodeTemplatesPanelProps {
  currentCode: string;
  onLoadTemplate: (code: string) => void;
}

const CodeTemplatesPanel = ({ currentCode, onLoadTemplate }: CodeTemplatesPanelProps) => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
  });

  const fetchTemplates = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const { data } = await supabase
      .from("user_templates")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) {
      setTemplates(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && user) {
      fetchTemplates();
    }
  }, [isOpen, user]);

  const openCreateDialog = (useCurrentCode: boolean = false) => {
    setFormData({
      name: "",
      description: "",
      code: useCurrentCode ? currentCode : "",
    });
    setEditingTemplate(null);
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (template: Template) => {
    setFormData({
      name: template.name,
      description: template.description || "",
      code: template.code,
    });
    setEditingTemplate(template);
    setIsCreateDialogOpen(true);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!formData.name.trim() || !formData.code.trim()) {
      toast.error("Name and code are required");
      return;
    }

    setIsSaving(true);

    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from("user_templates")
          .update({
            name: formData.name.trim(),
            description: formData.description.trim() || null,
            code: formData.code,
          })
          .eq("id", editingTemplate.id);

        if (error) throw error;
        toast.success("Template updated");
      } else {
        const { error } = await supabase
          .from("user_templates")
          .insert({
            user_id: user.id,
            name: formData.name.trim(),
            description: formData.description.trim() || null,
            code: formData.code,
            language: "python",
          });

        if (error) throw error;
        toast.success("Template created");
      }

      setIsCreateDialogOpen(false);
      fetchTemplates();
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from("user_templates")
        .delete()
        .eq("id", templateId);

      if (error) throw error;
      toast.success("Template deleted");
      fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template");
    }
  };

  const handleLoad = (template: Template) => {
    onLoadTemplate(template.code);
    setIsOpen(false);
    toast.success("Template loaded");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <FileCode className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Code Templates
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => openCreateDialog(false)} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
              <Button onClick={() => openCreateDialog(true)} variant="secondary" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Current
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : templates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileCode className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No templates yet</p>
                <p className="text-sm">Create templates to reuse code patterns</p>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-3 pr-4">
                  <AnimatePresence>
                    {templates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-lg border bg-card border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{template.name}</h3>
                            {template.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {template.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <pre className="text-xs bg-muted p-2 rounded mb-3 overflow-hidden max-h-20 text-muted-foreground">
                          {template.code.slice(0, 200)}
                          {template.code.length > 200 && "..."}
                        </pre>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleLoad(template)}
                            className="flex-1"
                          >
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(template)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(template.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate ? "Edit Template" : "Create Template"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Binary Search Template"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the template"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Code *</Label>
              <Textarea
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="# Your template code here..."
                className="font-mono min-h-[200px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {editingTemplate ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CodeTemplatesPanel;

```

## File: src\components\editor\EditorSettingsPanel.tsx

```
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
    await updateSettings({ [key]: value });
    onSettingsChange?.({ ...settings, [key]: value });
  };

  const handleReset = async () => {
    await resetSettings();
    onSettingsChange?.(settings);
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

```

## File: src\components\editor\EditorToolbar.tsx

```
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
import EditorSettingsPanel from "./EditorSettingsPanel";
import { EditorSettings } from "@/hooks/useEditorSettings";
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
  onSettingsChange?: (settings: EditorSettings) => void;
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
  onSettingsChange,
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
            <EditorSettingsPanel onSettingsChange={onSettingsChange} />
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

```

## File: src\components\editor\HintsPanel.tsx

```
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Lock, Unlock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Hint {
  id: string;
  hint_order: number;
  content: string;
  xp_cost: number;
}

interface ViewedHint {
  hint_id: string;
}

interface HintsPanelProps {
  problemId: string;
}

const HintsPanel = ({ problemId }: HintsPanelProps) => {
  const { user, profile, refreshProfile } = useAuth();
  const [hints, setHints] = useState<Hint[]>([]);
  const [viewedHints, setViewedHints] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unlockingHintId, setUnlockingHintId] = useState<string | null>(null);

  const fetchHints = async () => {
    setIsLoading(true);
    
    const { data: hintsData } = await supabase
      .from("problem_hints")
      .select("*")
      .eq("problem_id", problemId)
      .order("hint_order", { ascending: true });

    if (hintsData) {
      setHints(hintsData);
    }

    if (user) {
      const { data: viewedData } = await supabase
        .from("user_hint_views")
        .select("hint_id")
        .eq("user_id", user.id);

      if (viewedData) {
        setViewedHints(new Set(viewedData.map(v => v.hint_id)));
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && problemId) {
      fetchHints();
    }
  }, [isOpen, problemId, user]);

  const unlockHint = async (hint: Hint) => {
    if (!user || !profile) {
      toast.error("Please log in to unlock hints");
      return;
    }

    if (profile.xp < hint.xp_cost) {
      toast.error(`Not enough XP. You need ${hint.xp_cost} XP to unlock this hint.`);
      return;
    }

    setUnlockingHintId(hint.id);

    try {
      // Deduct XP
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ xp: profile.xp - hint.xp_cost })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // Record the view
      const { error: insertError } = await supabase
        .from("user_hint_views")
        .insert({ user_id: user.id, hint_id: hint.id });

      if (insertError) throw insertError;

      setViewedHints(prev => new Set([...prev, hint.id]));
      refreshProfile();
      toast.success("Hint unlocked!");
    } catch (error) {
      console.error("Error unlocking hint:", error);
      toast.error("Failed to unlock hint");
    } finally {
      setUnlockingHintId(null);
    }
  };

  const canUnlockHint = (hint: Hint, index: number): boolean => {
    if (viewedHints.has(hint.id)) return false;
    if (index === 0) return true;
    // Must unlock previous hints first
    const previousHint = hints[index - 1];
    return previousHint ? viewedHints.has(previousHint.id) : true;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          <span className="hidden sm:inline">Hints</span>
          {hints.length > 0 && (
            <span className="text-xs text-muted-foreground">
              ({viewedHints.size}/{hints.length})
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Progressive Hints
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          {profile && (
            <div className="mb-4 p-3 rounded-lg bg-secondary/50 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your XP</span>
              <span className="font-semibold text-primary">{profile.xp} XP</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : hints.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hints available for this problem</p>
              <p className="text-sm">Try solving it on your own!</p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-4 pr-4">
                <AnimatePresence>
                  {hints.map((hint, index) => {
                    const isUnlocked = viewedHints.has(hint.id);
                    const canUnlock = canUnlockHint(hint, index);
                    const isLocked = !isUnlocked && !canUnlock;

                    return (
                      <motion.div
                        key={hint.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          isUnlocked 
                            ? "bg-card border-primary/30" 
                            : isLocked
                            ? "bg-muted/50 border-border opacity-50"
                            : "bg-card border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isUnlocked ? (
                              <Unlock className="h-4 w-4 text-green-500" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="font-medium text-foreground">
                              Hint {hint.hint_order}
                            </span>
                          </div>
                          {!isUnlocked && (
                            <span className="text-xs text-muted-foreground">
                              -{hint.xp_cost} XP
                            </span>
                          )}
                        </div>

                        {isUnlocked ? (
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {hint.content}
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {isLocked ? (
                              <Alert variant="default" className="py-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-xs">
                                  Unlock previous hints first
                                </AlertDescription>
                              </Alert>
                            ) : (
                              <Button
                                onClick={() => unlockHint(hint)}
                                disabled={unlockingHintId === hint.id}
                                className="w-full"
                                variant="secondary"
                              >
                                {unlockingHintId === hint.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                  <Unlock className="h-4 w-4 mr-2" />
                                )}
                                Unlock for {hint.xp_cost} XP
                              </Button>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </ScrollArea>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HintsPanel;

```

## File: src\components\editor\KeyboardShortcutsDialog.tsx

```
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

```

## File: src\components\landing\CTASection.tsx

```
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-primary shadow-glow mb-8">
            <Rocket className="h-8 w-8 text-primary-foreground" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to become a
            <span className="text-gradient"> Python master?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of developers who are already improving their skills.
            Start solving problems today and track your journey to mastery.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
            <Link to="/problems">
              <Button variant="glass" size="xl">
                Explore Problems
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

```

## File: src\components\landing\FeaturesSection.tsx

```
import { motion } from "framer-motion";
import { Code, Trophy, TrendingUp, Zap, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Interactive Python Editor",
    description:
      "Write, run, and test your Python code directly in the browser with our powerful Monaco editor.",
  },
  {
    icon: Zap,
    title: "Instant Verdicts",
    description:
      "Get immediate feedback on your solutions with our lightning-fast judge system.",
  },
  {
    icon: Trophy,
    title: "Compete & Rank",
    description:
      "Challenge yourself against others on the global leaderboard and earn your place at the top.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Monitor your XP, level, and daily streaks as you improve your coding skills.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join thousands of developers practicing algorithms and data structures together.",
  },
  {
    icon: Shield,
    title: "Secure Execution",
    description:
      "Your code runs in isolated environments with strict security measures.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to
            <span className="text-gradient"> level up</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From practicing algorithms to competing with the best, PyChef has all
            the tools you need to become a better programmer.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-gradient-primary transition-all duration-300 mb-4">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

```

## File: src\components\landing\HeroSection.tsx

```
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Level up your Python skills
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master Python through
              <span className="block text-gradient">Competitive Coding</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg">
              Practice algorithmic problems, compete with developers worldwide,
              and track your progress. The ultimate platform for Python
              enthusiasts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  Start Coding
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link to="/problems">
                <Button variant="outline" size="xl">
                  Browse Problems
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Problems</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100K+</p>
                <p className="text-sm text-muted-foreground">Submissions</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Code Card */}
              <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/70" />
                    <div className="w-3 h-3 rounded-full bg-warning/70" />
                    <div className="w-3 h-3 rounded-full bg-success/70" />
                  </div>
                  <span className="ml-4 text-sm text-muted-foreground font-mono">
                    solution.py
                  </span>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <pre className="text-muted-foreground">
                    <code>
                      <span className="text-primary">def</span>{" "}
                      <span className="text-accent">solve</span>(nums):
                      {"\n"}
                      {"    "}
                      <span className="text-muted-foreground/70">
                        # Find the two numbers that sum to target
                      </span>
                      {"\n"}
                      {"    "}seen = {}
                      {"{}"}{"\n"}
                      {"    "}
                      <span className="text-primary">for</span> i, num{" "}
                      <span className="text-primary">in</span> enumerate(nums):
                      {"\n"}
                      {"        "}complement = target - num{"\n"}
                      {"        "}
                      <span className="text-primary">if</span> complement{" "}
                      <span className="text-primary">in</span> seen:{"\n"}
                      {"            "}
                      <span className="text-primary">return</span> [seen[complement], i]
                      {"\n"}
                      {"        "}seen[num] = i{"\n"}
                      {"    "}
                      <span className="text-primary">return</span> []
                    </code>
                  </pre>
                </div>

                {/* Result Bar */}
                <div className="px-6 py-4 bg-success/10 border-t border-success/20">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-success" />
                    <span className="text-sm font-semibold text-success">
                      All test cases passed!
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -bottom-4 p-4 rounded-xl bg-secondary border border-border shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                    <Code2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">+50 XP</p>
                    <p className="text-xs text-muted-foreground">Problem Solved!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

```

## File: src\components\layout\Footer.tsx

```
import { Link } from "react-router-dom";
import { Code2, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PyChef</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Master Python through competitive programming. Practice, compete,
              and level up your coding skills.
            </p>
          </div>

          {/* Practice */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Practice
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/problems"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/problems?difficulty=easy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Easy Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/problems?difficulty=medium"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Medium Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/problems?difficulty=hard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hard Problems
                </Link>
              </li>
            </ul>
          </div>

          {/* Compete */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Compete
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/leaderboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/submissions"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PyChef. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

```

## File: src\components\layout\Navbar.tsx

```
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Menu, X, Trophy, BookOpen, User, LogOut, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, profile } = useAuth();

  const isAuthenticated = !!user;

  const navLinks = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard", icon: User },
        { href: "/problems", label: "Problems", icon: BookOpen },
        { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
        ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
      ]
    : [
        { href: "/problems", label: "Problems", icon: BookOpen },
        { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
      ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-button">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              PyChef
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {profile?.name?.split(" ")[0] || "Profile"}
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme Toggle & Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-border"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              {isAuthenticated ? (
              <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-lg text-sm font-semibold bg-gradient-primary text-primary-foreground"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

```

## File: src\components\mobile\FloatingActionButtons.tsx

```
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
      className="fixed bottom-6 right-4 left-4 z-40 flex gap-3 md:hidden"
    >
      <Button
        variant="outline"
        size="lg"
        onClick={onRun}
        disabled={isRunning || isSubmitting}
        className="flex-1 h-14 text-base font-semibold bg-background/95 backdrop-blur-sm border-2 shadow-lg"
      >
        {isRunning ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <Play className="h-5 w-5 mr-2" />
        )}
        Run
      </Button>
      <Button
        variant="hero"
        size="lg"
        onClick={onSubmit}
        disabled={isRunning || isSubmitting}
        className="flex-1 h-14 text-base font-semibold shadow-lg"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <Send className="h-5 w-5 mr-2" />
        )}
        Submit
      </Button>
    </motion.div>
  );
};

export default FloatingActionButtons;

```

## File: src\components\mobile\MobileViewToggle.tsx

```
import { FileText, Code, Terminal } from "lucide-react";

interface MobileViewToggleProps {
  activeView: "description" | "editor" | "output";
  onViewChange: (view: "description" | "editor" | "output") => void;
  hasOutput?: boolean;
}

const MobileViewToggle = ({ activeView, onViewChange, hasOutput = false }: MobileViewToggleProps) => {
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
      <button
        onClick={() => onViewChange("output")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
          activeView === "output"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        } ${hasOutput ? "animate-pulse" : ""}`}
      >
        <Terminal className="h-4 w-4" />
        Output
      </button>
    </div>
  );
};

export default MobileViewToggle;

```

## File: src\components\mobile\PullToRefreshIndicator.tsx

```
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowDown } from "lucide-react";

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  threshold?: number;
}

const PullToRefreshIndicator = ({
  pullDistance,
  isRefreshing,
  threshold = 80,
}: PullToRefreshIndicatorProps) => {
  const progress = Math.min(pullDistance / threshold, 1);
  const shouldShow = pullDistance > 10 || isRefreshing;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-0 right-0 flex justify-center z-50 pointer-events-none"
          style={{ top: pullDistance > 0 ? pullDistance - 40 : 0 }}
        >
          <div className="bg-secondary border border-border rounded-full p-2 shadow-lg">
            {isRefreshing ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <motion.div
                animate={{ rotate: progress >= 1 ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowDown
                  className={`h-5 w-5 transition-colors ${
                    progress >= 1 ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PullToRefreshIndicator;

```

## File: src\components\social\Comments.tsx

```
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Trash2, Reply, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  profile?: {
    name: string;
  };
}

interface CommentsProps {
  problemId: string;
}

const Comments = ({ problemId }: CommentsProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    
    const { data: commentsData } = await supabase
      .from("problem_comments")
      .select("*")
      .eq("problem_id", problemId)
      .order("created_at", { ascending: true });

    if (commentsData) {
      // Fetch profiles for all unique user IDs
      const userIds = [...new Set(commentsData.map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, name")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      
      const commentsWithProfiles = commentsData.map(c => ({
        ...c,
        profile: profileMap.get(c.user_id),
      }));

      setComments(commentsWithProfiles);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, problemId]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("problem_comments")
        .insert({
          user_id: user.id,
          problem_id: problemId,
          content: newComment.trim(),
          parent_id: replyingTo,
        });

      if (error) throw error;

      setNewComment("");
      setReplyingTo(null);
      await fetchComments();
      toast.success("Comment posted!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from("problem_comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;

      await fetchComments();
      toast.success("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  // Group comments by parent
  const rootComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Discussion</span>
          {comments.length > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
              {comments.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Discussion ({comments.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col h-[calc(100vh-180px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {rootComments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No comments yet</p>
                    <p className="text-sm">Be the first to start the discussion!</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {rootComments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <CommentItem
                          comment={comment}
                          user={user}
                          onReply={() => setReplyingTo(comment.id)}
                          onDelete={() => handleDelete(comment.id)}
                        />
                        {/* Replies */}
                        <div className="ml-8 space-y-2">
                          {getReplies(comment.id).map((reply) => (
                            <CommentItem
                              key={reply.id}
                              comment={reply}
                              user={user}
                              isReply
                              onDelete={() => handleDelete(reply.id)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </ScrollArea>
          )}

          {/* Comment input */}
          <div className="pt-4 border-t border-border mt-4">
            {replyingTo && (
              <div className="flex items-center justify-between mb-2 px-2 py-1 bg-secondary/50 rounded text-sm">
                <span className="text-muted-foreground">Replying to comment...</span>
                <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={user ? "Write a comment..." : "Log in to comment"}
                disabled={!user || isSubmitting}
                className="min-h-[80px] resize-none"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!user || isSubmitting || !newComment.trim()}
              className="w-full mt-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Post Comment
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface CommentItemProps {
  comment: Comment;
  user: any;
  isReply?: boolean;
  onReply?: () => void;
  onDelete: () => void;
}

const CommentItem = ({ comment, user, isReply, onReply, onDelete }: CommentItemProps) => {
  return (
    <div className={`p-3 rounded-lg bg-card border border-border ${isReply ? "bg-secondary/30" : ""}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/20 text-primary text-xs">
            {comment.profile?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-foreground">
              {comment.profile?.name || "Unknown User"}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          <div className="flex gap-2 mt-2">
            {!isReply && onReply && (
              <Button variant="ghost" size="sm" onClick={onReply} className="h-7 text-xs">
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
            {user?.id === comment.user_id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-7 text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

```

## File: src\components\social\DifficultyVoting.tsx

```
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface DifficultyVotingProps {
  problemId: string;
  currentDifficulty: string;
}

interface VoteCounts {
  Easy: number;
  Medium: number;
  Hard: number;
}

const DifficultyVoting = ({ problemId, currentDifficulty }: DifficultyVotingProps) => {
  const { user } = useAuth();
  const [votes, setVotes] = useState<VoteCounts>({ Easy: 0, Medium: 0, Hard: 0 });
  const [userVote, setUserVote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchVotes = async () => {
    const { data: allVotes } = await supabase
      .from("difficulty_votes")
      .select("perceived_difficulty")
      .eq("problem_id", problemId);

    if (allVotes) {
      const counts: VoteCounts = { Easy: 0, Medium: 0, Hard: 0 };
      allVotes.forEach(v => {
        if (v.perceived_difficulty in counts) {
          counts[v.perceived_difficulty as keyof VoteCounts]++;
        }
      });
      setVotes(counts);
    }

    if (user) {
      const { data: myVote } = await supabase
        .from("difficulty_votes")
        .select("perceived_difficulty")
        .eq("problem_id", problemId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (myVote) {
        setUserVote(myVote.perceived_difficulty);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVotes();
    }
  }, [isOpen, problemId, user]);

  const handleVote = async (difficulty: string) => {
    if (!user) {
      toast.error("Please log in to vote");
      return;
    }

    setIsLoading(true);

    try {
      if (userVote) {
        // Update existing vote
        const { error } = await supabase
          .from("difficulty_votes")
          .update({ perceived_difficulty: difficulty })
          .eq("problem_id", problemId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Insert new vote
        const { error } = await supabase
          .from("difficulty_votes")
          .insert({
            user_id: user.id,
            problem_id: problemId,
            perceived_difficulty: difficulty,
          });

        if (error) throw error;
      }

      setUserVote(difficulty);
      await fetchVotes();
      toast.success("Vote recorded!");
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to record vote");
    } finally {
      setIsLoading(false);
    }
  };

  const totalVotes = votes.Easy + votes.Medium + votes.Hard;
  const getPercentage = (count: number) => totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

  const difficultyColors = {
    Easy: "bg-difficulty-easy/20 text-difficulty-easy",
    Medium: "bg-difficulty-medium/20 text-difficulty-medium",
    Hard: "bg-difficulty-hard/20 text-difficulty-hard",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Rate Difficulty</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Rate Problem Difficulty
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            How difficult did you find this problem?
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(["Easy", "Medium", "Hard"] as const).map((difficulty) => (
              <Button
                key={difficulty}
                variant={userVote === difficulty ? "default" : "outline"}
                className={`flex-col h-auto py-4 ${userVote === difficulty ? "" : difficultyColors[difficulty]}`}
                onClick={() => handleVote(difficulty)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="font-semibold">{difficulty}</span>
                    <span className="text-xs mt-1">{votes[difficulty]} votes</span>
                  </>
                )}
              </Button>
            ))}
          </div>

          {totalVotes > 0 && (
            <div className="space-y-2 mt-4">
              <div className="text-sm font-medium text-center mb-3">
                Community Perception ({totalVotes} votes)
              </div>
              {(["Easy", "Medium", "Hard"] as const).map((difficulty) => (
                <div key={difficulty} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={difficultyColors[difficulty].split(" ")[1]}>{difficulty}</span>
                    <span>{getPercentage(votes[difficulty])}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getPercentage(votes[difficulty])}%` }}
                      className={`h-full ${difficulty === "Easy" ? "bg-green-500" : difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center pt-2">
            Official difficulty: <Badge variant="secondary" className={difficultyColors[currentDifficulty as keyof typeof difficultyColors]}>{currentDifficulty}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultyVoting;

```

## File: src\components\social\FollowButton.tsx

```
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, UserMinus, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface FollowButtonProps {
  targetUserId: string;
  targetUserName?: string;
  showCount?: boolean;
}

const FollowButton = ({ targetUserId, targetUserName, showCount = false }: FollowButtonProps) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && targetUserId) {
      checkFollowStatus();
      if (showCount) {
        fetchFollowersCount();
      }
    }
  }, [user, targetUserId]);

  const checkFollowStatus = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", targetUserId)
      .maybeSingle();

    setIsFollowing(!!data);
  };

  const fetchFollowersCount = async () => {
    const { count } = await supabase
      .from("follows")
      .select("id", { count: "exact" })
      .eq("following_id", targetUserId);

    setFollowersCount(count || 0);
  };

  const handleFollow = async () => {
    if (!user) {
      toast.error("Please log in to follow users");
      return;
    }

    if (user.id === targetUserId) {
      toast.error("You can't follow yourself");
      return;
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", user.id)
          .eq("following_id", targetUserId);

        if (error) throw error;
        setIsFollowing(false);
        if (showCount) setFollowersCount(prev => prev - 1);
        toast.success(`Unfollowed ${targetUserName || "user"}`);
      } else {
        const { error } = await supabase
          .from("follows")
          .insert({
            follower_id: user.id,
            following_id: targetUserId,
          });

        if (error) throw error;
        setIsFollowing(true);
        if (showCount) setFollowersCount(prev => prev + 1);
        toast.success(`Following ${targetUserName || "user"}`);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.id === targetUserId) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        onClick={handleFollow}
        disabled={isLoading || !user}
        className="gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isFollowing ? (
          <UserMinus className="h-4 w-4" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      {showCount && (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Users className="h-4 w-4" />
          {followersCount}
        </span>
      )}
    </div>
  );
};

export default FollowButton;

```

## File: src\components\social\ShareSolutionDialog.tsx

```
import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Heart, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ShareSolutionDialogProps {
  problemId: string;
  submissionId: string;
  problemTitle: string;
}

const ShareSolutionDialog = ({ problemId, submissionId, problemTitle }: ShareSolutionDialogProps) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: `My solution for ${problemTitle}`,
    description: "",
    isPublic: true,
  });

  const handleSubmit = async () => {
    if (!user) return;

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("shared_solutions")
        .insert({
          user_id: user.id,
          problem_id: problemId,
          submission_id: submissionId,
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          is_public: formData.isPublic,
        });

      if (error) throw error;

      toast.success("Solution shared successfully!");
      setIsOpen(false);
      setFormData({
        title: `My solution for ${problemTitle}`,
        description: "",
        isPublic: true,
      });
    } catch (error) {
      console.error("Error sharing solution:", error);
      toast.error("Failed to share solution");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Solution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Give your solution a title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Explain your approach..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public</Label>
              <p className="text-sm text-muted-foreground">
                {formData.isPublic ? "Anyone can see this solution" : "Only you can see this solution"}
              </p>
            </div>
            <Switch
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Share2 className="h-4 w-4 mr-2" />
            )}
            Share Solution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareSolutionDialog;

```

## File: src\components\ui\accordion.tsx

```
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

## File: src\components\ui\alert-dialog.tsx

```
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

```

## File: src\components\ui\alert.tsx

```
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

```

## File: src\components\ui\aspect-ratio.tsx

```
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

```

## File: src\components\ui\avatar.tsx

```
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

```

## File: src\components\ui\badge.tsx

```
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

```

## File: src\components\ui\breadcrumb.tsx

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

```

## File: src\components\ui\button.tsx

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-button hover:shadow-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-primary-foreground shadow-button hover:shadow-glow hover:opacity-90",
        success: "bg-accent text-accent-foreground hover:bg-accent/90",
        glass: "bg-secondary/50 backdrop-blur-sm border border-border/50 text-foreground hover:bg-secondary/70",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

## File: src\components\ui\calendar.tsx

```
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

```

## File: src\components\ui\card.tsx

```
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

```

## File: src\components\ui\carousel.tsx

```
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

```

## File: src\components\ui\chart.tsx

```
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };

```

## File: src\components\ui\checkbox.tsx

```
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```

## File: src\components\ui\collapsible.tsx

```
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```

## File: src\components\ui\command.tsx

```
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

```

## File: src\components\ui\context-menu.tsx

```
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

```

## File: src\components\ui\dialog.tsx

```
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

```

## File: src\components\ui\drawer.tsx

```
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

```

## File: src\components\ui\dropdown-menu.tsx

```
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

```

## File: src\components\ui\form.tsx

```
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };

```

## File: src\components\ui\hover-card.tsx

```
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

```

## File: src\components\ui\input-otp.tsx

```
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  ),
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```

## File: src\components\ui\input.tsx

```
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

```

## File: src\components\ui\label.tsx

```
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```

## File: src\components\ui\menubar.tsx

```
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

```

## File: src\components\ui\navigation-menu.tsx

```
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

```

## File: src\components\ui\pagination.tsx

```
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

```

## File: src\components\ui\popover.tsx

```
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

```

## File: src\components\ui\progress.tsx

```
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

```

## File: src\components\ui\radio-group.tsx

```
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```

## File: src\components\ui\resizable.tsx

```
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

```

## File: src\components\ui\scroll-area.tsx

```
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

```

## File: src\components\ui\select.tsx

```
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

```

## File: src\components\ui\separator.tsx

```
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

```

## File: src\components\ui\sheet.tsx

```
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};

```

## File: src\components\ui\sidebar.tsx

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hover:after:bg-sidebar-border sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-sidebar="input"
        className={cn(
          "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-sidebar="separator"
        className={cn("mx-2 w-auto bg-sidebar-border", className)}
        {...props}
      />
    );
  },
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => (
  <li ref={ref} {...props} />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```

## File: src\components\ui\skeleton.tsx

```
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };

```

## File: src\components\ui\slider.tsx

```
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```

## File: src\components\ui\sonner.tsx

```
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

```

## File: src\components\ui\switch.tsx

```
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

```

## File: src\components\ui\table.tsx

```
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

```

## File: src\components\ui\tabs.tsx

```
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

## File: src\components\ui\textarea.tsx

```
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

```

## File: src\components\ui\theme-toggle.tsx

```
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative h-9 w-9 p-0"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180, opacity: theme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-4 w-4" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === "light" ? 0 : -180, opacity: theme === "light" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-4 w-4" />
      </motion.div>
    </Button>
  );
};

export default ThemeToggle;

```

## File: src\components\ui\toast.tsx

```
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

```

## File: src\components\ui\toaster.tsx

```
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

```

## File: src\components\ui\toggle-group.tsx

```
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

```

## File: src\components\ui\toggle.tsx

```
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

```

## File: src\components\ui\tooltip.tsx

```
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```

## File: src\components\ui\use-toast.ts

```
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };

```

## File: src\contexts\AuthContext.tsx

```
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  user_id: string;
  name: string;
  xp: number;
  level: number;
  streak: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profileData) {
      setProfile(profileData as Profile);
    }

    // Check admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    setIsAdmin(roleData?.role === "admin");
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetch to avoid deadlock
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name },
      },
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsAdmin(false);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isAdmin,
        isLoading,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

```

## File: src\contexts\SettingsContext.tsx

```
import { createContext, useContext, useEffect, useState } from "react";

export type EditorTheme = "vs-dark" | "light";

interface Settings {
  editorTheme: EditorTheme;
  fontSize: number;
  autoSave: boolean;
  notificationsEnabled: boolean;
  showLineNumbers: boolean;
  wordWrap: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  editorTheme: "vs-dark",
  fontSize: 14,
  autoSave: true,
  notificationsEnabled: true,
  showLineNumbers: true,
  wordWrap: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem("pychef-settings");
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("pychef-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

```

## File: src\contexts\ThemeContext.tsx

```
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("pychef-theme");
    return (stored as Theme) || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("pychef-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

```

## File: src\hooks\use-mobile.tsx

```
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

```

## File: src\hooks\use-toast.ts

```
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };

```

## File: src\hooks\useAchievements.ts

```
import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Achievement {
  id: string;
  key: string;
  name: string;
  xp_reward: number;
}

export const useAchievements = () => {
  const checkAndAwardAchievement = useCallback(async (
    userId: string,
    achievementKey: string
  ) => {
    try {
      // Get the achievement
      const { data: achievement } = await supabase
        .from("achievements")
        .select("*")
        .eq("key", achievementKey)
        .maybeSingle();

      if (!achievement) return null;

      // Check if already earned
      const { data: existing } = await supabase
        .from("user_achievements")
        .select("id")
        .eq("user_id", userId)
        .eq("achievement_id", achievement.id)
        .maybeSingle();

      if (existing) return null;

      // Award the achievement
      const { error } = await supabase
        .from("user_achievements")
        .insert({ user_id: userId, achievement_id: achievement.id });

      if (error) throw error;

      // Update user XP
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp")
        .eq("user_id", userId)
        .single();

      if (profile) {
        await supabase
          .from("profiles")
          .update({ xp: profile.xp + achievement.xp_reward })
          .eq("user_id", userId);
      }

      // Show achievement toast
      toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`, {
        description: `+${achievement.xp_reward} XP`,
        duration: 5000,
      });

      return achievement;
    } catch (error) {
      console.error("Error awarding achievement:", error);
      return null;
    }
  }, []);

  const checkProgressAchievements = useCallback(async (userId: string) => {
    try {
      // Get solved problems count
      const { data: submissions } = await supabase
        .from("submissions")
        .select("problem_id")
        .eq("user_id", userId)
        .eq("status", "Accepted");

      if (!submissions) return;

      const uniqueSolved = new Set(submissions.map(s => s.problem_id)).size;

      // Check progress achievements
      if (uniqueSolved >= 5) await checkAndAwardAchievement(userId, "solve_5");
      if (uniqueSolved >= 10) await checkAndAwardAchievement(userId, "solve_10");
      if (uniqueSolved >= 25) await checkAndAwardAchievement(userId, "solve_25");
      if (uniqueSolved >= 50) await checkAndAwardAchievement(userId, "solve_50");

      // Check streak achievements
      const { data: profile } = await supabase
        .from("profiles")
        .select("streak")
        .eq("user_id", userId)
        .single();

      if (profile) {
        if (profile.streak >= 3) await checkAndAwardAchievement(userId, "streak_3");
        if (profile.streak >= 7) await checkAndAwardAchievement(userId, "streak_7");
        if (profile.streak >= 30) await checkAndAwardAchievement(userId, "streak_30");
      }
    } catch (error) {
      console.error("Error checking progress achievements:", error);
    }
  }, [checkAndAwardAchievement]);

  const checkSubmissionAchievements = useCallback(async (
    userId: string, 
    isAccepted: boolean,
    submissionTime?: Date
  ) => {
    try {
      // First submission
      const { data: submissions, count } = await supabase
        .from("submissions")
        .select("id", { count: "exact" })
        .eq("user_id", userId);

      if (count === 1) {
        await checkAndAwardAchievement(userId, "first_submission");
      }

      // First accepted
      if (isAccepted) {
        const { data: acceptedSubmissions } = await supabase
          .from("submissions")
          .select("id")
          .eq("user_id", userId)
          .eq("status", "Accepted");

        if (acceptedSubmissions && acceptedSubmissions.length === 1) {
          await checkAndAwardAchievement(userId, "first_accepted");
        }
      }

      // Time-based achievements
      if (submissionTime) {
        const hour = submissionTime.getHours();
        if (hour >= 0 && hour < 6) {
          await checkAndAwardAchievement(userId, "night_owl");
        }
        if (hour >= 4 && hour < 6) {
          await checkAndAwardAchievement(userId, "early_bird");
        }
      }

      // Check progress achievements
      if (isAccepted) {
        await checkProgressAchievements(userId);
      }
    } catch (error) {
      console.error("Error checking submission achievements:", error);
    }
  }, [checkAndAwardAchievement, checkProgressAchievements]);

  return {
    checkAndAwardAchievement,
    checkProgressAchievements,
    checkSubmissionAchievements,
  };
};

```

## File: src\hooks\useEditorSettings.ts

```
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

```

## File: src\hooks\usePullToRefresh.ts

```
import { useState, useRef, useCallback, TouchEvent } from "react";

interface PullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
}

export const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
}: PullToRefreshOptions) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    if (diff > 0 && containerRef.current?.scrollTop === 0) {
      setPullDistance(Math.min(diff * 0.5, threshold * 1.5));
    }
  }, [isPulling, isRefreshing, threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setIsPulling(false);
    setPullDistance(0);
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  return {
    containerRef,
    pullDistance,
    isRefreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};

```

## File: src\hooks\useSecurity.ts

```
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

```

## File: src\hooks\useSwipeGesture.ts

```
import { useState, useRef, useCallback, TouchEvent } from "react";

interface SwipeGestureOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const useSwipeGesture = ({
  threshold = 50,
  onSwipeLeft,
  onSwipeRight,
}: SwipeGestureOptions) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (diff < 0 && onSwipeRight) {
        onSwipeRight();
      }
    }
  }, [threshold, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};

```

## File: src\integrations\supabase\client.ts

```
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

## File: src\integrations\supabase\types.ts

```
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          key: string
          name: string
          xp_reward: number
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon?: string
          id?: string
          key: string
          name: string
          xp_reward?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          key?: string
          name?: string
          xp_reward?: number
        }
        Relationships: []
      }
      daily_challenge_completions: {
        Row: {
          challenge_id: string
          completed_at: string
          id: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenge_completions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_challenges: {
        Row: {
          bonus_xp: number
          challenge_date: string
          created_at: string
          id: string
          problem_id: string
        }
        Insert: {
          bonus_xp?: number
          challenge_date: string
          created_at?: string
          id?: string
          problem_id: string
        }
        Update: {
          bonus_xp?: number
          challenge_date?: string
          created_at?: string
          id?: string
          problem_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      difficulty_votes: {
        Row: {
          created_at: string
          id: string
          perceived_difficulty: string
          problem_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          perceived_difficulty: string
          problem_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          perceived_difficulty?: string
          problem_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "difficulty_votes_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      problem_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          problem_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          problem_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          problem_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problem_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "problem_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problem_comments_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      problem_hints: {
        Row: {
          content: string
          created_at: string
          hint_order: number
          id: string
          problem_id: string
          xp_cost: number
        }
        Insert: {
          content: string
          created_at?: string
          hint_order?: number
          id?: string
          problem_id: string
          xp_cost?: number
        }
        Update: {
          content?: string
          created_at?: string
          hint_order?: number
          id?: string
          problem_id?: string
          xp_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "problem_hints_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      problems: {
        Row: {
          constraints: string | null
          created_at: string
          difficulty: string
          id: string
          input_format: string | null
          output_format: string | null
          samples: Json
          statement: string
          tags: string[] | null
          testcases: Json
          time_limit: number
          title: string
          updated_at: string
        }
        Insert: {
          constraints?: string | null
          created_at?: string
          difficulty: string
          id?: string
          input_format?: string | null
          output_format?: string | null
          samples?: Json
          statement: string
          tags?: string[] | null
          testcases?: Json
          time_limit?: number
          title: string
          updated_at?: string
        }
        Update: {
          constraints?: string | null
          created_at?: string
          difficulty?: string
          id?: string
          input_format?: string | null
          output_format?: string | null
          samples?: Json
          statement?: string
          tags?: string[] | null
          testcases?: Json
          time_limit?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          last_active: string | null
          level: number
          name: string
          streak: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          created_at?: string
          id?: string
          last_active?: string | null
          level?: number
          name: string
          streak?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          created_at?: string
          id?: string
          last_active?: string | null
          level?: number
          name?: string
          streak?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      shared_solutions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          likes_count: number
          problem_id: string
          submission_id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          likes_count?: number
          problem_id: string
          submission_id: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          likes_count?: number
          problem_id?: string
          submission_id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_solutions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_solutions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      solution_likes: {
        Row: {
          created_at: string
          id: string
          solution_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          solution_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          solution_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solution_likes_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "shared_solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          code: string
          created_at: string
          execution_time: number | null
          id: string
          language: string
          output: string | null
          problem_id: string
          status: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          execution_time?: number | null
          id?: string
          language?: string
          output?: string | null
          problem_id: string
          status: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          execution_time?: number | null
          id?: string
          language?: string
          output?: string | null
          problem_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_hint_views: {
        Row: {
          hint_id: string
          id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          hint_id: string
          id?: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          hint_id?: string
          id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_hint_views_hint_id_fkey"
            columns: ["hint_id"]
            isOneToOne: false
            referencedRelation: "problem_hints"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_save: boolean
          created_at: string
          editor_theme: string
          font_size: number
          id: string
          show_line_numbers: boolean
          updated_at: string
          user_id: string
          vim_mode: boolean
          word_wrap: boolean
        }
        Insert: {
          auto_save?: boolean
          created_at?: string
          editor_theme?: string
          font_size?: number
          id?: string
          show_line_numbers?: boolean
          updated_at?: string
          user_id: string
          vim_mode?: boolean
          word_wrap?: boolean
        }
        Update: {
          auto_save?: boolean
          created_at?: string
          editor_theme?: string
          font_size?: number
          id?: string
          show_line_numbers?: boolean
          updated_at?: string
          user_id?: string
          vim_mode?: boolean
          word_wrap?: boolean
        }
        Relationships: []
      }
      user_templates: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          language: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          language?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          language?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const

```

## File: src\lib\utils.ts

```
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

## File: src\pages\Admin.tsx

```
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Shield,
  BookOpen,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Problem {
  id: string;
  title: string;
  statement: string;
  difficulty: string;
  tags: string[];
  input_format: string;
  output_format: string;
  constraints: string;
  samples: { input: string; output: string; explanation?: string }[];
  testcases: { input: string; output: string }[];
  time_limit: number;
}

interface Profile {
  id: string;
  user_id: string;
  name: string;
  xp: number;
  level: number;
}

const emptyProblem: Omit<Problem, "id"> = {
  title: "",
  statement: "",
  difficulty: "Easy",
  tags: [],
  input_format: "",
  output_format: "",
  constraints: "",
  samples: [{ input: "", output: "", explanation: "" }],
  testcases: [{ input: "", output: "" }],
  time_limit: 2,
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  
  const [problems, setProblems] = useState<Problem[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [formData, setFormData] = useState<Omit<Problem, "id">>(emptyProblem);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch problems
    const { data: problemsData } = await supabase
      .from("problems")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (problemsData) {
      setProblems(problemsData as unknown as Problem[]);
    }
    
    // Fetch users
    const { data: usersData } = await supabase
      .from("profiles")
      .select("*")
      .order("xp", { ascending: false });
    
    if (usersData) {
      setUsers(usersData as Profile[]);
    }
    
    setIsLoading(false);
  };

  const handleOpenDialog = (problem?: Problem) => {
    if (problem) {
      setEditingProblem(problem);
      setFormData({
        title: problem.title,
        statement: problem.statement,
        difficulty: problem.difficulty,
        tags: problem.tags,
        input_format: problem.input_format || "",
        output_format: problem.output_format || "",
        constraints: problem.constraints || "",
        samples: problem.samples || [{ input: "", output: "", explanation: "" }],
        testcases: problem.testcases || [{ input: "", output: "" }],
        time_limit: problem.time_limit,
      });
      setTagsInput(problem.tags.join(", "));
    } else {
      setEditingProblem(null);
      setFormData(emptyProblem);
      setTagsInput("");
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.statement) {
      toast.error("Title and statement are required");
      return;
    }
    
    setIsSaving(true);
    
    const problemData = {
      ...formData,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    };
    
    if (editingProblem) {
      const { error } = await supabase
        .from("problems")
        .update(problemData)
        .eq("id", editingProblem.id);
      
      if (error) {
        toast.error("Failed to update problem");
      } else {
        toast.success("Problem updated successfully");
        setIsDialogOpen(false);
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("problems")
        .insert(problemData);
      
      if (error) {
        toast.error("Failed to create problem");
      } else {
        toast.success("Problem created successfully");
        setIsDialogOpen(false);
        fetchData();
      }
    }
    
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this problem?")) return;
    
    const { error } = await supabase
      .from("problems")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete problem");
    } else {
      toast.success("Problem deleted successfully");
      fetchData();
    }
  };

  const addSample = () => {
    setFormData({
      ...formData,
      samples: [...formData.samples, { input: "", output: "", explanation: "" }],
    });
  };

  const addTestcase = () => {
    setFormData({
      ...formData,
      testcases: [...formData.testcases, { input: "", output: "" }],
    });
  };

  const updateSample = (index: number, field: string, value: string) => {
    const newSamples = [...formData.samples];
    newSamples[index] = { ...newSamples[index], [field]: value };
    setFormData({ ...formData, samples: newSamples });
  };

  const updateTestcase = (index: number, field: string, value: string) => {
    const newTestcases = [...formData.testcases];
    newTestcases[index] = { ...newTestcases[index], [field]: value };
    setFormData({ ...formData, testcases: newTestcases });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - PyChef</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <h1 className="text-3xl font-bold text-foreground">
                    Admin Panel
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Manage problems, users, and submissions
                </p>
              </div>
            </motion.div>

            <Tabs defaultValue="problems" className="space-y-6">
              <TabsList className="bg-secondary">
                <TabsTrigger value="problems" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Problems ({problems.length})
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Users ({users.length})
                </TabsTrigger>
              </TabsList>

              {/* Problems Tab */}
              <TabsContent value="problems">
                <div className="flex justify-end mb-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="hero" onClick={() => handleOpenDialog()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Problem
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProblem ? "Edit Problem" : "Create Problem"}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                              placeholder="Two Sum"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Difficulty</Label>
                            <Select
                              value={formData.difficulty}
                              onValueChange={(value) =>
                                setFormData({ ...formData, difficulty: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Tags (comma-separated)</Label>
                          <Input
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            placeholder="Array, Hash Table, Dynamic Programming"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Problem Statement</Label>
                          <Textarea
                            value={formData.statement}
                            onChange={(e) =>
                              setFormData({ ...formData, statement: e.target.value })
                            }
                            placeholder="Given an array of integers..."
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Input Format</Label>
                            <Textarea
                              value={formData.input_format}
                              onChange={(e) =>
                                setFormData({ ...formData, input_format: e.target.value })
                              }
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Output Format</Label>
                            <Textarea
                              value={formData.output_format}
                              onChange={(e) =>
                                setFormData({ ...formData, output_format: e.target.value })
                              }
                              rows={2}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Constraints</Label>
                          <Textarea
                            value={formData.constraints}
                            onChange={(e) =>
                              setFormData({ ...formData, constraints: e.target.value })
                            }
                            rows={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Sample Test Cases</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addSample}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {formData.samples.map((sample, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 p-3 bg-secondary rounded-lg">
                              <div>
                                <Label className="text-xs">Input</Label>
                                <Textarea
                                  value={sample.input}
                                  onChange={(e) => updateSample(index, "input", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Output</Label>
                                <Textarea
                                  value={sample.output}
                                  onChange={(e) => updateSample(index, "output", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Explanation</Label>
                                <Textarea
                                  value={sample.explanation || ""}
                                  onChange={(e) => updateSample(index, "explanation", e.target.value)}
                                  rows={2}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Hidden Test Cases</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addTestcase}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {formData.testcases.map((testcase, index) => (
                            <div key={index} className="grid grid-cols-2 gap-2 p-3 bg-secondary rounded-lg">
                              <div>
                                <Label className="text-xs">Input</Label>
                                <Textarea
                                  value={testcase.input}
                                  onChange={(e) => updateTestcase(index, "input", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Expected Output</Label>
                                <Textarea
                                  value={testcase.output}
                                  onChange={(e) => updateTestcase(index, "output", e.target.value)}
                                  rows={2}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            variant="hero"
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Save className="h-4 w-4 mr-2" />
                            )}
                            Save Problem
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Difficulty</div>
                    <div className="col-span-3">Tags</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {problems.map((problem) => (
                    <div
                      key={problem.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 items-center"
                    >
                      <div className="col-span-5 font-medium text-foreground">
                        {problem.title}
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`text-sm font-medium ${
                            problem.difficulty === "Easy"
                              ? "difficulty-easy"
                              : problem.difficulty === "Medium"
                              ? "difficulty-medium"
                              : "difficulty-hard"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="col-span-3 text-sm text-muted-foreground">
                        {problem.tags.slice(0, 2).join(", ")}
                      </div>
                      <div className="col-span-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(problem)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(problem.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <div className="rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-2">XP</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-4">User ID</div>
                  </div>
                  {users.map((profile) => (
                    <div
                      key={profile.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 items-center"
                    >
                      <div className="col-span-4 font-medium text-foreground">
                        {profile.name}
                      </div>
                      <div className="col-span-2 text-primary font-semibold">
                        {profile.xp.toLocaleString()}
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        {profile.level}
                      </div>
                      <div className="col-span-4 text-xs text-muted-foreground font-mono">
                        {profile.user_id}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;

```

## File: src\pages\Auth.tsx

```
import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Code2, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";

const authSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp, isLoading: authLoading } = useAuth();
  
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        authSchema.pick({ email: true, password: true }).parse(formData);
      } else {
        authSchema.parse({ ...formData, name: formData.name });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Welcome back!");
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Try logging in.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Account created! Welcome to PyChef!");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Log In" : "Sign Up"} - PyChef</title>
        <meta
          name="description"
          content={
            isLogin
              ? "Log in to your PyChef account to continue practicing Python."
              : "Create a PyChef account to start your coding journey."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            {/* Header */}
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-button">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">PyChef</span>
              </Link>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isLogin ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Start your journey to Python mastery"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10 h-12 bg-secondary border-border"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 h-12 bg-secondary border-border"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 pr-10 h-12 bg-secondary border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : null}
                {isLogin ? "Log In" : "Create Account"}
              </Button>
            </form>

            {/* Switch Mode */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-primary hover:underline font-semibold"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </motion.div>
        </div>

        {/* Right Side - Decorative */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 p-8"
          >
            <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden max-w-md">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-warning/70" />
                  <div className="w-3 h-3 rounded-full bg-success/70" />
                </div>
                <span className="ml-4 text-sm text-muted-foreground font-mono">
                  welcome.py
                </span>
              </div>
              <div className="p-6 font-mono text-sm">
                <pre className="text-muted-foreground">
                  <code>
                    <span className="text-primary">class</span>{" "}
                    <span className="text-accent">Developer</span>:{"\n"}
                    {"    "}
                    <span className="text-primary">def</span> __init__(self):
                    {"\n"}
                    {"        "}self.skills = []{"\n"}
                    {"        "}self.xp = 0{"\n\n"}
                    {"    "}
                    <span className="text-primary">def</span> practice(self):
                    {"\n"}
                    {"        "}self.skills.append(
                    <span className="text-warning">"Python"</span>){"\n"}
                    {"        "}self.xp += 50{"\n"}
                    {"        "}
                    <span className="text-primary">return</span>{" "}
                    <span className="text-warning">"🚀 Level Up!"</span>
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Auth;

```

## File: src\pages\Dashboard.tsx

```
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Trophy,
  Target,
  Flame,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DailyChallengeCard from "@/components/challenges/DailyChallengeCard";

interface RecentProblem {
  id: string;
  title: string;
  difficulty: string;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading } = useAuth();
  const [recentProblems, setRecentProblems] = useState<RecentProblem[]>([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchRecentActivity();
    }
  }, [user]);

  const fetchRecentActivity = async () => {
    if (!user) return;

    const { data: submissions } = await supabase
      .from("submissions")
      .select("problem_id, status, problems(id, title, difficulty)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (submissions) {
      const uniqueProblems = new Map<string, RecentProblem>();
      submissions.forEach((sub: any) => {
        if (sub.problems && !uniqueProblems.has(sub.problem_id)) {
          uniqueProblems.set(sub.problem_id, {
            id: sub.problems.id,
            title: sub.problems.title,
            difficulty: sub.problems.difficulty,
            status: sub.status === "Accepted" ? "solved" : "attempted",
          });
        }
      });
      setRecentProblems(Array.from(uniqueProblems.values()).slice(0, 3));
    }

    const { data: solvedData } = await supabase
      .from("submissions")
      .select("problem_id")
      .eq("user_id", user.id)
      .eq("status", "Accepted");

    if (solvedData) {
      const uniqueSolved = new Set(solvedData.map((s) => s.problem_id));
      setSolvedCount(uniqueSolved.size);
    }

    setIsLoading(false);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const xpToNextLevel = (profile.level + 1) * 300;
  const xpProgress = (profile.xp / xpToNextLevel) * 100;

  return (
    <>
      <Helmet>
        <title>Dashboard - PyChef</title>
        <meta
          name="description"
          content="Track your coding progress, XP, and streaks on PyChef."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-20 sm:pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Welcome back, {profile.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Keep up the great work! You've solved {solvedCount} problems.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 mb-6 sm:mb-8">
              {[
                {
                  icon: Zap,
                  label: "Total XP",
                  value: profile.xp.toLocaleString(),
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  icon: Trophy,
                  label: "Level",
                  value: profile.level,
                  color: "text-warning",
                  bg: "bg-warning/10",
                },
                {
                  icon: Flame,
                  label: "Streak",
                  value: profile.streak,
                  color: "text-destructive",
                  bg: "bg-destructive/10",
                },
                {
                  icon: Target,
                  label: "Solved",
                  value: solvedCount,
                  color: "text-accent",
                  bg: "bg-accent/10",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl ${stat.bg}`}
                    >
                      <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              {/* Level Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">
                    Level Progress
                  </h2>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {profile.xp} / {xpToNextLevel} XP
                  </span>
                </div>

                <div className="relative h-3 sm:h-4 rounded-full bg-secondary overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(xpProgress, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-primary text-xs sm:text-sm font-bold text-primary-foreground">
                      {profile.level}
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Current Level
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Next Level
                    </span>
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-secondary border border-border text-xs sm:text-sm font-bold text-foreground">
                      {profile.level + 1}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Daily Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <DailyChallengeCard />
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border"
            >
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <Link to="/problems">
                  <Button variant="outline" className="w-full justify-start h-10 sm:h-11 text-sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice Problems
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="outline" className="w-full justify-start h-10 sm:h-11 text-sm">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
                <Link to="/submissions">
                  <Button variant="outline" className="w-full justify-start h-10 sm:h-11 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    My Submissions
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-foreground">
                  Recent Problems
                </h2>
                <Link
                  to="/problems"
                  className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>

              {recentProblems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    No recent activity. Start solving problems!
                  </p>
                  <Link to="/problems">
                    <Button variant="hero" size="sm">Browse Problems</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {recentProblems.map((problem) => (
                    <Link
                      key={problem.id}
                      to={`/problems/${problem.id}`}
                      className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <CheckCircle2
                          className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${
                            problem.status === "solved"
                              ? "text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-medium text-foreground text-sm truncate">
                          {problem.title}
                        </span>
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-medium shrink-0 ml-2 ${
                          problem.difficulty === "Easy"
                            ? "difficulty-easy"
                            : problem.difficulty === "Medium"
                            ? "difficulty-medium"
                            : "difficulty-hard"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;

```

## File: src\pages\Index.tsx

```
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>PyChef - Master Python Through Competitive Coding</title>
        <meta
          name="description"
          content="Practice Python algorithms, compete on leaderboards, and level up your coding skills. The ultimate competitive programming platform for Python developers."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

```

## File: src\pages\Install.tsx

```
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Download, Smartphone, CheckCircle, Share, Plus, Menu, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  const features = [
    {
      icon: Smartphone,
      title: "Works Offline",
      description: "Access problems and practice coding even without internet",
    },
    {
      icon: Download,
      title: "Fast & Lightweight",
      description: "Installs quickly and uses minimal storage space",
    },
    {
      icon: CheckCircle,
      title: "Native Experience",
      description: "Feels just like a real app on your home screen",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Install PyChef - Get the App</title>
        <meta name="description" content="Install PyChef on your device for the best coding experience" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-6">
                <Smartphone className="h-12 w-12 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Install PyChef
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Get the full app experience. Install PyChef on your device for quick access and offline practice.
              </p>
            </motion.div>

            {isInstalled ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex p-4 rounded-full bg-green-500/20 mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Already Installed!
                </h2>
                <p className="text-muted-foreground">
                  PyChef is installed on your device. Look for it on your home screen.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Features */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full text-center">
                        <CardHeader>
                          <div className="mx-auto p-3 rounded-lg bg-primary/20 w-fit">
                            <feature.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Install Instructions */}
                {deferredPrompt ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <Button size="lg" onClick={handleInstall} className="gap-2">
                      <Download className="h-5 w-5" />
                      Install PyChef
                    </Button>
                  </motion.div>
                ) : isIOS ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share className="h-5 w-5" />
                        How to Install on iPhone/iPad
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Tap the Share button</p>
                          <p className="text-sm text-muted-foreground">
                            Look for the share icon <Share className="inline h-4 w-4" /> at the bottom of your browser
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Select "Add to Home Screen"</p>
                          <p className="text-sm text-muted-foreground">
                            Scroll down in the share menu and tap <Plus className="inline h-4 w-4" /> Add to Home Screen
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Tap "Add"</p>
                          <p className="text-sm text-muted-foreground">
                            Confirm by tapping Add in the top right corner
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Menu className="h-5 w-5" />
                        How to Install on Android
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Open browser menu</p>
                          <p className="text-sm text-muted-foreground">
                            Tap the three dots <Menu className="inline h-4 w-4" /> in the top right corner
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Select "Install app" or "Add to Home screen"</p>
                          <p className="text-sm text-muted-foreground">
                            Look for the install option in the menu
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Confirm installation</p>
                          <p className="text-sm text-muted-foreground">
                            Tap "Install" to add PyChef to your home screen
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Install;

```

## File: src\pages\Leaderboard.tsx

```
import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Medal, Loader2, Trophy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import PullToRefreshIndicator from "@/components/mobile/PullToRefreshIndicator";

interface LeaderboardUser {
  user_id: string;
  name: string;
  xp: number;
  level: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from("profiles")
      .select("user_id, name, xp, level")
      .order("xp", { ascending: false })
      .limit(50);

    if (data) {
      setUsers(data);
    }
    setIsLoading(false);
  }, []);

  const { containerRef, pullDistance, isRefreshing, handlers } = usePullToRefresh({
    onRefresh: fetchLeaderboard,
  });

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <>
      <Helmet>
        <title>Leaderboard - PyChef</title>
        <meta name="description" content="See top Python coders on PyChef leaderboard." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main 
          ref={containerRef}
          className="pt-20 sm:pt-24 pb-16 relative overflow-auto"
          {...handlers}
        >
          <PullToRefreshIndicator pullDistance={pullDistance} isRefreshing={isRefreshing} />
          
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Top performers ranked by XP</p>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-secondary/50 border-b border-border text-xs sm:text-sm font-medium text-muted-foreground">
                  <div className="col-span-2 sm:col-span-1">Rank</div>
                  <div className="col-span-6 sm:col-span-7">User</div>
                  <div className="col-span-2">XP</div>
                  <div className="col-span-2">Level</div>
                </div>

                {/* Mobile Header */}
                <div className="sm:hidden px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    <span>Top Performers</span>
                  </div>
                </div>

                {users.map((user, index) => (
                  <motion.div
                    key={user.user_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/30"
                  >
                    {/* Desktop View */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 items-center">
                      <div className="col-span-2 sm:col-span-1">
                        {index < 3 ? (
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                              index === 0
                                ? "bg-warning/20 text-warning"
                                : index === 1
                                ? "bg-muted-foreground/20 text-muted-foreground"
                                : "bg-orange-500/20 text-orange-500"
                            }`}
                          >
                            <Medal className="h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div className="col-span-6 sm:col-span-7 font-medium text-foreground text-sm truncate">{user.name}</div>
                      <div className="col-span-2 text-primary font-semibold text-sm">{user.xp.toLocaleString()}</div>
                      <div className="col-span-2 text-muted-foreground text-sm">{user.level}</div>
                    </div>

                    {/* Mobile View */}
                    <div className="sm:hidden px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          {index < 3 ? (
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index === 0
                                  ? "bg-warning/20 text-warning"
                                  : index === 1
                                  ? "bg-muted-foreground/20 text-muted-foreground"
                                  : "bg-orange-500/20 text-orange-500"
                              }`}
                            >
                              <Medal className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <span className="text-muted-foreground text-sm font-medium">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{user.name}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-primary font-semibold">{user.xp.toLocaleString()} XP</span>
                            <span className="text-xs text-muted-foreground">Level {user.level}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {users.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-muted-foreground">No users yet. Be the first!</p>
                  </div>
                )}
              </div>
            )}

            {/* Pull to refresh hint on mobile */}
            <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">
              Pull down to refresh
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Leaderboard;

```

## File: src\pages\NotFound.tsx

```
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

```

## File: src\pages\ProblemDetail.tsx

```
import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Editor, { OnMount } from "@monaco-editor/react";
import { editor, MarkerSeverity } from "monaco-editor";
import {
  ArrowLeft,
  Play,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import FloatingActionButtons from "@/components/mobile/FloatingActionButtons";
import MobileViewToggle from "@/components/mobile/MobileViewToggle";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import HintsPanel from "@/components/editor/HintsPanel";
import EditorToolbar from "@/components/editor/EditorToolbar";
import AchievementsPanel from "@/components/achievements/AchievementsPanel";
import DifficultyVoting from "@/components/social/DifficultyVoting";
import Comments from "@/components/social/Comments";
import { useSettings } from "@/contexts/SettingsContext";
import { useEditorSettings, EditorSettings } from "@/hooks/useEditorSettings";
import { useAchievements } from "@/hooks/useAchievements";

interface Sample {
  input: string;
  output: string;
  explanation?: string;
}

interface Problem {
  id: string;
  title: string;
  statement: string;
  difficulty: string;
  tags: string[];
  input_format: string;
  output_format: string;
  constraints: string;
  samples: Sample[];
  time_limit: number;
}

interface Submission {
  id: string;
  status: string;
  created_at: string;
  execution_time: number;
}

interface ExecutionStep {
  step: string;
  status: "pending" | "running" | "done" | "error";
  message?: string;
}

const defaultCode = `# Write your Python solution here

def solve():
    # Read input
    line = input()
    
    # Your solution
    
    # Print output
    print(line)

solve()
`;

// Common Python error patterns for highlighting
const pythonErrorPatterns = [
  { regex: /\bprint\s+[^(]/, message: "Missing parentheses in print. Use print()" },
  { regex: /\bindent(?:ation)?error/i, message: "Indentation error detected" },
  { regex: /=\s*=/, message: "Use '==' for comparison, not '= ='" },
  { regex: /def\s+\w+[^(]/, message: "Function definition missing parentheses" },
  { regex: /\bif\s+[^:]+[^:]$/, message: "Missing colon after if statement" },
  { regex: /\bfor\s+[^:]+[^:]$/, message: "Missing colon after for statement" },
  { regex: /\bwhile\s+[^:]+[^:]$/, message: "Missing colon after while statement" },
  { regex: /\belif\s+[^:]+[^:]$/, message: "Missing colon after elif statement" },
  { regex: /\belse[^:]$/, message: "Missing colon after else" },
  { regex: /\bimport\s+os\b/, message: "Warning: 'os' module may be blocked" },
  { regex: /\bimport\s+subprocess\b/, message: "Warning: 'subprocess' module is blocked" },
  { regex: /\bopen\s*\(/, message: "Warning: File operations may be blocked" },
];

const getStorageKey = (problemId: string) => `pychef_code_${problemId}`;

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const { settings } = useSettings();
  const { settings: editorSettings, updateSettings: updateEditorSettings } = useEditorSettings();
  const { checkSubmissionAchievements } = useAchievements();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<{ editor: typeof editor; MarkerSeverity: typeof MarkerSeverity } | null>(null);
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [code, setCode] = useState(defaultCode);
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"success" | "error" | "info" | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileView, setMobileView] = useState<"description" | "editor" | "output">("description");

  // Handler for settings changes from the panel
  const handleSettingsChange = (newSettings: EditorSettings) => {
    updateEditorSettings(newSettings);
  };

  // Handle loading code from history
  const handleLoadCode = (historyCode: string) => {
    setCode(historyCode);
    if (id) {
      localStorage.setItem(getStorageKey(id), historyCode);
      setLastSaved(new Date());
    }
  };

  // Swipe gesture for mobile view toggle
  const swipeHandlers = useSwipeGesture({
    threshold: 75,
    onSwipeLeft: () => setMobileView("editor"),
    onSwipeRight: () => setMobileView("description"),
  });

  // Monaco can render blank if it was mounted while hidden (common on mobile view toggles).
  // Force a layout pass whenever the editor becomes visible.
  useEffect(() => {
    if (mobileView !== "editor") return;

    const raf1 = requestAnimationFrame(() => editorRef.current?.layout());
    const t1 = window.setTimeout(() => editorRef.current?.layout(), 60);

    return () => {
      cancelAnimationFrame(raf1);
      window.clearTimeout(t1);
    };
  }, [mobileView, isFullscreen]);

  // Load saved code from localStorage
  useEffect(() => {
    if (id) {
      const savedCode = localStorage.getItem(getStorageKey(id));
      if (savedCode) {
        setCode(savedCode);
        setLastSaved(new Date());
      }
    }
  }, [id]);

  // Auto-save code to localStorage with debounce
  useEffect(() => {
    if (!id) return;

    const timeoutId = window.setTimeout(() => {
      if (code && code !== defaultCode) {
        localStorage.setItem(getStorageKey(id), code);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [code, id]);

  // Check for Python errors and add markers
  const checkPythonErrors = useCallback((codeText: string) => {
    if (!monacoRef.current || !editorRef.current) return;
    
    const model = editorRef.current.getModel();
    if (!model) return;

    const markers: editor.IMarkerData[] = [];
    const lines = codeText.split("\n");

    lines.forEach((line, index) => {
      pythonErrorPatterns.forEach((pattern) => {
        if (pattern.regex.test(line)) {
          markers.push({
            severity: pattern.message.startsWith("Warning") 
              ? monacoRef.current!.MarkerSeverity.Warning 
              : monacoRef.current!.MarkerSeverity.Error,
            startLineNumber: index + 1,
            startColumn: 1,
            endLineNumber: index + 1,
            endColumn: line.length + 1,
            message: pattern.message,
          });
        }
      });
    });

    monacoRef.current.editor.setModelMarkers(model, "python-checker", markers);
  }, []);

  const handleEditorMount: OnMount = (editorInstance, monaco) => {
    editorRef.current = editorInstance;
    monacoRef.current = { editor: monaco.editor, MarkerSeverity: monaco.MarkerSeverity };
    checkPythonErrors(code);

    // Add keyboard shortcuts
    editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });
    editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      handleSubmit();
    });
  };

  const handleResetCode = () => {
    if (id) {
      localStorage.removeItem(getStorageKey(id));
      setCode(defaultCode);
      setLastSaved(null);
      setValidationError(null);
      toast.success("Code reset to default template");
    }
  };

  // Simple Python code formatter
  const formatPythonCode = () => {
    const lines = code.split("\n");
    const formattedLines: string[] = [];
    let indentLevel = 0;
    const indentSize = 4;

    for (let line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine === "") {
        formattedLines.push("");
        continue;
      }

      if (/^(elif|else|except|finally)\b/.test(trimmedLine)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indent = " ".repeat(indentLevel * indentSize);
      let formattedLine = indent + trimmedLine;

      formattedLine = formattedLine
        .replace(/\s*=\s*/g, " = ")
        .replace(/\s*==\s*/g, " == ")
        .replace(/\s*!=\s*/g, " != ")
        .replace(/\s*<=\s*/g, " <= ")
        .replace(/\s*>=\s*/g, " >= ")
        .replace(/\s*\+=\s*/g, " += ")
        .replace(/\s*-=\s*/g, " -= ")
        .replace(/,\s*/g, ", ")
        .replace(/\s+,/g, ",");

      const leadingSpaces = formattedLine.match(/^\s*/)?.[0] || "";
      const restOfLine = formattedLine.slice(leadingSpaces.length);
      formattedLine = leadingSpaces + restOfLine.replace(/  +/g, " ");

      formattedLines.push(formattedLine);

      if (trimmedLine.endsWith(":")) {
        indentLevel++;
      }
    }

    const formatted = formattedLines.join("\n");
    setCode(formatted);
    toast.success("Code formatted");
  };

  useEffect(() => {
    if (id) {
      fetchProblem();
    }
  }, [id]);

  useEffect(() => {
    if (id && user) {
      fetchSubmissions();
    }
  }, [id, user]);

  const fetchProblem = async () => {
    const { data, error } = await supabase
      .from("problems")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Problem not found");
      navigate("/problems");
      return;
    }

    const samplesData = Array.isArray(data.samples) ? data.samples : [];
    const problemData: Problem = {
      id: data.id,
      title: data.title,
      statement: data.statement,
      difficulty: data.difficulty,
      tags: data.tags || [],
      input_format: data.input_format || "",
      output_format: data.output_format || "",
      constraints: data.constraints || "",
      samples: samplesData as unknown as Sample[],
      time_limit: data.time_limit,
    };

    setProblem(problemData);
    setIsLoading(false);
  };

  const fetchSubmissions = async () => {
    if (!user || !id) return;

    const { data } = await supabase
      .from("submissions")
      .select("id, status, created_at, execution_time")
      .eq("user_id", user.id)
      .eq("problem_id", id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (data) {
      setSubmissions(data);
    }
  };

  const validateCode = (): boolean => {
    setValidationError(null);
    
    const trimmedCode = code.trim();
    
    if (!trimmedCode) {
      setValidationError("Code cannot be empty");
      toast.error("Please write some code before running");
      return false;
    }
    
    if (trimmedCode === defaultCode.trim()) {
      setValidationError("Please modify the default template");
      toast.error("Please write your solution before running");
      return false;
    }
    
    if (trimmedCode.length < 10) {
      setValidationError("Code is too short");
      toast.error("Code seems incomplete");
      return false;
    }
    
    return true;
  };

  const updateStep = (stepIndex: number, status: ExecutionStep["status"], message?: string) => {
    setExecutionSteps(prev => prev.map((step, i) => 
      i === stepIndex ? { ...step, status, message } : step
    ));
  };

  const handleRun = async () => {
    if (!user) {
      toast.error("Please log in to run code");
      navigate("/auth");
      return;
    }

    if (!validateCode()) return;

    setIsRunning(true);
    setOutput(null);
    setVerdict(null);
    // Auto-switch to output view on mobile when running
    if (window.innerWidth < 768) {
      setMobileView("output");
    }
    setExecutionSteps([
      { step: "Parsing code", status: "running" },
      { step: "Validating syntax", status: "pending" },
      { step: "Running with sample input", status: "pending" },
      { step: "Generating output", status: "pending" },
    ]);

    try {
      await new Promise(r => setTimeout(r, 300));
      updateStep(0, "done");
      updateStep(1, "running");
      
      await new Promise(r => setTimeout(r, 300));
      updateStep(1, "done");
      updateStep(2, "running");

      const { data, error } = await supabase.functions.invoke("python-judge", {
        body: {
          problem_id: id,
          code,
          user_id: user.id,
          run_only: true,
        },
      });

      if (error) throw error;

      updateStep(2, "done");
      updateStep(3, "running");
      await new Promise(r => setTimeout(r, 200));
      updateStep(3, "done");

      setOutput(data.output);
      setVerdict(data.status === "Executed" ? "info" : "error");
    } catch (error) {
      console.error("Run error:", error);
      setExecutionSteps(prev => prev.map(step => 
        step.status === "running" ? { ...step, status: "error" } : step
      ));
      setOutput("Failed to execute code. Please try again.");
      setVerdict("error");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to submit");
      navigate("/auth");
      return;
    }

    if (!validateCode()) return;

    setIsSubmitting(true);
    setOutput(null);
    setVerdict(null);
    // Auto-switch to output view on mobile when submitting
    if (window.innerWidth < 768) {
      setMobileView("output");
    }
    setExecutionSteps([
      { step: "Parsing code", status: "running" },
      { step: "Validating syntax", status: "pending" },
      { step: "Running test cases", status: "pending" },
      { step: "Comparing outputs", status: "pending" },
      { step: "Recording submission", status: "pending" },
    ]);

    try {
      await new Promise(r => setTimeout(r, 300));
      updateStep(0, "done");
      updateStep(1, "running");
      
      await new Promise(r => setTimeout(r, 300));
      updateStep(1, "done");
      updateStep(2, "running");

      const { data, error } = await supabase.functions.invoke("python-judge", {
        body: {
          problem_id: id,
          code,
          user_id: user.id,
          run_only: false,
        },
      });

      if (error) throw error;

      updateStep(2, "done");
      updateStep(3, "running");
      await new Promise(r => setTimeout(r, 200));
      updateStep(3, "done");
      updateStep(4, "running");
      await new Promise(r => setTimeout(r, 200));
      updateStep(4, "done");

      setOutput(data.output);
      setVerdict(data.status === "Accepted" ? "success" : "error");

      if (data.status === "Accepted") {
        toast.success("🎉 Accepted! +50 XP");
        refreshProfile();
        // Check for achievements
        if (user) {
          checkSubmissionAchievements(user.id, true, new Date());
        }
      } else {
        toast.error(data.status);
        // Check for first submission achievement even if not accepted
        if (user) {
          checkSubmissionAchievements(user.id, false, new Date());
        }
      }

      fetchSubmissions();
    } catch (error) {
      console.error("Submit error:", error);
      setExecutionSteps(prev => prev.map(step => 
        step.status === "running" ? { ...step, status: "error" } : step
      ));
      setOutput("Failed to submit code. Please try again.");
      setVerdict("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{problem.title} - PyChef</title>
        <meta
          name="description"
          content={`Solve the ${problem.title} problem on PyChef. ${problem.difficulty} difficulty.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="h-12 sm:h-14 border-b border-border bg-card flex items-center px-2 sm:px-4 gap-2 sm:gap-4">
          <Link
            to="/problems"
            className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          <div className="h-6 w-px bg-border hidden sm:block" />

          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <h1 className="font-semibold text-foreground truncate text-sm sm:text-base">
              {problem.title}
            </h1>
            <Badge
              variant="secondary"
              className={`text-xs shrink-0 ${
                problem.difficulty === "Easy"
                  ? "bg-difficulty-easy/20 text-difficulty-easy"
                  : problem.difficulty === "Medium"
                  ? "bg-difficulty-medium/20 text-difficulty-medium"
                  : "bg-difficulty-hard/20 text-difficulty-hard"
              }`}
            >
              {problem.difficulty}
            </Badge>
          </div>

          {/* Desktop Run/Submit buttons and features */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            <AchievementsPanel />
            {id && <HintsPanel problemId={id} />}
            {id && <Comments problemId={id} />}
            {problem && <DifficultyVoting problemId={id!} currentDifficulty={problem.difficulty} />}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
              className="px-2 sm:px-3"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
              ) : (
                <Play className="h-4 w-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">Run</span>
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="px-2 sm:px-3"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
              ) : (
                <Send className="h-4 w-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">Submit</span>
            </Button>
          </div>
        </header>

        {/* Mobile View Toggle */}
        <MobileViewToggle activeView={mobileView} onViewChange={setMobileView} hasOutput={!!output} />

        {/* Main Content */}
        <div 
          className="flex-1 flex flex-col md:flex-row overflow-hidden"
          {...swipeHandlers}
        >
          {/* Problem Description - Desktop always visible, Mobile conditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              isDescriptionExpanded ? "md:w-1/2" : "md:w-12"
            } border-r border-border bg-card overflow-hidden transition-all duration-300 flex-col ${
              mobileView === "description" ? "flex" : "hidden md:flex"
            } ${mobileView === "description" ? "flex-1" : ""}`}
          >
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="hidden md:flex items-center justify-center h-10 border-b border-border hover:bg-secondary transition-colors"
            >
              {isDescriptionExpanded ? (
                <ChevronDown className="h-4 w-4 rotate-90" />
              ) : (
                <ChevronUp className="h-4 w-4 rotate-90" />
              )}
            </button>

            {isDescriptionExpanded && (
              <div className="flex-1 overflow-y-auto pb-24 md:pb-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="description"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="submissions"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
                    >
                      Submissions ({submissions.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="p-4 sm:p-6 m-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="mb-6">
                        <p className="text-foreground whitespace-pre-line text-sm sm:text-base">
                          {problem.statement}
                        </p>
                      </div>

                      {problem.input_format && (
                        <div className="mb-6">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Input Format
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm whitespace-pre-line">
                            {problem.input_format}
                          </p>
                        </div>
                      )}

                      {problem.output_format && (
                        <div className="mb-6">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Output Format
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm">
                            {problem.output_format}
                          </p>
                        </div>
                      )}

                      {problem.constraints && (
                        <div className="mb-6">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Constraints
                          </h3>
                          <pre className="text-xs sm:text-sm text-muted-foreground bg-secondary p-3 sm:p-4 rounded-lg whitespace-pre-line overflow-x-auto">
                            {problem.constraints}
                          </pre>
                        </div>
                      )}

                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                          Examples
                        </h3>
                        {problem.samples.map((sample, index) => (
                          <div
                            key={index}
                            className="mb-4 rounded-lg border border-border overflow-hidden"
                          >
                            <div className="bg-secondary/50 px-3 sm:px-4 py-2 border-b border-border">
                              <span className="text-xs sm:text-sm font-medium text-foreground">
                                Example {index + 1}
                              </span>
                            </div>
                            <div className="p-3 sm:p-4 space-y-3">
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Input
                                </span>
                                <pre className="mt-1 p-2 sm:p-3 bg-secondary rounded text-xs sm:text-sm font-mono text-foreground overflow-x-auto">
                                  {sample.input}
                                </pre>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  Output
                                </span>
                                <pre className="mt-1 p-2 sm:p-3 bg-secondary rounded text-xs sm:text-sm font-mono text-foreground overflow-x-auto">
                                  {sample.output}
                                </pre>
                              </div>
                              {sample.explanation && (
                                <div>
                                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Explanation
                                  </span>
                                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                                    {sample.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm text-muted-foreground">Tags:</span>
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="submissions" className="p-4 sm:p-6 m-0">
                    {submissions.length === 0 ? (
                      <div className="text-center py-12">
                        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          No submissions yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {submissions.map((sub) => (
                          <div
                            key={sub.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                          >
                            <div className="flex items-center gap-3">
                              {sub.status === "Accepted" ? (
                                <CheckCircle2 className="h-5 w-5 text-accent" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <span
                                className={`font-medium text-sm ${
                                  sub.status === "Accepted"
                                    ? "text-accent"
                                    : "text-destructive"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {new Date(sub.created_at).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </motion.div>

          {/* Code Editor - Desktop always visible, Mobile conditional */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col ${
              isFullscreen 
                ? "fixed inset-0 z-50 bg-background" 
                : "md:flex-1 md:min-h-0"
            } ${mobileView === "editor" ? "flex flex-1 h-full overflow-hidden" : "hidden md:flex"}`}
          >
            <EditorToolbar
              code={code}
              problemId={id}
              editorTheme={editorSettings.editor_theme}
              isFullscreen={isFullscreen}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              lastSaved={lastSaved}
              onRun={handleRun}
              onSubmit={handleSubmit}
              onFormat={formatPythonCode}
              onReset={handleResetCode}
              onToggleTheme={() => updateEditorSettings({ editor_theme: editorSettings.editor_theme === "vs-dark" ? "light" : "vs-dark" })}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              onLoadCode={handleLoadCode}
              onSettingsChange={handleSettingsChange}
            />

            <div className="flex-1 min-h-0 pb-24 md:pb-0 relative overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme={editorSettings.editor_theme}
                value={code}
                onMount={handleEditorMount}
                onChange={(value) => {
                  const newCode = value || "";
                  setCode(newCode);
                  if (validationError) setValidationError(null);
                  checkPythonErrors(newCode);
                }}
                options={{
                  fontSize: editorSettings.font_size,
                  fontFamily: "JetBrains Mono, monospace",
                  minimap: { enabled: false },
                  padding: { top: 24 },
                  lineNumbers: editorSettings.show_line_numbers ? "on" : "off",
                  scrollBeyondLastLine: false,
                  wordWrap: editorSettings.word_wrap ? "on" : "off",
                  automaticLayout: true,
                  glyphMargin: true,
                }}
              />
            </div>

            {/* Validation Error */}
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-destructive/30 bg-destructive/10 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">{validationError}</span>
                </div>
              </motion.div>
            )}

            {/* Execution Steps */}
            {(isRunning || isSubmitting) && executionSteps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border bg-card px-4 py-3"
              >
                <div className="space-y-2">
                  {executionSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {step.status === "pending" && (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      {step.status === "running" && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      )}
                      {step.status === "done" && (
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      )}
                      {step.status === "error" && (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`text-xs sm:text-sm ${
                        step.status === "pending" ? "text-muted-foreground" :
                        step.status === "running" ? "text-foreground" :
                        step.status === "done" ? "text-accent" :
                        "text-destructive"
                      }`}>
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Output Panel - Desktop only */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`hidden md:block border-t ${
                  verdict === "success" ? "border-accent/30 bg-accent/10" :
                  verdict === "error" ? "border-destructive/30 bg-destructive/10" :
                  "border-border bg-card"
                } px-4 py-3`}
              >
                <div className="flex items-start gap-2">
                  {verdict === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  )}
                  {verdict === "error" && (
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  {verdict === "info" && (
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  )}
                  <pre className={`text-xs sm:text-sm font-mono whitespace-pre-wrap ${
                    verdict === "success" ? "text-accent" :
                    verdict === "error" ? "text-destructive" :
                    "text-foreground"
                  }`}>
                    {output}
                  </pre>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile Output View */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex-1 flex-col bg-card overflow-auto ${
              mobileView === "output" ? "flex md:hidden" : "hidden"
            }`}
          >
            <div className="h-auto min-h-10 border-b border-border bg-secondary/50 flex items-center px-4 py-2">
              <span className="text-sm font-medium text-foreground">Output</span>
            </div>
            <div className="flex-1 p-4">
              {/* Execution Steps on Mobile */}
              {(isRunning || isSubmitting) && executionSteps.length > 0 && (
                <div className="space-y-2 mb-4">
                  {executionSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {step.status === "pending" && (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      {step.status === "running" && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      )}
                      {step.status === "done" && (
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      )}
                      {step.status === "error" && (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`text-sm ${
                        step.status === "pending" ? "text-muted-foreground" :
                        step.status === "running" ? "text-foreground" :
                        step.status === "done" ? "text-accent" :
                        "text-destructive"
                      }`}>
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Output Content */}
              {output ? (
                <div className={`rounded-lg p-4 ${
                  verdict === "success" ? "bg-accent/10 border border-accent/30" :
                  verdict === "error" ? "bg-destructive/10 border border-destructive/30" :
                  "bg-secondary border border-border"
                }`}>
                  <div className="flex items-start gap-3">
                    {verdict === "success" && (
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                    )}
                    {verdict === "error" && (
                      <XCircle className="h-6 w-6 text-destructive shrink-0" />
                    )}
                    {verdict === "info" && (
                      <AlertCircle className="h-6 w-6 text-primary shrink-0" />
                    )}
                    <pre className={`text-sm font-mono whitespace-pre-wrap flex-1 ${
                      verdict === "success" ? "text-accent" :
                      verdict === "error" ? "text-destructive" :
                      "text-foreground"
                    }`}>
                      {output}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <Terminal className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No output yet</p>
                  <p className="text-sm mt-1">Run your code to see the output here</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mobile Floating Action Buttons */}
        <FloatingActionButtons
          onRun={handleRun}
          onSubmit={handleSubmit}
          isRunning={isRunning}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
};

export default ProblemDetail;

```

## File: src\pages\Problems.tsx

```
import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, CheckCircle2, Circle, Clock, Loader2, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import PullToRefreshIndicator from "@/components/mobile/PullToRefreshIndicator";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
}

interface Submission {
  problem_id: string;
  status: string;
}

const Problems = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchProblems = useCallback(async () => {
    const { data, error } = await supabase
      .from("problems")
      .select("id, title, difficulty, tags")
      .order("difficulty", { ascending: true });

    if (data) {
      setProblems(data);
    }
    setIsLoading(false);
  }, []);

  const fetchUserSubmissions = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("submissions")
      .select("problem_id, status")
      .eq("user_id", user.id);

    if (data) {
      const submissionMap = new Map<string, string>();
      data.forEach((sub: Submission) => {
        const existing = submissionMap.get(sub.problem_id);
        if (!existing || sub.status === "Accepted") {
          submissionMap.set(sub.problem_id, sub.status);
        }
      });
      setUserSubmissions(submissionMap);
    }
  }, [user]);

  const handleRefresh = useCallback(async () => {
    await Promise.all([fetchProblems(), fetchUserSubmissions()]);
  }, [fetchProblems, fetchUserSubmissions]);

  const { containerRef, pullDistance, isRefreshing, handlers } = usePullToRefresh({
    onRefresh: handleRefresh,
  });

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  useEffect(() => {
    if (user) {
      fetchUserSubmissions();
    }
  }, [user, fetchUserSubmissions]);

  const getSubmissionStatus = (problemId: string) => {
    const status = userSubmissions.get(problemId);
    if (!status) return "unsolved";
    if (status === "Accepted") return "solved";
    return "attempted";
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      problem.difficulty.toLowerCase() === difficultyFilter;
    
    const status = getSubmissionStatus(problem.id);
    const matchesStatus = statusFilter === "all" || status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Problems - PyChef</title>
        <meta
          name="description"
          content="Browse and solve Python programming challenges. Filter by difficulty and track your progress."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main 
          ref={containerRef}
          className="pt-20 sm:pt-24 pb-16 relative overflow-auto"
          {...handlers}
        >
          <PullToRefreshIndicator pullDistance={pullDistance} isRefreshing={isRefreshing} />
          
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Problem Set
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Practice Python with {problems.length} carefully crafted problems
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 sm:h-12 bg-secondary border-border"
                />
              </div>

              <div className="flex gap-3">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="flex-1 h-11 sm:h-12 bg-secondary border-border">
                    <Filter className="h-4 w-4 mr-2 shrink-0" />
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="flex-1 h-11 sm:h-12 bg-secondary border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="solved">Solved</SelectItem>
                    <SelectItem value="attempted">Attempted</SelectItem>
                    <SelectItem value="unsolved">Unsolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Problems List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden"
            >
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-4">Tags</div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {/* Problems List */}
              {!isLoading && (
                <div className="divide-y divide-border">
                  {filteredProblems.map((problem, index) => {
                    const status = getSubmissionStatus(problem.id);
                    return (
                      <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          to={`/problems/${problem.id}`}
                          className="block hover:bg-secondary/50 transition-colors"
                        >
                          {/* Desktop View */}
                          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center">
                            <div className="col-span-1">
                              {status === "solved" ? (
                                <CheckCircle2 className="h-5 w-5 text-accent" />
                              ) : status === "attempted" ? (
                                <Clock className="h-5 w-5 text-warning" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>

                            <div className="col-span-5">
                              <span className="font-medium text-foreground hover:text-primary transition-colors">
                                {problem.title}
                              </span>
                            </div>

                            <div className="col-span-2">
                              <span
                                className={`text-sm font-medium ${
                                  problem.difficulty === "Easy"
                                    ? "difficulty-easy"
                                    : problem.difficulty === "Medium"
                                    ? "difficulty-medium"
                                    : "difficulty-hard"
                                }`}
                              >
                                {problem.difficulty}
                              </span>
                            </div>

                            <div className="col-span-4 flex gap-1 flex-wrap">
                              {problem.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {problem.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{problem.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Mobile View */}
                          <div className="md:hidden px-4 py-4">
                            <div className="flex items-start gap-3">
                              <div className="shrink-0 mt-0.5">
                                {status === "solved" ? (
                                  <CheckCircle2 className="h-5 w-5 text-accent" />
                                ) : status === "attempted" ? (
                                  <Clock className="h-5 w-5 text-warning" />
                                ) : (
                                  <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <span className="font-medium text-foreground text-sm truncate">
                                    {problem.title}
                                  </span>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                </div>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className={`text-xs font-medium ${
                                      problem.difficulty === "Easy"
                                        ? "difficulty-easy"
                                        : problem.difficulty === "Medium"
                                        ? "difficulty-medium"
                                        : "difficulty-hard"
                                    }`}
                                  >
                                    {problem.difficulty}
                                  </span>
                                  
                                  <span className="text-muted-foreground">•</span>
                                  
                                  <div className="flex gap-1 flex-wrap">
                                    {problem.tags.slice(0, 2).map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs py-0"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                    {problem.tags.length > 2 && (
                                      <Badge variant="secondary" className="text-xs py-0">
                                        +{problem.tags.length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {!isLoading && filteredProblems.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <p className="text-muted-foreground">
                    No problems found matching your criteria.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Pull to refresh hint on mobile */}
            <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">
              Pull down to refresh
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Problems;

```

## File: src\pages\Profile.tsx

```
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Zap, Trophy, Target, Loader2, Edit2, Save } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setNewName(profile.name);
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchSolvedCount();
    }
  }, [user]);

  const fetchSolvedCount = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("submissions")
      .select("problem_id")
      .eq("user_id", user.id)
      .eq("status", "Accepted");

    if (data) {
      const uniqueSolved = new Set(data.map((s) => s.problem_id));
      setSolvedCount(uniqueSolved.size);
    }
  };

  const handleSave = async () => {
    if (!user || !newName.trim()) return;

    setIsSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({ name: newName.trim() })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated");
      refreshProfile();
      setIsEditing(false);
    }

    setIsSaving(false);
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile - PyChef</title>
        <meta name="description" content="View your PyChef profile and stats." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button size="sm" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setNewName(profile.name);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-foreground">
                        {profile.name}
                      </h1>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Zap, label: "XP", value: profile.xp },
                  { icon: Trophy, label: "Level", value: profile.level },
                  { icon: Target, label: "Solved", value: solvedCount },
                  { icon: Target, label: "Streak", value: profile.streak },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-secondary text-center">
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Profile;

```

## File: src\pages\Settings.tsx

```
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Monitor, Type, Bell, RotateCcw, Save } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings, EditorTheme } from "@/contexts/SettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { theme, setTheme } = useTheme();

  const handleReset = () => {
    resetSettings();
    toast.success("Settings reset to defaults");
  };

  return (
    <>
      <Helmet>
        <title>Settings - PyChef</title>
        <meta name="description" content="Customize your PyChef experience" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SettingsIcon className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
                </div>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Customize the look and feel of the app</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Website Theme</Label>
                      <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                    </div>
                    <Select value={theme} onValueChange={(value: "light" | "dark") => setTheme(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Editor Theme</Label>
                      <p className="text-sm text-muted-foreground">Default theme for code editor</p>
                    </div>
                    <Select 
                      value={settings.editorTheme} 
                      onValueChange={(value: EditorTheme) => updateSettings({ editorTheme: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vs-dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Editor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Editor
                  </CardTitle>
                  <CardDescription>Configure code editor preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Font Size: {settings.fontSize}px</Label>
                    </div>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) => updateSettings({ fontSize: value })}
                      min={10}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-save</Label>
                      <p className="text-sm text-muted-foreground">Automatically save code changes</p>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => updateSettings({ autoSave: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Line Numbers</Label>
                      <p className="text-sm text-muted-foreground">Display line numbers in editor</p>
                    </div>
                    <Switch
                      checked={settings.showLineNumbers}
                      onCheckedChange={(checked) => updateSettings({ showLineNumbers: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Word Wrap</Label>
                      <p className="text-sm text-muted-foreground">Wrap long lines in editor</p>
                    </div>
                    <Switch
                      checked={settings.wordWrap}
                      onCheckedChange={(checked) => updateSettings({ wordWrap: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage notification preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show toast notifications for actions</p>
                    </div>
                    <Switch
                      checked={settings.notificationsEnabled}
                      onCheckedChange={(checked) => updateSettings({ notificationsEnabled: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Settings;

```

## File: src\pages\Submissions.tsx

```
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Submission {
  id: string;
  problem_id: string;
  status: string;
  created_at: string;
  execution_time: number;
  problems: {
    title: string;
    difficulty: string;
  };
}

const Submissions = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  const fetchSubmissions = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("submissions")
      .select("id, problem_id, status, created_at, execution_time, problems(title, difficulty)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (data) {
      setSubmissions(data as unknown as Submission[]);
    }
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Submissions - PyChef</title>
        <meta name="description" content="View your code submissions on PyChef." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 sm:pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">My Submissions</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Track all your code submissions</p>
            </motion.div>

            <div className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">Status</div>
                <div className="col-span-4">Problem</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Result</div>
                <div className="col-span-3">Submitted</div>
              </div>

              {submissions.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No submissions yet</p>
                </div>
              ) : (
                submissions.map((sub, index) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      to={`/problems/${sub.problem_id}`}
                      className="block border-b border-border last:border-0 hover:bg-secondary/30"
                    >
                      {/* Desktop View */}
                      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center">
                        <div className="col-span-1">
                          {sub.status === "Accepted" ? (
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div className="col-span-4 font-medium text-foreground truncate">
                          {sub.problems?.title || "Unknown Problem"}
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`text-sm font-medium ${
                              sub.problems?.difficulty === "Easy"
                                ? "difficulty-easy"
                                : sub.problems?.difficulty === "Medium"
                                ? "difficulty-medium"
                                : "difficulty-hard"
                            }`}
                          >
                            {sub.problems?.difficulty || "-"}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`text-sm font-medium ${
                              sub.status === "Accepted" ? "text-accent" : "text-destructive"
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>
                        <div className="col-span-3 text-sm text-muted-foreground">
                          {new Date(sub.created_at).toLocaleString()}
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div className="md:hidden px-4 py-4">
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 mt-0.5">
                            {sub.status === "Accepted" ? (
                              <CheckCircle2 className="h-5 w-5 text-accent" />
                            ) : (
                              <XCircle className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-medium text-foreground text-sm truncate">
                                {sub.problems?.title || "Unknown Problem"}
                              </span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                            </div>
                            
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span
                                className={`font-medium ${
                                  sub.status === "Accepted" ? "text-accent" : "text-destructive"
                                }`}
                              >
                                {sub.status}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span
                                className={`font-medium ${
                                  sub.problems?.difficulty === "Easy"
                                    ? "difficulty-easy"
                                    : sub.problems?.difficulty === "Medium"
                                    ? "difficulty-medium"
                                    : "difficulty-hard"
                                }`}
                              >
                                {sub.problems?.difficulty || "-"}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">
                                {formatDate(sub.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Submissions;

```

## File: supabase\config.toml

```
project_id = "cfcsbyiirfxebfmxhyjh"

[functions.python-judge]
verify_jwt = true

[functions.rate-limiter]
verify_jwt = true

```

## File: supabase\functions\python-judge\index.ts

```
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restrict to app domains
const ALLOWED_ORIGINS = [
  "https://lovableproject.com",
  "https://lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  // Check if origin is allowed
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovableproject.com') || origin.endsWith('.lovable.app')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
  };
}

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 10; // Maximum 10 submissions per window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window

// In-memory rate limit store (resets on cold start, but provides protection during hot instances)
const rateLimitStore = new Map<string, { count: number; resetTime: number; lastFailedAt?: number }>();

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number;
}

function checkRateLimit(userId: string): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(userId);

  // Cleanup old entries periodically (simple memory management)
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetIn: record.resetTime - now };
}

// Track failed submissions for cooldown (prevent rapid retry abuse)
function recordFailedSubmission(userId: string): void {
  const record = rateLimitStore.get(userId);
  if (record) {
    record.lastFailedAt = Date.now();
  }
}

function isInCooldown(userId: string): boolean {
  const record = rateLimitStore.get(userId);
  if (!record?.lastFailedAt) return false;
  
  // 5 second cooldown after failed submission
  const COOLDOWN_MS = 5000;
  return Date.now() - record.lastFailedAt < COOLDOWN_MS;
}

interface TestCase {
  input: string;
  output: string;
}

interface JudgeRequest {
  problem_id: string;
  code: string;
  user_id: string;
  run_only?: boolean;
  custom_input?: string;
}

interface JudgeResult {
  status: string;
  output: string;
  execution_time: number;
  passed_tests?: number;
  total_tests?: number;
}

// Blocked imports for security
const BLOCKED_IMPORTS = [
  "os", "sys", "subprocess", "socket", "requests", "urllib",
  "http", "ftplib", "smtplib", "telnetlib", "pickle", "marshal",
  "ctypes", "multiprocessing", "threading", "asyncio", "__import__",
  "eval", "exec", "compile", "open", "file", "input"
];

function validateCode(code: string): { valid: boolean; error?: string } {
  const codeLines = code.toLowerCase();
  
  for (const blocked of BLOCKED_IMPORTS) {
    // Check for import statements
    if (new RegExp(`import\\s+${blocked}\\b`).test(codeLines)) {
      return { valid: false, error: `Blocked import: ${blocked}` };
    }
    if (new RegExp(`from\\s+${blocked}\\b`).test(codeLines)) {
      return { valid: false, error: `Blocked import: ${blocked}` };
    }
  }
  
  // Check for dangerous built-in functions
  const dangerousFunctions = ["open(", "exec(", "eval(", "__import__(", "compile("];
  for (const func of dangerousFunctions) {
    if (codeLines.includes(func)) {
      return { valid: false, error: `Blocked function: ${func.replace("(", "")}` };
    }
  }
  
  return { valid: true };
}

// Simple Python execution simulator
// In production, this would call a secure sandboxed Python executor
async function executePython(code: string, input: string, timeLimit: number): Promise<{ output: string; error?: string; executionTime: number }> {
  const startTime = Date.now();
  
  try {
    // For demo purposes, we'll simulate execution
    // In production, you would call a secure Python sandbox API
    // Options: Piston API, Judge0, or custom Docker-based solution
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    const executionTime = (Date.now() - startTime) / 1000;
    
    // Check timeout
    if (executionTime > timeLimit) {
      return { output: "", error: "Time Limit Exceeded", executionTime };
    }
    
    // Simulate code execution based on common patterns
    // This is a placeholder - real implementation would execute Python code
    const simulatedOutput = simulateExecution(code, input);
    
    return { output: simulatedOutput, executionTime };
  } catch (error) {
    return { 
      output: "", 
      error: `Runtime Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      executionTime: (Date.now() - startTime) / 1000 
    };
  }
}

function simulateExecution(code: string, input: string): string {
  // This is a simplified simulation for demo purposes
  // In production, use a real Python executor
  
  const inputLines = input.trim().split("\n");
  
  // Two Sum simulation
  if (code.includes("complement") && code.includes("seen")) {
    if (inputLines.length >= 2) {
      const nums = inputLines[0].split(" ").map(Number);
      const target = parseInt(inputLines[1]);
      const seen: Record<number, number> = {};
      
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (complement in seen) {
          return `${seen[complement]} ${i}`;
        }
        seen[nums[i]] = i;
      }
    }
    return "0 1";
  }
  
  // Palindrome simulation
  if (code.includes("palindrome") || (code.includes("str(") && code.includes("[::-1]"))) {
    const x = parseInt(inputLines[0]);
    const isPalindrome = x.toString() === x.toString().split("").reverse().join("");
    return isPalindrome ? "true" : "false";
  }
  
  // Maximum subarray (Kadane's algorithm) simulation
  if (code.includes("max_sum") || code.includes("kadane") || code.includes("current_sum")) {
    const nums = inputLines[0].split(" ").map(Number);
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
      currentSum = Math.max(nums[i], currentSum + nums[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum.toString();
  }
  
  // Valid parentheses simulation
  if (code.includes("stack") && code.includes("(") && code.includes("{")) {
    const s = inputLines[0].trim();
    const stack: string[] = [];
    const pairs: Record<string, string> = { ")": "(", "}": "{", "]": "[" };
    
    for (const char of s) {
      if ("({[".includes(char)) {
        stack.push(char);
      } else if (")}]".includes(char)) {
        if (stack.length === 0 || stack.pop() !== pairs[char]) {
          return "false";
        }
      }
    }
    return stack.length === 0 ? "true" : "false";
  }
  
  // N-Queens simulation
  if (code.includes("queens") || code.includes("backtrack")) {
    const n = parseInt(inputLines[0]);
    // Pre-computed solutions for common N values
    const solutions: Record<number, number> = { 1: 1, 2: 0, 3: 0, 4: 2, 5: 10, 6: 4, 7: 40, 8: 92, 9: 352 };
    return (solutions[n] || 0).toString();
  }
  
  // Default: return the first line of output based on print statement
  return "Output simulated";
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { problem_id, code, user_id, run_only, custom_input }: JudgeRequest = await req.json();
    
    console.log(`Judge request for problem: ${problem_id}, user: ${user_id}, run_only: ${run_only}`);
    
    // Rate limiting check - apply to all requests
    const rateLimit = checkRateLimit(user_id);
    
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for user: ${user_id}`);
      return new Response(
        JSON.stringify({
          status: "Rate Limited",
          output: `Too many submissions. Please wait ${Math.ceil(rateLimit.resetIn / 1000)} seconds before trying again.`,
          execution_time: 0,
        }),
        { 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": Math.ceil(rateLimit.resetIn / 1000).toString(),
            "X-RateLimit-Remaining": "0",
          },
          status: 429,
        }
      );
    }
    
    // Check cooldown after failed submission
    if (isInCooldown(user_id)) {
      console.log(`Cooldown active for user: ${user_id}`);
      return new Response(
        JSON.stringify({
          status: "Rate Limited",
          output: "Please wait a few seconds before retrying after a failed submission.",
          execution_time: 0,
        }),
        { 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": "5",
          },
          status: 429,
        }
      );
    }
    
    // Validate code for security
    const validation = validateCode(code);
    if (!validation.valid) {
      recordFailedSubmission(user_id); // Track failed attempt
      return new Response(
        JSON.stringify({
          status: "Compilation Error",
          output: validation.error,
          execution_time: 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Fetch problem data
    const { data: problem, error: problemError } = await supabase
      .from("problems")
      .select("testcases, samples, time_limit")
      .eq("id", problem_id)
      .single();
    
    if (problemError || !problem) {
      console.error("Problem fetch error:", problemError);
      return new Response(
        JSON.stringify({ status: "Error", output: "Problem not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }
    
    let result: JudgeResult;
    
    if (run_only) {
      // Just run against sample input or custom input
      const testInput = custom_input || (problem.samples[0] as TestCase)?.input || "";
      const execution = await executePython(code, testInput, problem.time_limit);
      
      result = {
        status: execution.error ? "Runtime Error" : "Executed",
        output: execution.error || execution.output,
        execution_time: execution.executionTime,
      };
    } else {
      // Full submission - run against all test cases
      const testcases = problem.testcases as TestCase[];
      let passedTests = 0;
      let totalTime = 0;
      let failedOutput = "";
      let status = "Accepted";
      
      for (let i = 0; i < testcases.length; i++) {
        const testcase = testcases[i];
        const execution = await executePython(code, testcase.input, problem.time_limit);
        totalTime += execution.executionTime;
        
        if (execution.error) {
          if (execution.error.includes("Time Limit")) {
            status = "Time Limit Exceeded";
          } else {
            status = "Runtime Error";
          }
          failedOutput = execution.error;
          break;
        }
        
        const expectedOutput = testcase.output.trim();
        const actualOutput = execution.output.trim();
        
        if (actualOutput === expectedOutput) {
          passedTests++;
        } else {
          status = "Wrong Answer";
          failedOutput = `Test ${i + 1}: Expected "${expectedOutput}", got "${actualOutput}"`;
          break;
        }
      }
      
      result = {
        status,
        output: status === "Accepted" 
          ? `All ${testcases.length} test cases passed!` 
          : failedOutput,
        execution_time: totalTime,
        passed_tests: passedTests,
        total_tests: testcases.length,
      };
      
      // Save submission to database
      const { error: submissionError } = await supabase
        .from("submissions")
        .insert({
          user_id,
          problem_id,
          code,
          status: result.status,
          output: result.output,
          execution_time: result.execution_time,
        });
      
      if (submissionError) {
        console.error("Submission save error:", submissionError);
      }
      
      // Update user XP if accepted
      if (status === "Accepted") {
        const xpGain = 50; // Base XP for solving a problem
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("xp, level")
          .eq("user_id", user_id)
          .single();
        
        if (profile) {
          const newXp = profile.xp + xpGain;
          const newLevel = Math.floor(newXp / 300) + 1; // Level up every 300 XP
          
          await supabase
            .from("profiles")
            .update({ 
              xp: newXp, 
              level: newLevel,
              last_active: new Date().toISOString().split("T")[0]
            })
            .eq("user_id", user_id);
        }
      }
    }
    
    console.log(`Judge result: ${result.status}`);
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Judge error:", error);
    const origin = req.headers.get("origin");
    const corsHeaders = getCorsHeaders(origin);
    return new Response(
      JSON.stringify({ 
        status: "Error", 
        output: error instanceof Error ? error.message : "Unknown error",
        execution_time: 0 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

```

## File: supabase\functions\rate-limiter\index.ts

```
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS - restrict to app domains
const ALLOWED_ORIGINS = [
  "https://lovableproject.com",
  "https://lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  // Check if origin is allowed
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovableproject.com') || origin.endsWith('.lovable.app')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Rate limiting store (in-memory - resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number;
}

function checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 60000): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetIn: record.resetTime - now };
}

serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client identifier (IP or auth token)
    const clientId = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(clientId);

    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for ${clientId}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests', 
          retryAfter: Math.ceil(rateLimit.resetIn / 1000) 
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(rateLimit.resetIn / 1000).toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const { action } = await req.json();

    let response;

    switch (action) {
      case 'check':
        response = { 
          status: 'ok', 
          rateLimitRemaining: rateLimit.remaining,
          message: 'Rate limit check passed'
        };
        break;
      default:
        response = { 
          status: 'ok',
          rateLimitRemaining: rateLimit.remaining 
        };
    }

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    });

  } catch (error) {
    console.error('Rate limit error:', error);
    const corsHeaders = getCorsHeaders(req.headers.get('origin'));
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

```

## File: supabase\migrations\20251224103820_ab0f8252-963f-454d-a029-1511a54e0584.sql

```
-- Create app role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table (CRITICAL: roles must be separate from profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  last_active DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create problems table
CREATE TABLE public.problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  statement TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  tags TEXT[] DEFAULT '{}',
  input_format TEXT,
  output_format TEXT,
  constraints TEXT,
  samples JSONB NOT NULL DEFAULT '[]',
  testcases JSONB NOT NULL DEFAULT '[]',
  time_limit INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'python',
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Compilation Error')),
  output TEXT,
  execution_time FLOAT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- User roles policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Profiles policies
CREATE POLICY "Users can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Problems policies (public read, admin write)
CREATE POLICY "Anyone can view problems"
ON public.problems FOR SELECT
USING (true);

CREATE POLICY "Admins can manage problems"
ON public.problems FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Submissions policies
CREATE POLICY "Users can view their own submissions"
ON public.submissions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
ON public.submissions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all submissions"
ON public.submissions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_problems_updated_at
  BEFORE UPDATE ON public.problems
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample problems
INSERT INTO public.problems (title, statement, difficulty, tags, input_format, output_format, constraints, samples, testcases) VALUES
(
  'Two Sum',
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.',
  'Easy',
  ARRAY['Array', 'Hash Table'],
  'The first line contains the array of integers separated by spaces.
The second line contains the target integer.',
  'Print the two indices separated by a space.',
  '- 2 ≤ nums.length ≤ 10⁴
- -10⁹ ≤ nums[i] ≤ 10⁹
- -10⁹ ≤ target ≤ 10⁹
- Only one valid answer exists.',
  '[{"input": "2 7 11 15\n9", "output": "0 1", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."}, {"input": "3 2 4\n6", "output": "1 2", "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."}]',
  '[{"input": "2 7 11 15\n9", "output": "0 1"}, {"input": "3 2 4\n6", "output": "1 2"}, {"input": "3 3\n6", "output": "0 1"}]'
),
(
  'Palindrome Number',
  'Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same forward and backward.',
  'Easy',
  ARRAY['Math'],
  'A single integer x.',
  'Print "true" if x is a palindrome, "false" otherwise.',
  '- -2³¹ ≤ x ≤ 2³¹ - 1',
  '[{"input": "121", "output": "true", "explanation": "121 reads as 121 from left to right and from right to left."}, {"input": "-121", "output": "false", "explanation": "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."}]',
  '[{"input": "121", "output": "true"}, {"input": "-121", "output": "false"}, {"input": "10", "output": "false"}, {"input": "12321", "output": "true"}]'
),
(
  'Maximum Subarray',
  'Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.',
  'Medium',
  ARRAY['Array', 'Dynamic Programming', 'Divide and Conquer'],
  'A single line containing the array of integers separated by spaces.',
  'Print the maximum subarray sum.',
  '- 1 ≤ nums.length ≤ 10⁵
- -10⁴ ≤ nums[i] ≤ 10⁴',
  '[{"input": "-2 1 -3 4 -1 2 1 -5 4", "output": "6", "explanation": "The subarray [4,-1,2,1] has the largest sum 6."}, {"input": "1", "output": "1", "explanation": "The subarray [1] has the largest sum 1."}]',
  '[{"input": "-2 1 -3 4 -1 2 1 -5 4", "output": "6"}, {"input": "1", "output": "1"}, {"input": "5 4 -1 7 8", "output": "23"}]'
),
(
  'Valid Parentheses',
  'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.',
  'Easy',
  ARRAY['String', 'Stack'],
  'A single line containing the string s.',
  'Print "true" if the string is valid, "false" otherwise.',
  '- 1 ≤ s.length ≤ 10⁴
- s consists of parentheses only ''()[]{}''',
  '[{"input": "()", "output": "true"}, {"input": "()[]{}", "output": "true"}, {"input": "(]", "output": "false"}]',
  '[{"input": "()", "output": "true"}, {"input": "()[]{}", "output": "true"}, {"input": "(]", "output": "false"}, {"input": "([)]", "output": "false"}, {"input": "{[]}", "output": "true"}]'
),
(
  'N-Queens',
  'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.',
  'Hard',
  ARRAY['Backtracking', 'Recursion'],
  'A single integer n.',
  'Print the number of distinct solutions.',
  '- 1 ≤ n ≤ 9',
  '[{"input": "4", "output": "2", "explanation": "There are two distinct solutions to the 4-queens puzzle."}, {"input": "1", "output": "1"}]',
  '[{"input": "4", "output": "2"}, {"input": "1", "output": "1"}, {"input": "8", "output": "92"}]'
);
```

## File: supabase\migrations\20251224162743_36d97a74-0147-432f-90ab-1d3f6763d420.sql

```
-- Achievements table for defining all possible achievements
CREATE TABLE public.achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'trophy',
  category TEXT NOT NULL DEFAULT 'general',
  xp_reward INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User achievements table for tracking which users earned which achievements
CREATE TABLE public.user_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  achievement_id uuid NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Problem hints table for storing progressive hints
CREATE TABLE public.problem_hints (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  hint_order INTEGER NOT NULL DEFAULT 1,
  content TEXT NOT NULL,
  xp_cost INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(problem_id, hint_order)
);

-- User viewed hints to track which hints users have unlocked
CREATE TABLE public.user_hint_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  hint_id uuid NOT NULL REFERENCES public.problem_hints(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, hint_id)
);

-- User code templates table
CREATE TABLE public.user_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'python',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_hint_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_templates ENABLE ROW LEVEL SECURITY;

-- Achievements policies - anyone can view, admins can manage
CREATE POLICY "Anyone can view achievements"
ON public.achievements FOR SELECT
USING (true);

CREATE POLICY "Admins can manage achievements"
ON public.achievements FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- User achievements policies
CREATE POLICY "Users can view all user achievements"
ON public.user_achievements FOR SELECT
USING (true);

CREATE POLICY "System can insert user achievements"
ON public.user_achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Problem hints policies
CREATE POLICY "Anyone can view problem hints"
ON public.problem_hints FOR SELECT
USING (true);

CREATE POLICY "Admins can manage hints"
ON public.problem_hints FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- User hint views policies
CREATE POLICY "Users can view their own hint views"
ON public.user_hint_views FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own hint views"
ON public.user_hint_views FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- User templates policies
CREATE POLICY "Users can view their own templates"
ON public.user_templates FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own templates"
ON public.user_templates FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
ON public.user_templates FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
ON public.user_templates FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updating user_templates updated_at
CREATE TRIGGER update_user_templates_updated_at
BEFORE UPDATE ON public.user_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default achievements
INSERT INTO public.achievements (key, name, description, icon, category, xp_reward) VALUES
('first_submission', 'First Steps', 'Submit your first solution', 'rocket', 'milestones', 10),
('first_accepted', 'First Blood', 'Get your first accepted solution', 'check-circle', 'milestones', 25),
('solve_5', 'Getting Started', 'Solve 5 problems', 'star', 'progress', 50),
('solve_10', 'Problem Solver', 'Solve 10 problems', 'award', 'progress', 100),
('solve_25', 'Dedicated Coder', 'Solve 25 problems', 'trophy', 'progress', 250),
('solve_50', 'Algorithm Master', 'Solve 50 problems', 'crown', 'progress', 500),
('streak_3', 'Consistent', 'Maintain a 3-day streak', 'flame', 'streaks', 30),
('streak_7', 'Streak Master', 'Maintain a 7-day streak', 'flame', 'streaks', 75),
('streak_30', 'Unstoppable', 'Maintain a 30-day streak', 'flame', 'streaks', 300),
('easy_master', 'Easy Peasy', 'Solve all easy problems', 'zap', 'mastery', 100),
('speed_demon', 'Speed Demon', 'Solve a problem in under 5 minutes', 'timer', 'special', 50),
('night_owl', 'Night Owl', 'Submit a solution after midnight', 'moon', 'special', 25),
('early_bird', 'Early Bird', 'Submit a solution before 6 AM', 'sunrise', 'special', 25);
```

## File: supabase\migrations\20251224163431_850ed9b4-b91e-4ba5-bb23-d9c136ef651a.sql

```
-- Problem difficulty votes table
CREATE TABLE public.difficulty_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  perceived_difficulty TEXT NOT NULL CHECK (perceived_difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- User follows table
CREATE TABLE public.follows (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id uuid NOT NULL,
  following_id uuid NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Shared solutions table
CREATE TABLE public.shared_solutions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  submission_id uuid NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Solution likes table
CREATE TABLE public.solution_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  solution_id uuid NOT NULL REFERENCES public.shared_solutions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, solution_id)
);

-- Problem comments table
CREATE TABLE public.problem_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.problem_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Daily challenges table
CREATE TABLE public.daily_challenges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL UNIQUE,
  bonus_xp INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User daily challenge completions
CREATE TABLE public.daily_challenge_completions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Enable RLS on all tables
ALTER TABLE public.difficulty_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenge_completions ENABLE ROW LEVEL SECURITY;

-- Difficulty votes policies
CREATE POLICY "Anyone can view difficulty votes"
ON public.difficulty_votes FOR SELECT USING (true);

CREATE POLICY "Users can insert their own votes"
ON public.difficulty_votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
ON public.difficulty_votes FOR UPDATE
USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Anyone can view follows"
ON public.follows FOR SELECT USING (true);

CREATE POLICY "Users can follow others"
ON public.follows FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
ON public.follows FOR DELETE
USING (auth.uid() = follower_id);

-- Shared solutions policies
CREATE POLICY "Anyone can view public solutions"
ON public.shared_solutions FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create solutions"
ON public.shared_solutions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their solutions"
ON public.shared_solutions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their solutions"
ON public.shared_solutions FOR DELETE
USING (auth.uid() = user_id);

-- Solution likes policies
CREATE POLICY "Anyone can view likes"
ON public.solution_likes FOR SELECT USING (true);

CREATE POLICY "Users can like solutions"
ON public.solution_likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike solutions"
ON public.solution_likes FOR DELETE
USING (auth.uid() = user_id);

-- Problem comments policies
CREATE POLICY "Anyone can view comments"
ON public.problem_comments FOR SELECT USING (true);

CREATE POLICY "Users can create comments"
ON public.problem_comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their comments"
ON public.problem_comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their comments"
ON public.problem_comments FOR DELETE
USING (auth.uid() = user_id);

-- Daily challenges policies
CREATE POLICY "Anyone can view daily challenges"
ON public.daily_challenges FOR SELECT USING (true);

CREATE POLICY "Admins can manage daily challenges"
ON public.daily_challenges FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Daily challenge completions policies
CREATE POLICY "Anyone can view completions"
ON public.daily_challenge_completions FOR SELECT USING (true);

CREATE POLICY "Users can insert their completions"
ON public.daily_challenge_completions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_shared_solutions_updated_at
BEFORE UPDATE ON public.shared_solutions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_problem_comments_updated_at
BEFORE UPDATE ON public.problem_comments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update solution likes count
CREATE OR REPLACE FUNCTION public.update_solution_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.shared_solutions 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.solution_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.shared_solutions 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.solution_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER on_solution_like_change
AFTER INSERT OR DELETE ON public.solution_likes
FOR EACH ROW EXECUTE FUNCTION public.update_solution_likes_count();
```

## File: supabase\migrations\20251230081313_f90bdf7f-76be-4499-95ce-a0347a0797bc.sql

```
-- Create user_settings table for editor preferences
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  editor_theme TEXT NOT NULL DEFAULT 'vs-dark',
  font_size INTEGER NOT NULL DEFAULT 14,
  word_wrap BOOLEAN NOT NULL DEFAULT false,
  vim_mode BOOLEAN NOT NULL DEFAULT false,
  show_line_numbers BOOLEAN NOT NULL DEFAULT true,
  auto_save BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Users can view their own settings
CREATE POLICY "Users can view their own settings"
ON public.user_settings
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own settings
CREATE POLICY "Users can insert their own settings"
ON public.user_settings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users can update their own settings"
ON public.user_settings
FOR UPDATE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON public.user_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
```

