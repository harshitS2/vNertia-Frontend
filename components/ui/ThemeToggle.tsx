"use client";

import React from "react";
import { useTheme, Theme } from "@/context/ThemeContext";
import { Sun, Moon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; icon: React.ComponentType<any>; label: string }[] = [
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "light", icon: Sun, label: "Light" },
    { value: "cyberpunk", icon: Sparkles, label: "Cyberpunk" },
  ];

  return (
    <div className="relative flex items-center p-1 rounded-full bg-glass-bg border border-glass-border">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`relative p-2 rounded-full transition-colors duration-300 focus:outline-none ${
              isActive ? "text-text-primary font-semibold" : "text-text-muted hover:text-text-secondary"
            }`}
            title={`Switch to ${opt.label} theme`}
            aria-label={`Switch to ${opt.label} theme`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full bg-teal-primary/25 border border-teal-primary/35"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
          </button>
        );
      })}
    </div>
  );
}
