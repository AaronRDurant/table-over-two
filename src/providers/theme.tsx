"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  team: keyof typeof teamThemes;
  setTeam: (team: keyof typeof teamThemes) => void;
};

type TeamTheme = {
  accent: string;
  link: string;
  bubble: string;
  teamName: string;
  dark?: {
    background?: string;
    link?: string;
    accent?: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const teamThemes: Record<string, TeamTheme> = {
  default: {
    accent: "#cccccc",
    link: "#1a73e8",
    bubble: "#cccccc",
    teamName: "",
  },
  yamaha: {
    accent: "#024DCA",
    link: "#000000",
    bubble: "#024DCA",
    teamName: "Monster Energy Yamaha Star Racing",
    dark: {
      link: "#024DCA",
      accent: "#95D600",
    },
  },
  honda: {
    accent: "#0033A0",
    link: "#CC0000",
    bubble: "#CC0000",
    teamName: "Team Honda HRC",
    dark: {
      link: "#CC0000",
    },
  },
  kawasaki: {
    accent: "#95D600",
    link: "#000000",
    bubble: "#95D600",
    teamName: "Monster Energy Kawasaki",
    dark: {
      link: "#95D600",
      accent: "#95D600",
    },
  },
  ktm: {
    accent: "#FF6600",
    link: "#000000",
    bubble: "#FF6600",
    teamName: "Red Bull KTM",
    dark: {
      link: "#FF6600",
    },
  },
  gasgas: {
    accent: "#CF9C43",
    link: "#CB0D25",
    bubble: "#CB0D25",
    teamName: "Rockstar Energy GasGas",
    dark: {
      link: "#CB0D25",
      accent: "#CF9C43",
    },
  },
  husqvarna: {
    accent: "#FFED00",
    link: "#273A60",
    bubble: "#273A60",
    teamName: "Rockstar Energy Husqvarna",
    dark: {
      background: "#273A60",
      link: "#FFED00",
      accent: "#FFED00",
    },
  },
  triumph: {
    accent: "#F0FF00",
    link: "#000000",
    bubble: "#F0FF00",
    teamName: "Triumph Factory Racing",
    dark: {
      link: "#F0FF00",
    },
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [team, setTeam] = useState<keyof typeof teamThemes>("default");

  // Apply theme styles
  const applyThemeVariables = (theme: "light" | "dark", team: string) => {
    const teamColors = teamThemes[team] || teamThemes.default;
    const isDarkMode = theme === "dark";

    document.documentElement.style.setProperty(
      "--accent",
      isDarkMode && teamColors.dark?.accent
        ? teamColors.dark.accent
        : teamColors.accent
    );
    document.documentElement.style.setProperty(
      "--link",
      isDarkMode && teamColors.dark?.link
        ? teamColors.dark.link
        : teamColors.link
    );
    document.documentElement.style.setProperty(
      "--background",
      isDarkMode && teamColors.dark?.background
        ? teamColors.dark.background
        : isDarkMode
        ? "#000000"
        : "#f5f5f1"
    );
    document.documentElement.style.setProperty(
      "--foreground",
      isDarkMode ? "#ffffff" : "#222222"
    );
    document.documentElement.style.setProperty(
      "--text",
      isDarkMode ? "#ffffff" : "#222222"
    );
  };

  // Load theme and team from localStorage on mount
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    const savedTeam =
      (localStorage.getItem("team") as keyof typeof teamThemes) || "default";

    setTheme(savedTheme);
    setTeam(savedTeam);

    // Apply immediately to avoid flash
    applyThemeVariables(savedTheme, savedTeam);
  }, []);

  // Update CSS variables whenever theme or team changes
  useEffect(() => {
    if (theme && team) {
      applyThemeVariables(theme, team);
    }
  }, [theme, team]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSetTeam = (newTeam: keyof typeof teamThemes) => {
    setTeam(newTeam);
    localStorage.setItem("team", newTeam);
  };

  if (theme === null) return null; // Wait until hydrated

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        team,
        setTeam: handleSetTeam,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
