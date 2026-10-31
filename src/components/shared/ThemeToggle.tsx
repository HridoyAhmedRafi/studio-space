"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  className?: string;
};

const applyTheme = (theme: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", theme === "dark");

  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be unavailable (e.g. private browsing); the class still applies.
  }
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  };

  // The icon follows the active theme via the `.dark` class (no state, no
  // hydration mismatch): sun in light mode, moon in dark mode.
  const icon = (
    <>
      <Sun className="size-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-4 dark:block" aria-hidden="true" />
    </>
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      {icon}
    </Button>
  );
};

export default ThemeToggle;
