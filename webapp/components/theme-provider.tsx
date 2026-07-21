"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "auto";

interface ThemeContextValue {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "auto",
  resolved: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(mode: Theme): "light" | "dark" {
  if (mode === "auto") return getSystemPreference();
  return mode;
}

function applyResolved(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "auto";
  try {
    return (localStorage.getItem("themePreference") as Theme) || "auto";
  } catch {
    return "auto";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("auto");
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = getStoredTheme();
    const r = resolveTheme(stored);
    // Sync React state with localStorage after hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(stored);
    setResolved(r);
    applyResolved(r);
  }, []);

  useEffect(() => {
    applyResolved(resolved);
  }, [resolved]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "auto") {
        const r = getSystemPreference();
        setResolved(r);
        applyResolved(r);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("themePreference", t);
    const r = resolveTheme(t);
    setResolved(r);
    applyResolved(r);
    document.body.classList.add("theme-fade");
    setTimeout(() => document.body.classList.remove("theme-fade"), 300);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
