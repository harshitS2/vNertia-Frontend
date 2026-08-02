"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "cyberpunk";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // Read theme from localStorage on load
    const savedTheme = localStorage.getItem("vnertia-theme") as Theme;
    if (
      savedTheme &&
      (savedTheme === "dark" || savedTheme === "light" || savedTheme === "cyberpunk")
    ) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Default to dark
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("vnertia-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
