/**
 * tailwind.config.ts
 *
 * Tailwind CSS configuration for Vnertia.com.
 *
 * Brand tokens from the Vnertia identity guide are registered here as
 * Tailwind theme extensions so every component can use them via utility classes:
 *
 *   Brand colours:
 *     text-teal-primary   → #25C4CB  (main teal)
 *     text-teal-dark      → #1A8C96  (darker teal / hover)
 *     text-navy            → #0D2326  (dark navy background)
 *     text-slate-brand    → #2B5156  (slate mid-tone)
 *     text-teal-light     → #94D3D8  (light teal / muted)
 *
 *   Font family:
 *     font-inter          → Inter (Google Fonts, loaded in layout.tsx)
 *
 * Content paths include all component and page files for PurgeCSS to work.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  // Tell Tailwind where to scan for class names — keeps the bundle small
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ----------------------------------------------------------------
      // Brand colour palette (from the Vnertia identity guide)
      // ----------------------------------------------------------------
      colors: {
        teal: {
          primary: "#25C4CB",   // Main teal — used for CTAs, accents, arc
          dark:    "#1A8C96",   // Darker teal — used for hover states, gradient end
          light:   "#94D3D8",   // Light teal — used for muted text, soft highlights
        },
        navy:  "#0D2326",       // Primary dark background
        slate: {
          brand: "#2B5156",     // Slate mid-tone — secondary backgrounds, borders
        },
      },

      // ----------------------------------------------------------------
      // Typography — Inter is loaded via Google Fonts in layout.tsx
      // ----------------------------------------------------------------
      fontFamily: {
        inter: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        sans:  ["Inter", "Helvetica Neue", "Arial", "sans-serif"], // override default
      },

      // ----------------------------------------------------------------
      // Custom animations
      // ----------------------------------------------------------------
      keyframes: {
        // Rotating arc — used in the hero section background decoration
        arcSpin: {
          "0%":   { transform: "rotate(0deg)"   },
          "100%": { transform: "rotate(360deg)" },
        },
        // Gentle floating bob — for decorative elements
        float: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":       { transform: "translateY(-10px)" },
        },
        // Shimmer — used on skeleton loaders (ready for future use)
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0"  },
        },
      },
      animation: {
        arcSpin: "arcSpin 12s linear infinite",
        float:   "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },

      // ----------------------------------------------------------------
      // Border radius extensions
      // ----------------------------------------------------------------
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ----------------------------------------------------------------
      // Custom box shadows for the brand
      // ----------------------------------------------------------------
      boxShadow: {
        "teal-sm":  "0 2px 12px rgba(37, 196, 203, 0.15)",
        "teal-md":  "0 4px 24px rgba(37, 196, 203, 0.20)",
        "teal-lg":  "0 8px 40px rgba(37, 196, 203, 0.25)",
        "teal-xl":  "0 16px 60px rgba(37, 196, 203, 0.30)",
        "dark-md":  "0 4px 24px rgba(0, 0, 0, 0.40)",
      },
    },
  },

  plugins: [],
};

export default config;
