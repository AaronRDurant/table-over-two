/** OEM-only labels — no title sponsors. */

export type BrandId =
  | "default"
  | "yamaha"
  | "honda"
  | "kawasaki"
  | "ktm"
  | "husqvarna"
  | "suzuki"
  | "ducati"
  | "triumph"
  | "gasgas"
  | "beta";

export type AppearancePreference = "light" | "dark" | "system";

export type ResolvedAppearance = "light" | "dark";

/**
 * Semantic tokens → CSS custom properties on `:root`.
 * Names mirror `globals.css` so layouts and Tailwind `var(--*)` stay aligned.
 */
export type ThemeTokens = {
  background: string;
  foreground: string;
  text: string;
  secondaryText: string;
  link: string;
  accent: string;
  tagCardBg: string;
  tagDescText: string;
  tagBorderInitial: string;
  /** Focus rings / picker selection (derived, still OEM-aware) */
  ring: string;
};

export type OemThemeDefinition = {
  id: BrandId;
  /** Title case for UI */
  label: string;
  /** 2026 SX manufacturer points order; 0 = site default */
  standingRank: number;
  /** Primary racing color for swatches / command palette */
  swatch: string;
  /**
   * Second color for the theme-picker diagonal swatch when `accent` matches
   * `swatch` in a mode (e.g. Husqvarna dark) or when accent is too close to the
   * primary (e.g. Yamaha dark blues).
   */
  commandPaletteSecondary?: string;
  /** Fed into cmdk filter with `label` — aliases and color words users might type */
  searchTerms: string[];
  light: ThemeTokens;
  dark: ThemeTokens;
};
