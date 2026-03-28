"use client";

import {
  ChevronRightIcon,
  MoonIcon as MoonOutlineIcon,
  SunIcon as SunOutlineIcon,
} from "@heroicons/react/24/outline";
import {
  MoonIcon as MoonSolidIcon,
  SunIcon as SunSolidIcon,
} from "@heroicons/react/24/solid";

import { OEM_THEMES } from "@/lib/themes/oem-palettes";
import { useTheme } from "@/providers/theme";

const glyphEase = "duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]";
const glyphTransition = `transition-[opacity,transform] ${glyphEase} motion-reduce:transition-opacity motion-reduce:duration-200`;

export function ThemeSidebarSection() {
  const {
    brand,
    appearance,
    setAppearance,
    systemIsDark,
    themeSelectorOpen,
    openThemeSelector,
    prefsReady,
  } = useTheme();

  const activeDef = OEM_THEMES[brand];
  const lightActive =
    appearance === "light" || (appearance === "system" && !systemIsDark);
  const darkActive =
    appearance === "dark" || (appearance === "system" && systemIsDark);

  const appearanceBtnBase =
    "flex min-h-11 w-full select-none items-center justify-center gap-2 py-3 text-sm transition-[color,background-color,font-weight] motion-reduce:transition-colors focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)] active:bg-[var(--foreground)]/[0.05]";
  const appearanceInactive =
    "bg-transparent font-normal text-[var(--secondary-text)] hover:bg-[var(--foreground)]/[0.04]";
  const appearanceActive =
    "bg-transparent font-semibold text-[var(--foreground)]";
  const kbdChip =
    "inline-flex h-6 shrink-0 items-center justify-center gap-0.5 rounded border border-[var(--tag-border-initial)] bg-[var(--background)] px-1.5 font-sans text-xs shadow-sm";
  const kbdChipMono =
    "inline-flex h-6 shrink-0 items-center justify-center rounded border border-[var(--tag-border-initial)] bg-[var(--background)] px-1.5 font-mono text-xs font-semibold shadow-sm";

  if (!prefsReady) {
    return (
      <div className="mt-8 w-full min-w-0" aria-busy="true">
        <span className="sr-only">Loading theme settings</span>
        <ThemeSidebarSkeleton />
      </div>
    );
  }

  return (
    <div className="mt-8 w-full min-w-0">
      <section className="w-full min-w-0" aria-labelledby="theme-sidebar-title">
        <h2 id="theme-sidebar-title" className="sr-only">
          Reading theme
        </h2>
        <div className="w-full min-w-0 overflow-hidden rounded-xl border border-[var(--tag-border-initial)] bg-[var(--tag-card-bg)]">
          <div
            className="flex min-w-0 items-center gap-2.5 border-b border-[var(--tag-border-initial)] px-3 py-2.5"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">Active theme: </span>
            <span
              className="size-3 shrink-0 rounded-full ring-1 ring-[var(--tag-border-initial)] ring-offset-1 ring-offset-[var(--tag-card-bg)]"
              style={{ backgroundColor: activeDef.swatch }}
              aria-hidden
            />
            <span
              className="min-w-0 truncate text-base font-semibold leading-snug tracking-tight text-[var(--foreground)]"
              title={activeDef.label}
            >
              {activeDef.label}
            </span>
          </div>

          <button
            type="button"
            onClick={openThemeSelector}
            aria-expanded={themeSelectorOpen}
            aria-haspopup="dialog"
            aria-label="Browse reading themes"
            aria-keyshortcuts="Meta+K Control+K"
            title="Browse reading themes (⌘K or Ctrl+K)"
            className={`group flex w-full min-w-0 flex-col items-stretch gap-0 border-b border-[var(--tag-border-initial)] px-3 py-3 text-left transition-colors hover:bg-[var(--foreground)]/[0.04] active:bg-[var(--foreground)]/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)] motion-reduce:transition-none lg:gap-2 ${
              themeSelectorOpen ? "bg-[var(--foreground)]/[0.06]" : ""
            }`}
          >
            <span className="flex min-w-0 items-center justify-between gap-3">
              <span className="text-base font-semibold leading-snug tracking-tight text-[var(--foreground)]">
                Browse themes
              </span>
              <ChevronRightIcon
                className="size-5 shrink-0 text-[var(--link)] opacity-90 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                strokeWidth={2}
                aria-hidden
              />
            </span>
            <span
              className="hidden min-w-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block"
              aria-hidden
            >
              <span className="inline-flex flex-nowrap items-center gap-x-1 whitespace-nowrap text-sm leading-none text-[var(--secondary-text)]">
                <span>Or press</span>
                <kbd className={kbdChip}>
                  <span className="text-sm leading-none">⌘</span>
                  <span className="font-mono font-semibold leading-none">
                    K
                  </span>
                </kbd>
                <span className="leading-none">or</span>
                <kbd className={kbdChipMono}>Ctrl K</kbd>
              </span>
            </span>
          </button>

          <div
            className="grid min-w-0 grid-cols-2 border-t border-[var(--tag-border-initial)]"
            role="group"
            aria-label="Light or dark appearance"
          >
            <button
              type="button"
              onClick={() => setAppearance("light")}
              className={`${appearanceBtnBase} rounded-bl-xl border-r border-[var(--tag-border-initial)] ${lightActive ? appearanceActive : appearanceInactive}`}
              aria-pressed={lightActive}
            >
              <ToggleSunGlyph active={lightActive} />
              Light
            </button>
            <button
              type="button"
              onClick={() => setAppearance("dark")}
              className={`${appearanceBtnBase} rounded-br-xl ${darkActive ? appearanceActive : appearanceInactive}`}
              aria-pressed={darkActive}
            >
              <ToggleMoonGlyph active={darkActive} />
              Dark
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Outline when idle, solid when selected — crossfade + subtle scale (respects reduced motion). */
function ToggleSunGlyph({ active }: { active: boolean }) {
  return (
    <span className="relative size-5 shrink-0 text-current" aria-hidden>
      <SunOutlineIcon
        className={`absolute inset-0 ${glyphTransition} motion-safe:origin-center ${
          active
            ? "opacity-0 motion-safe:scale-[0.65]"
            : "opacity-[0.45] motion-safe:scale-100"
        }`}
      />
      <SunSolidIcon
        className={`absolute inset-0 ${glyphTransition} motion-safe:origin-center ${
          active
            ? "opacity-100 motion-safe:scale-105"
            : "opacity-0 motion-safe:scale-95"
        }`}
      />
    </span>
  );
}

function ToggleMoonGlyph({ active }: { active: boolean }) {
  return (
    <span className="relative size-5 shrink-0 text-current" aria-hidden>
      <MoonOutlineIcon
        className={`absolute inset-0 ${glyphTransition} motion-safe:origin-center ${
          active
            ? "opacity-0 motion-safe:scale-[0.65]"
            : "opacity-[0.45] motion-safe:scale-100"
        }`}
      />
      <MoonSolidIcon
        className={`absolute inset-0 ${glyphTransition} motion-safe:origin-center ${
          active
            ? "opacity-100 motion-safe:scale-105"
            : "opacity-0 motion-safe:scale-95"
        }`}
      />
    </span>
  );
}

function ThemeSidebarSkeleton() {
  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-xl border border-[var(--tag-border-initial)] bg-[var(--tag-card-bg)]"
      aria-hidden
    >
      <div className="flex items-center gap-2.5 border-b border-[var(--tag-border-initial)] px-3 py-2.5">
        <div className="size-3 shrink-0 rounded-full bg-[var(--foreground)]/15" />
        <div className="h-4 w-24 max-w-full rounded bg-[var(--foreground)]/10" />
      </div>
      <div className="flex flex-col gap-0 border-b border-[var(--tag-border-initial)] px-3 py-3 lg:gap-2">
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-28 rounded bg-[var(--foreground)]/12" />
          <div className="size-5 shrink-0 rounded bg-[var(--foreground)]/10" />
        </div>
        <div className="hidden h-3.5 w-full max-w-xs rounded bg-[var(--foreground)]/08 lg:block" />
      </div>
      <div className="grid grid-cols-2 border-t border-[var(--tag-border-initial)]">
        <div className="h-11 rounded-bl-xl border-r border-[var(--tag-border-initial)] bg-[var(--foreground)]/06" />
        <div className="h-11 rounded-br-xl bg-[var(--foreground)]/06" />
      </div>
    </div>
  );
}
