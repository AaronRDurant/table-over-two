"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { ThemeCommandMenu } from "@/components/theme/ThemeCommandMenu";
import {
  applyBrandToRoot,
  resolveAppearanceMode,
} from "@/lib/themes/apply-theme";
import { OEM_THEMES } from "@/lib/themes/oem-palettes";
import {
  persistTheme,
  readStoredAppearance,
  readStoredBrand,
} from "@/lib/themes/storage";
import type { AppearancePreference, BrandId } from "@/lib/themes/types";

type ThemeContextValue = {
  brand: BrandId;
  setBrand: (id: BrandId) => void;
  appearance: AppearancePreference;
  setAppearance: (a: AppearancePreference) => void;
  /** Follows prior toggle: flips effective light/dark; collapses `system` into an explicit choice. */
  toggleAppearance: () => void;
  systemIsDark: boolean;
  resolvedAppearance: "light" | "dark";
  /** Cmd/Ctrl+K palette + sidebar theme control share this surface. */
  themeSelectorOpen: boolean;
  openThemeSelector: () => void;
  closeThemeSelector: () => void;
  toggleThemeSelector: () => void;
  /** False until stored brand/appearance + system scheme are read (avoids SSR/flash). */
  prefsReady: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrandState] = useState<BrandId>("default");
  const [appearance, setAppearanceState] =
    useState<AppearancePreference>("system");
  const [prefsReady, setPrefsReady] = useState(false);
  const [themeSelectorOpen, setThemeSelectorOpen] = useState(false);
  const [systemIsDark, setSystemIsDark] = useState(false);

  const resolvedAppearance = useMemo(
    () => resolveAppearanceMode(appearance, systemIsDark),
    [appearance, systemIsDark]
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemIsDark(mq.matches);
    setBrandState(readStoredBrand());
    setAppearanceState(readStoredAppearance());
    setPrefsReady(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemIsDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    if (!prefsReady) return;
    const root = document.documentElement;
    applyBrandToRoot(root, brand, resolvedAppearance);
    persistTheme(brand, appearance);
    const meta = document.querySelector("meta[name='theme-color']");
    const bg =
      OEM_THEMES[brand][resolvedAppearance === "dark" ? "dark" : "light"]
        .background;
    if (meta) meta.setAttribute("content", bg);
  }, [brand, appearance, resolvedAppearance, prefsReady]);

  const setBrand = useCallback((id: BrandId) => {
    setBrandState(id);
  }, []);

  const setAppearance = useCallback((a: AppearancePreference) => {
    setAppearanceState(a);
  }, []);

  const toggleAppearance = useCallback(() => {
    setAppearanceState((prev) => {
      if (prev === "system") {
        return systemIsDark ? "light" : "dark";
      }
      return prev === "light" ? "dark" : "light";
    });
  }, [systemIsDark]);

  const openThemeSelector = useCallback(() => setThemeSelectorOpen(true), []);
  const closeThemeSelector = useCallback(() => setThemeSelectorOpen(false), []);
  const toggleThemeSelector = useCallback(
    () => setThemeSelectorOpen((o) => !o),
    []
  );

  const value = useMemo(
    () => ({
      brand,
      setBrand,
      appearance,
      setAppearance,
      toggleAppearance,
      systemIsDark,
      resolvedAppearance,
      themeSelectorOpen,
      openThemeSelector,
      closeThemeSelector,
      toggleThemeSelector,
      prefsReady,
    }),
    [
      brand,
      setBrand,
      appearance,
      setAppearance,
      toggleAppearance,
      systemIsDark,
      resolvedAppearance,
      themeSelectorOpen,
      openThemeSelector,
      closeThemeSelector,
      toggleThemeSelector,
      prefsReady,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ThemeCommandMenu />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
