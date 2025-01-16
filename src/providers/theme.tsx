"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the shape of each team's theme
type TeamTheme = {
  accent: string;
  link: string;
  bubble: string;
  teamName: string;
  dark?: {
    link?: string;
    accent?: string;
  };
};

// Define the shape of the ThemeContext
type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  team: keyof typeof teamThemes;
  setTeam: (team: keyof typeof teamThemes) => void;
};

// Create the ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define team themes with type annotation
export const teamThemes: Record<string, TeamTheme> = {
  default: {
    accent: "#cccccc",
    link: "#1e73e8",
    bubble: "#cccccc",
    teamName: "",
    dark: {
      link: "#3a8dff",
    },
  },
  yamaha: {
    accent: "#95D600",
    link: "#0D47F7",
    bubble: "#0b39a0",
    teamName: "Star Racing Yamaha",
    dark: {
      link: "#4185F4",
    },
  },
  honda: {
    accent: "#0033A0",
    link: "#CC0000",
    bubble: "#CC0000",
    teamName: "Honda HRC Progressive",
  },
  kawasaki: {
    accent: "#95D600",
    link: "#6B9900",
    bubble: "#95D600",
    teamName: "Monster Energy Kawasaki",
    dark: {
      link: "#95D600",
    },
  },
  ktm: {
    accent: "#FF6600",
    link: "#FF6600",
    bubble: "#FF6600",
    teamName: "Red Bull KTM",
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
      accent: "#273A60",
      link: "#FFED00",
    },
  },
  triumph: {
    accent: "#D4D700",
    link: "#000000",
    bubble: "#F0FF00",
    teamName: "Triumph Factory Racing",
    dark: {
      link: "#F0FF00",
    },
  },
};

// ThemeProvider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [team, setTeam] = useState<keyof typeof teamThemes>("default");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const savedTeam = localStorage.getItem("team") as
        | keyof typeof teamThemes
        | null;

      setTheme(savedTheme || "light");
      setTeam(savedTeam || "default");
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const root = document.documentElement;
      const teamColors = teamThemes[team];

      root.setAttribute("data-theme", theme);

      const linkColor =
        theme === "dark" && teamColors.dark?.link
          ? teamColors.dark.link
          : teamColors.link || "#3a8dff";

      const accentColor =
        theme === "dark" && teamColors.dark?.accent
          ? teamColors.dark.accent
          : teamColors.accent;

      root.style.setProperty("--accent", accentColor);
      root.style.setProperty("--link", linkColor);

      localStorage.setItem("theme", theme);
      localStorage.setItem("team", team);
    }
  }, [theme, team, isHydrated]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!isHydrated) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, team, setTeam }}>
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
