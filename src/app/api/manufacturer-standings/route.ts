import { NextResponse } from "next/server";

import {
  buildManufacturerStandingsPayload,
  SUPERCROSSLIVE_CHAMPIONSHIP_STANDINGS_URL,
  SX_STANDINGS_FETCH_USER_AGENT,
  SX_STANDINGS_REVALIDATE_SECONDS,
} from "@/lib/themes/sx-manufacturer-standings";

/** Cheerio targets Node; avoid Edge where this route would fail at runtime. */
export const runtime = "nodejs";

const CACHE_CONTROL = `public, s-maxage=${SX_STANDINGS_REVALIDATE_SECONDS}, stale-while-revalidate=${86400}`;

/** GET only: OEM display order for the theme picker. Upstream HTML uses `fetch` + Next Data Cache (~7d). */
export async function GET() {
  let html: string | null = null;
  let ok = false;

  try {
    const res = await fetch(SUPERCROSSLIVE_CHAMPIONSHIP_STANDINGS_URL, {
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "User-Agent": SX_STANDINGS_FETCH_USER_AGENT,
      },
      next: { revalidate: SX_STANDINGS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(15_000),
    });
    ok = res.ok;
    if (res.ok) {
      html = await res.text();
    }
  } catch {
    ok = false;
  }

  const body = buildManufacturerStandingsPayload(html, ok);

  return NextResponse.json(body, {
    headers: { "Cache-Control": CACHE_CONTROL },
  });
}
