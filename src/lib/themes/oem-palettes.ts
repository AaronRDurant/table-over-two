import type { BrandId, OemThemeDefinition, ThemeTokens } from "./types";

/**
 * OEM-inspired palettes. Anchors include prior Table Over Two values where they matched
 * factory livery language (Yamaha #0D47F7 / #0b39a0 + #95D600, HRC #0033A0 / #CC0000,
 * Kawasaki #95D600 / #6B9900, KTM #FF6600, Husqvarna #273A60 / #FFED00, GasGas #CB0D25 /
 * #CF9C43, Triumph #F0FF00 / #D4D700). Suzuki / Ducati / Beta unchanged from earlier pass.
 * Tuned for readable body text (accent = borders/scrollbars/structure; link = interactive).
 */

const defaultLight: ThemeTokens = {
  background: "#ffffff",
  foreground: "#181818",
  text: "#2c2c2c",
  secondaryText: "#575757",
  link: "#1e73e8",
  accent: "#cccccc",
  tagCardBg: "#f6f6f6",
  tagDescText: "#2c2c2c",
  tagBorderInitial: "#cccccc",
  ring: "#1e73e8",
};

const defaultDark: ThemeTokens = {
  background: "#1f1f1f",
  foreground: "#f9f9f9",
  text: "#cccccc",
  secondaryText: "#999999",
  link: "#3a8dff",
  accent: "#444444",
  tagCardBg: "#181818",
  tagDescText: "#cccccc",
  tagBorderInitial: "#555555",
  ring: "#3a8dff",
};

const yamahaLight: ThemeTokens = {
  background: "#f7faff",
  foreground: "#061426",
  text: "#152535",
  secondaryText: "#5a6b7d",
  link: "#0d47f7",
  accent: "#95d600",
  tagCardBg: "#e8f1fc",
  tagDescText: "#1a2f45",
  tagBorderInitial: "#b8cce8",
  ring: "#0d47f7",
};

const yamahaDark: ThemeTokens = {
  background: "#0c121c",
  foreground: "#e8f1ff",
  text: "#b4c5d9",
  secondaryText: "#7d8fa3",
  link: "#4185f4",
  accent: "#1e3d66",
  tagCardBg: "#121b2a",
  tagDescText: "#c8d6e8",
  tagBorderInitial: "#2a3f5c",
  ring: "#4185f4",
};

const hondaLight: ThemeTokens = {
  background: "#fffbfb",
  foreground: "#1a0c0c",
  text: "#2d1818",
  secondaryText: "#6b4e4e",
  link: "#cc0000",
  accent: "#0033a0",
  tagCardBg: "#fdeeee",
  tagDescText: "#2d1818",
  tagBorderInitial: "#c8d0e4",
  ring: "#cc0000",
};

const hondaDark: ThemeTokens = {
  background: "#140a0d",
  foreground: "#fff2f2",
  text: "#e0caca",
  secondaryText: "#a08085",
  link: "#ff6b6b",
  accent: "#4a6cb8",
  tagCardBg: "#1c1014",
  tagDescText: "#e8d4d4",
  tagBorderInitial: "#4a2830",
  ring: "#ff6b6b",
};

const kawasakiLight: ThemeTokens = {
  background: "#f8fff5",
  foreground: "#0f1f0c",
  text: "#1e3318",
  secondaryText: "#4d6645",
  link: "#6b9900",
  accent: "#95d600",
  tagCardBg: "#eef9e5",
  tagDescText: "#1e3318",
  tagBorderInitial: "#c5e085",
  ring: "#6b9900",
};

const kawasakiDark: ThemeTokens = {
  background: "#0d160f",
  foreground: "#efffe8",
  text: "#c5dcb8",
  secondaryText: "#7a9e6c",
  link: "#95d600",
  accent: "#4a7a0a",
  tagCardBg: "#121f14",
  tagDescText: "#d4e8c8",
  tagBorderInitial: "#355a30",
  ring: "#95d600",
};

const ktmLight: ThemeTokens = {
  background: "#fff9f5",
  foreground: "#1c0f08",
  text: "#3d2418",
  secondaryText: "#7a5c4a",
  link: "#ff6600",
  accent: "#ff6600",
  tagCardBg: "#fff0e5",
  tagDescText: "#3d2418",
  tagBorderInitial: "#f0c4a8",
  ring: "#ff6600",
};

