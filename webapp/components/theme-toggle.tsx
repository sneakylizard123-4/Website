"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    if (theme === "auto") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("auto");
  };

  const icon =
    theme === "auto" ? (
      <Monitor className="h-4 w-4" />
    ) : theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );

  return (
    <button
      onClick={cycle}
      type="button"
      aria-label="Toggle theme"
      title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-accent"
    >
      {icon}
    </button>
  );
}
