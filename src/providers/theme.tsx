"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the ThemeContext
type ThemeContextType = {
  theme: "light" | "dark"; // Current theme (light or dark)
  toggleTheme: () => void; // Function to toggle theme
  team: keyof typeof teamThemes; // Current team theme
  setTeam: (team: keyof typeof teamThemes) => void; // Function to update team theme
};

// Define the structure of a team theme
type TeamTheme = {
  accent: string; // Accent color
  link: string; // Link color
  bubble: string; // Color for bubble elements
  teamName: string; // Display name of the team
  dark?: {
    background?: string; // Background color for dark mode
    link?: string; // Link color for dark mode
    accent?: string; // Accent color for dark mode
  };
};

// Create a context for theme management
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define themes for each team
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
    teamName: "Star Racing Yamaha",
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

// ThemeProvider Component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null); // Theme state
  const [team, setTeam] = useState<keyof typeof teamThemes>("default"); // Team state

  /**
   * Applies CSS variables based on the current theme and team.
   *
   * @param theme - Current theme (light or dark).
   * @param team - Current team name.
   */
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

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    const savedTeam =
      (localStorage.getItem("team") as keyof typeof teamThemes) || "default";

    setTheme(savedTheme);
    setTeam(savedTeam);

    // Apply initial theme variables
    applyThemeVariables(savedTheme, savedTeam);
  }, []);

  // Update CSS variables when theme or team changes
  useEffect(() => {
    if (theme && team) {
      applyThemeVariables(theme, team);
    }
  }, [theme, team]);

  /**
   * Toggles between light and dark themes.
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  /**
   * Updates the active team theme.
   *
   * @param newTeam - The new team to apply.
   */
  const updateTeam = (newTeam: keyof typeof teamThemes) => {
    setTeam(newTeam);
    localStorage.setItem("team", newTeam);
  };

  // Ensure the component doesn't render until hydration
  if (theme === null) return null;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        team,
        setTeam: updateTeam,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the ThemeContext.
 *
 * @returns The current theme context values.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
