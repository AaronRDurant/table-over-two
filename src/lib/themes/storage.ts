import { isBrandId } from "./oem-palettes";
import type { AppearancePreference, BrandId } from "./types";

export const STORAGE_BRAND = "tot-brand";
export const STORAGE_APPEARANCE = "tot-appearance";

const LEGACY_TEAM = "team";
const LEGACY_THEME = "theme";

export function readStoredBrand(): BrandId {
  if (typeof window === "undefined") return "default";
  try {
    const raw =
      localStorage.getItem(STORAGE_BRAND) ??
      localStorage.getItem(LEGACY_TEAM) ??
      "default";
    return isBrandId(raw) ? raw : "default";
  } catch {
    return "default";
  }
}

export function readStoredAppearance(): AppearancePreference {
  if (typeof window === "undefined") return "system";
  try {
    const raw =
      localStorage.getItem(STORAGE_APPEARANCE) ??
      localStorage.getItem(LEGACY_THEME) ??
      "system";
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
    return "system";
  } catch {
    return "system";
  }
}

export function persistTheme(brand: BrandId, appearance: AppearancePreference) {
  try {
    localStorage.setItem(STORAGE_BRAND, brand);
    localStorage.setItem(STORAGE_APPEARANCE, appearance);
    localStorage.removeItem(LEGACY_TEAM);
    localStorage.removeItem(LEGACY_THEME);
  } catch {
    /* private mode / quota */
  }
}
