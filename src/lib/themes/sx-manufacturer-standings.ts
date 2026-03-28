import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";

import type { ManufacturerStandingsPayload } from "./manufacturer-standings-api";
import { BRAND_IDS_ALPHABETICAL, isBrandId } from "./oem-palettes";
import type { BrandId } from "./types";

export type { ManufacturerStandingsPayload } from "./manufacturer-standings-api";

/**
 * Parse public Supercross Live championship HTML for OEM list order (display only).
 * Unaffiliated with the series or OEMs; honor their terms. Revalidate cadence: `SX_STANDINGS_REVALIDATE_SECONDS`.
 */
export const SUPERCROSSLIVE_CHAMPIONSHIP_STANDINGS_URL =
  "https://www.supercrosslive.com/championship-standings/";

/** ~7 days — typical post-Saturday round refresh without hammering the source. */
export const SX_STANDINGS_REVALIDATE_SECONDS = 7 * 24 * 60 * 60;

export const SX_STANDINGS_FETCH_USER_AGENT =
  "TableOverTwo/1.0 (+https://www.tableovertwo.com; manufacturer-standings weekly cache)";

const EXPECTED_OEM_COUNT = BRAND_IDS_ALPHABETICAL.length;

/** Defensive cap if markup ever nests extra nodes. */
const MAX_RESULT_ITEMS = 32;

function compactSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function slugToOemBrandId(raw: string): BrandId | null {
  const key = compactSlug(raw);
  if (!key) return null;
  if (isBrandId(key) && key !== "default") return key;
  return null;
}

function extractSlugFromResultItem(
  $: cheerio.CheerioAPI,
  item: AnyNode
): string {
  const $item = $(item);
  const fromName = $item.find(".rider-name").first().text().trim();
  if (fromName) return fromName;
  return $item.find("img[alt]").first().attr("alt")?.trim() ?? "";
}

/**
 * Parses manufacturer row order from championship standings HTML.
 * Returns OEM `BrandId`s in page order (deduped); empty if structure is missing or unusable.
 */
export function parseManufacturerStandingsOrder(html: string): BrandId[] {
  const $ = cheerio.load(html);
  const row = $('.results-row[data-class="manufacturer"]').first();
  if (!row.length) return [];

  const out: BrandId[] = [];
  const seen = new Set<BrandId>();

  row.find(".results-items-wrapper > .result-item").each((i, el) => {
    if (i >= MAX_RESULT_ITEMS) return false;
    const slug = extractSlugFromResultItem($, el);
    const id = slugToOemBrandId(slug);
    if (id && !seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
    return undefined;
  });

  return out;
}

/**
 * Standings order first; any OEM missing from the feed is appended in existing A–Z palette order.
 */
export function mergeStandingsWithAlphabeticalTail(
  parsed: BrandId[],
  alphabetical: readonly BrandId[]
): BrandId[] {
  const seen = new Set<BrandId>();
  const merged: BrandId[] = [];

  for (const id of parsed) {
    if (!seen.has(id)) {
      seen.add(id);
      merged.push(id);
    }
  }
  for (const id of alphabetical) {
    if (!seen.has(id)) {
      seen.add(id);
      merged.push(id);
    }
  }

  return merged;
}

/** True when every OEM appeared once in the manufacturer row (no alphabetical tail merge). */
function isCompleteStandingsExtraction(
  parsed: BrandId[],
  expectedCount: number
): boolean {
  if (parsed.length !== expectedCount) return false;
  return new Set(parsed).size === expectedCount;
}

export function buildManufacturerStandingsPayload(
  html: string | null,
  fetchOk: boolean
): ManufacturerStandingsPayload {
  const fetchedAt = new Date().toISOString();
  const fallback: ManufacturerStandingsPayload = {
    order: [...BRAND_IDS_ALPHABETICAL],
    source: "fallback",
    fetchedAt,
  };

  if (!fetchOk || html == null || !html.trim()) {
    return fallback;
  }

  const parsed = parseManufacturerStandingsOrder(html);
  if (parsed.length === 0) {
    return fallback;
  }

  const order = mergeStandingsWithAlphabeticalTail(
    parsed,
    BRAND_IDS_ALPHABETICAL
  );

  if (order.length !== EXPECTED_OEM_COUNT) {
    return fallback;
  }

  const fromLiveTableOnly = isCompleteStandingsExtraction(
    parsed,
    EXPECTED_OEM_COUNT
  );

  return {
    order,
    source: fromLiveTableOnly ? "supercrosslive" : "fallback",
    fetchedAt,
  };
}
