"use client";

import { Command } from "cmdk";
import { type CSSProperties, useCallback, useEffect, useState } from "react";

import { parseManufacturerStandingsResponse } from "@/lib/themes/manufacturer-standings-api";
import {
  BRAND_IDS_ALPHABETICAL,
  commandItemSearchValue,
  OEM_THEMES,
} from "@/lib/themes/oem-palettes";
import type { BrandId, OemThemeDefinition } from "@/lib/themes/types";
import { useTheme } from "@/providers/theme";

function normalizeHex(color: string) {
  return color.trim().replace(/^#/, "").toLowerCase();
}

/** Diagonal split when racing accent ≠ primary swatch (e.g. Honda red / HRC blue). */
function commandPaletteSwatchStyle(
  def: OemThemeDefinition,
  mode: "light" | "dark"
): CSSProperties {
  const tokens = mode === "dark" ? def.dark : def.light;
  const primary = def.swatch;
  const secondary = def.commandPaletteSecondary ?? tokens.accent;
  if (normalizeHex(secondary) === normalizeHex(primary)) {
    return { backgroundColor: primary };
  }
  return {
    background: `linear-gradient(135deg, ${primary} 50%, ${secondary} 50%)`,
  };
}

/** Default row and OEM grid cells share the same hit target, padding, and type scale. */
const themePickerRowClass =
  "flex min-w-0 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[var(--text)] transition-[background-color] duration-150 ease-out hover:bg-[var(--foreground)]/[0.04] aria-selected:bg-[var(--tag-card-bg)] aria-selected:hover:bg-[var(--tag-card-bg)] aria-selected:outline-none";

const themePickerLabelClass =
  "min-w-0 flex-1 truncate text-left font-semibold leading-snug text-[var(--foreground)]";

const themePickerSwatchClass =
  "h-9 w-9 shrink-0 rounded-lg shadow-inner ring-1 ring-black/10 dark:ring-white/10";

/** Stable id for `aria-describedby` when the championship-order hint is visible. */
const OEM_STANDINGS_ORDER_HINT_ID = "oem-theme-standings-order-hint";

/** Mounts only while the modal is open so cmdk highlight initializes from `brand` each time. */
function ThemeCommandMenuOpen() {
  const { brand, setBrand, resolvedAppearance, closeThemeSelector } =
    useTheme();

  const [cmdkHighlight, setCmdkHighlight] = useState(() =>
    commandItemSearchValue(brand)
  );

  const [oemDisplayOrder, setOemDisplayOrder] = useState<BrandId[]>(
    BRAND_IDS_ALPHABETICAL
  );
  const [showChampionshipOrderHint, setShowChampionshipOrderHint] =
    useState(false);

  useEffect(() => {
    // Fetch once per dialog open; cancel on unmount or after 12s.
    const ac = new AbortController();
    const t = window.setTimeout(() => ac.abort(), 12_000);

    void (async () => {
      try {
        const res = await fetch("/api/manufacturer-standings", {
          signal: ac.signal,
        });
        if (!res.ok) return;
        const parsed = parseManufacturerStandingsResponse(await res.json());
        if (!parsed) return;
        setOemDisplayOrder(parsed.order);
        setShowChampionshipOrderHint(parsed.source === "supercrosslive");
      } catch {
        // Abort, network failure, or invalid JSON — keep alphabetical defaults.
      }
    })();

    return () => {
      window.clearTimeout(t);
      ac.abort();
    };
  }, []);

  const select = useCallback(
    (id: BrandId) => {
      setBrand(id);
      closeThemeSelector();
    },
    [setBrand, closeThemeSelector]
  );

  const defaultDef = OEM_THEMES.default;
  const defaultItemValue = commandItemSearchValue("default");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close theme menu"
        className="absolute inset-0 bg-[var(--foreground)]/20 backdrop-blur-sm"
        onClick={closeThemeSelector}
      />
      <Command
        role="dialog"
        aria-modal="true"
        aria-label="Choose a bike brand reading theme for Table Over Two, or neutral"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-[var(--tag-border-initial)] bg-[var(--background)] shadow-2xl"
        label="Search for your favorite bike brand"
        value={cmdkHighlight}
        onValueChange={setCmdkHighlight}
      >
        <div className="border-b border-[var(--tag-border-initial)] px-2.5 py-2.5 sm:px-3">
          <Command.Input
            placeholder="Search for your favorite bike brand"
            className="w-full border-0 bg-transparent py-0.5 text-base leading-snug text-[var(--text)] outline-none placeholder:text-[var(--secondary-text)]"
            autoFocus
          />
        </div>
        <Command.List
          label="Default and manufacturer reading themes"
          className="max-h-[min(70dvh,440px)] overflow-y-auto p-2.5"
        >
          <Command.Empty className="px-2 py-6 text-center text-sm text-[var(--secondary-text)]">
            Nothing matches—try another spelling or nickname.
          </Command.Empty>
          <Command.Group value="default-reading-theme" className="mb-2">
            <Command.Item
              value={defaultItemValue}
              onSelect={() => select("default")}
              className={themePickerRowClass}
            >
              <span
                className={themePickerSwatchClass}
                style={commandPaletteSwatchStyle(
                  defaultDef,
                  resolvedAppearance
                )}
                aria-hidden
              />
              <span className={themePickerLabelClass}>{defaultDef.label}</span>
              {brand === "default" ? (
                <span className="shrink-0 text-xs font-semibold text-[var(--link)]">
                  Active
                </span>
              ) : null}
            </Command.Item>
          </Command.Group>
          {showChampionshipOrderHint ? (
            <p
              id={OEM_STANDINGS_ORDER_HINT_ID}
              className="mb-2 px-2 text-xs leading-snug text-[var(--secondary-text)]"
            >
              Manufacturer themes are listed here in current championship order.
            </p>
          ) : null}
          <Command.Group
            value="oem-themes"
            aria-describedby={
              showChampionshipOrderHint
                ? OEM_STANDINGS_ORDER_HINT_ID
                : undefined
            }
            className="[&_[cmdk-group-items]]:grid [&_[cmdk-group-items]]:grid-cols-2 [&_[cmdk-group-items]]:gap-2"
          >
            {oemDisplayOrder.map((id) => {
              const def = OEM_THEMES[id];
              const itemValue = commandItemSearchValue(id);
              const selected = brand === id;
              return (
                <Command.Item
                  key={id}
                  value={itemValue}
                  onSelect={() => select(id)}
                  className={themePickerRowClass}
                >
                  <span
                    className={themePickerSwatchClass}
                    style={commandPaletteSwatchStyle(def, resolvedAppearance)}
                    aria-hidden
                  />
                  <span className={themePickerLabelClass}>{def.label}</span>
                  {selected ? (
                    <span className="shrink-0 text-xs font-semibold text-[var(--link)]">
                      Active
                    </span>
                  ) : null}
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

export function ThemeCommandMenu() {
  const { themeSelectorOpen, closeThemeSelector, toggleThemeSelector } =
    useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        if (!themeSelectorOpen) {
          const t = e.target as HTMLElement | null;
          if (
            t &&
            (t.tagName === "INPUT" ||
              t.tagName === "TEXTAREA" ||
              t.tagName === "SELECT" ||
              t.isContentEditable)
          ) {
            return;
          }
        }
        e.preventDefault();
        toggleThemeSelector();
      }
      if (e.key === "Escape" && themeSelectorOpen) {
        e.preventDefault();
        closeThemeSelector();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [themeSelectorOpen, closeThemeSelector, toggleThemeSelector]);

  if (!themeSelectorOpen) return null;

  return <ThemeCommandMenuOpen />;
}
