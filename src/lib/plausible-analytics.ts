/**
 * Plausible (`pa-…` dashboard install). One entry point: `getPlausibleInjection()`.
 * Root layout should call it once and drive `<head>` + `PlausibleScript` from the
 * result so gating never diverges between bootstrap and loader.
 *
 * Site name in Plausible: `tableovertwo.com` (no scheme/www). Loader URL: update
 * `PLAUSIBLE_SCRIPT_SRC` if Plausible rotates it.
 *
 * Runs only when `NODE_ENV === "production"` and `VERCEL_ENV` is not `preview` or
 * `development`. Local `next start` is still production and can send real events.
 *
 * SPA: default `plausible.init()` uses History API pageviews (pushState); see
 * https://plausible.io/docs/script-extensions
 */
export const PLAUSIBLE_SCRIPT_SRC =
  "https://plausible.io/js/pa-mAyluEu4rIJEBzY2vpQ8v.js";

/** Inline bootstrap from the dashboard (no `<script>` wrapper). Must run before the loader. */
export const PLAUSIBLE_INLINE_INIT = `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()`;

export type PlausibleInjection = {
  readonly inlineInit: string;
  readonly scriptSrc: string;
};

function isValidHttpsScriptSrc(src: string): boolean {
  try {
    const u = new URL(src);
    return u.protocol === "https:" && u.hostname.length > 0;
  } catch {
    return false;
  }
}

/** True when this build may load third-party analytics (env only). */
export function shouldLoadPlausible(): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  if (process.env.VERCEL_ENV === "preview") return false;
  if (process.env.VERCEL_ENV === "development") return false;
  return true;
}

/** True when bootstrap + loader should be rendered (env + valid config). */
export function shouldInjectPlausible(): boolean {
  return getPlausibleInjection() !== null;
}

/**
 * Resolved install payload, or `null` when analytics is off or misconfigured.
 * Call once per request in the root layout.
 */
export function getPlausibleInjection(): PlausibleInjection | null {
  if (!shouldLoadPlausible()) return null;
  if (!PLAUSIBLE_INLINE_INIT.trim()) return null;
  if (!isValidHttpsScriptSrc(PLAUSIBLE_SCRIPT_SRC)) return null;
  return {
    inlineInit: PLAUSIBLE_INLINE_INIT,
    scriptSrc: PLAUSIBLE_SCRIPT_SRC,
  };
}
