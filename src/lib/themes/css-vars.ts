import type { ThemeTokens } from "./types";

/** Flat map for boot script JSON: keys are literal CSS variable names. */
export type CssVarMap = Record<string, string>;

const KEYS: (keyof ThemeTokens)[] = [
  "background",
  "foreground",
  "text",
  "secondaryText",
  "link",
  "accent",
  "tagCardBg",
  "tagDescText",
  "tagBorderInitial",
  "ring",
];

export function tokensToCssVarMap(tokens: ThemeTokens): CssVarMap {
  const out: CssVarMap = {};
  for (const key of KEYS) {
    const cssName =
      key === "secondaryText"
        ? "--secondary-text"
        : key === "tagCardBg"
          ? "--tag-card-bg"
          : key === "tagDescText"
            ? "--tag-desc-text"
            : key === "tagBorderInitial"
              ? "--tag-border-initial"
              : (`--${key}` as const);
    out[cssName] = tokens[key];
  }
  return out;
}

export function applyCssVarMap(el: HTMLElement, map: CssVarMap): void {
  for (const [prop, value] of Object.entries(map)) {
    el.style.setProperty(prop, value);
  }
}
