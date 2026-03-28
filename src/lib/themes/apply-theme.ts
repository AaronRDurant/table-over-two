import { applyCssVarMap, tokensToCssVarMap } from "./css-vars";
import { OEM_THEMES } from "./oem-palettes";
import type {
  AppearancePreference,
  BrandId,
  ResolvedAppearance,
} from "./types";

export function resolveAppearanceMode(
  preference: AppearancePreference,
  systemIsDark: boolean
): ResolvedAppearance {
  if (preference === "system") return systemIsDark ? "dark" : "light";
  return preference;
}

export function applyBrandToRoot(
  root: HTMLElement,
  brand: BrandId,
  mode: ResolvedAppearance
): void {
  const def = OEM_THEMES[brand];
  const tokens = mode === "dark" ? def.dark : def.light;
  applyCssVarMap(root, tokensToCssVarMap(tokens));
  root.setAttribute("data-theme", mode);
  root.setAttribute("data-brand", brand);
}