const ktmDark: ThemeTokens = {
  background: "#160e09",
  foreground: "#fff4eb",
  text: "#dcc8b8",
  secondaryText: "#a08878",
  link: "#ff9933",
  accent: "#cc5200",
  tagCardBg: "#1f140e",
  tagDescText: "#ead8cc",
  tagBorderInitial: "#5c3d28",
  ring: "#ff9933",
};

const husqvarnaLight: ThemeTokens = {
  background: "#fffdf5",
  foreground: "#121820",
  text: "#1f2833",
  secondaryText: "#5a6570",
  link: "#273a60",
  accent: "#ffed00",
  tagCardBg: "#faf6e0",
  tagDescText: "#1f2833",
  tagBorderInitial: "#ddd4a8",
  ring: "#273a60",
};

const husqvarnaDark: ThemeTokens = {
  background: "#0e1118",
  foreground: "#fffce8",
  text: "#d2d0b8",
  secondaryText: "#8a8870",
  link: "#ffed00",
  accent: "#273a60",
  tagCardBg: "#151a24",
  tagDescText: "#e8e6d0",
  tagBorderInitial: "#3d4555",
  ring: "#ffed00",
};

const suzukiLight: ThemeTokens = {
  background: "#fffef6",
  foreground: "#1a1700",
  text: "#2d2808",
  secondaryText: "#6b6340",
  link: "#003b9e",
  accent: "#e8cf00",
  tagCardBg: "#faf6d8",
  tagDescText: "#2d2808",
  tagBorderInitial: "#e0d080",
  ring: "#003b9e",
};

const suzukiDark: ThemeTokens = {
  background: "#141204",
  foreground: "#fffadc",
  text: "#d8d0a0",
  secondaryText: "#9a9260",
  link: "#7eb6ff",
  accent: "#a89000",
  tagCardBg: "#1c1a08",
  tagDescText: "#ece4b8",
  tagBorderInitial: "#4a4520",
  ring: "#e8cf00",
};

const ducatiLight: ThemeTokens = {
  background: "#fffafa",
  foreground: "#240406",
  text: "#3a0c10",
  secondaryText: "#7a5058",
  link: "#a01018",
  accent: "#cb1517",
  tagCardBg: "#fdecec",
  tagDescText: "#3a0c10",
  tagBorderInitial: "#ebb8bc",
  ring: "#cb1517",
};

const ducatiDark: ThemeTokens = {
  background: "#120506",
  foreground: "#ffecec",
  text: "#e0b8bc",
  secondaryText: "#a07078",
  link: "#ff6b72",
  accent: "#7a1018",
  tagCardBg: "#1a080a",
  tagDescText: "#f0d0d4",
  tagBorderInitial: "#4a2028",
  ring: "#ff6b72",
};

const triumphLight: ThemeTokens = {
  background: "#fafaf6",
  foreground: "#0a0a0a",
  text: "#222220",
  secondaryText: "#5c5c58",
  link: "#000000",
  accent: "#d4d700",
  tagCardBg: "#f4f5dc",
  tagDescText: "#222220",
  tagBorderInitial: "#d0d88a",
  ring: "#d4d700",
};

const triumphDark: ThemeTokens = {
  background: "#0a0a0a",
  foreground: "#f5f5f0",
  text: "#c8c8c0",
  secondaryText: "#888880",
  link: "#f0ff00",
  accent: "#9ea600",
  tagCardBg: "#121210",
  tagDescText: "#d8d8d0",
  tagBorderInitial: "#3a3a35",
  ring: "#f0ff00",
};

const gasgasLight: ThemeTokens = {
  background: "#fff9f8",
  foreground: "#2a0c0a",
  text: "#401818",
  secondaryText: "#785858",
  link: "#cb0d25",
  accent: "#cf9c43",
  tagCardBg: "#fde8e6",
  tagDescText: "#401818",
  tagBorderInitial: "#e8c9a0",
  ring: "#cb0d25",
};

const gasgasDark: ThemeTokens = {
  background: "#160807",
  foreground: "#ffeae8",
  text: "#e0c0bc",
  secondaryText: "#988078",
  link: "#ff7a6e",
  accent: "#b8893a",
  tagCardBg: "#1e0c0a",
  tagDescText: "#f0d4d0",
  tagBorderInitial: "#4a2824",
  ring: "#ff7a6e",
};

const betaLight: ThemeTokens = {
  background: "#faf8f8",
  foreground: "#1a1010",
  text: "#2d2020",
  secondaryText: "#6b5558",
  link: "#9e1828",
  accent: "#b0102b",
  tagCardBg: "#f5eaea",
  tagDescText: "#2d2020",
  tagBorderInitial: "#e0b8c0",
  ring: "#b0102b",
};

const betaDark: ThemeTokens = {
  background: "#100c0c",
  foreground: "#f5eaea",
  text: "#d8c8c8",
  secondaryText: "#908080",
  link: "#e85d70",
  accent: "#701824",
  tagCardBg: "#181212",
  tagDescText: "#e8d8d8",
  tagBorderInitial: "#402830",
  ring: "#e85d70",
};

export const OEM_THEMES: Record<BrandId, OemThemeDefinition> = {
  default: {
    id: "default",
    label: "Default",
    standingRank: 0,
    swatch: "#9ca3af",
    searchTerms: ["default", "neutral", "table over two"],
    light: defaultLight,
    dark: defaultDark,
  },
  yamaha: {
    id: "yamaha",
    label: "Yamaha",
    standingRank: 1,
    swatch: "#0b39a0",
    commandPaletteSecondary: "#95d600",
    searchTerms: ["yamaha", "blue", "yz", "blu cru"],
    light: yamahaLight,
    dark: yamahaDark,
  },
  honda: {
    id: "honda",
    label: "Honda",
    standingRank: 2,
    swatch: "#cc0000",
    searchTerms: ["honda", "hrc", "red", "crf"],
    light: hondaLight,
    dark: hondaDark,
  },
  kawasaki: {
    id: "kawasaki",
    label: "Kawasaki",
    standingRank: 3,
    swatch: "#95d600",
    searchTerms: ["kawasaki", "green", "kx", "lime"],
    light: kawasakiLight,
    dark: kawasakiDark,
  },
  ktm: {
    id: "ktm",
    label: "KTM",
    standingRank: 4,
    swatch: "#ff6600",
    searchTerms: ["ktm", "orange", "sx", "exc"],
    light: ktmLight,
    dark: ktmDark,
  },
  husqvarna: {
    id: "husqvarna",
    label: "Husqvarna",
    standingRank: 5,
    swatch: "#273a60",
    commandPaletteSecondary: "#ffed00",
    searchTerms: ["husqvarna", "husky", "yellow", "fc", "tc"],
    light: husqvarnaLight,
    dark: husqvarnaDark,
  },
  suzuki: {
    id: "suzuki",
    label: "Suzuki",
    standingRank: 6,
    swatch: "#e8cf00",
    searchTerms: ["suzuki", "yellow", "rm"],
    light: suzukiLight,
    dark: suzukiDark,
  },
  ducati: {
    id: "ducati",
    label: "Ducati",
    standingRank: 7,
    swatch: "#cb1517",
    searchTerms: ["ducati", "red", "desmo", "italian"],
    light: ducatiLight,
    dark: ducatiDark,
  },
  triumph: {
    id: "triumph",
    label: "Triumph",
    standingRank: 8,
    swatch: "#f0ff00",
    searchTerms: ["triumph", "yellow", "tf", "triple"],
    light: triumphLight,
    dark: triumphDark,
  },
  gasgas: {
    id: "gasgas",
    label: "GasGas",
    standingRank: 9,
    swatch: "#cb0d25",
    searchTerms: ["gasgas", "gas gas", "red", "mc", "ec"],
    light: gasgasLight,
    dark: gasgasDark,
  },
  beta: {
    id: "beta",
    label: "Beta",
    standingRank: 10,
    swatch: "#b0102b",
    searchTerms: ["beta", "rr", "enduro", "italian"],
    light: betaLight,
    dark: betaDark,
  },
};

export const ALL_BRAND_IDS = Object.keys(OEM_THEMES) as BrandId[];

/** Display label A–Z for command palette / ⌘K list (excludes default). */
export const BRAND_IDS_ALPHABETICAL: BrandId[] = (
  ALL_BRAND_IDS.filter((id) => id !== "default") as BrandId[]
).sort((a, b) =>
  OEM_THEMES[a].label.localeCompare(OEM_THEMES[b].label, "en", {
    sensitivity: "base",
  })
);

export function isBrandId(value: string): value is BrandId {
  return value in OEM_THEMES;
}

/** Cmdk `Command.Item` value — must stay in sync with filter scoring (label + search terms). */
export function commandItemSearchValue(id: BrandId): string {
  const def = OEM_THEMES[id];
  return `${def.label} ${def.searchTerms.join(" ")}`;
}
