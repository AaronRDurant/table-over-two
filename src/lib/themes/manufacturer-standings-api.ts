import { BRAND_IDS_ALPHABETICAL, isBrandId } from "./oem-palettes";
import type { BrandId } from "./types";

/** Types and response validation for `/api/manufacturer-standings` (safe to import in client components). */

export type SxStandingsSource = "supercrosslive" | "fallback";

export type ManufacturerStandingsPayload = {
  order: BrandId[];
  source: SxStandingsSource;
  /** ISO 8601 timestamp from the server when the payload was built. */
  fetchedAt: string;
};

export function isValidOemOrderPermutation(
  candidate: unknown
): candidate is BrandId[] {
  if (
    !Array.isArray(candidate) ||
    candidate.length !== BRAND_IDS_ALPHABETICAL.length
  ) {
    return false;
  }
  const expected = new Set(BRAND_IDS_ALPHABETICAL);
  const seen = new Set<BrandId>();
  for (const id of candidate) {
    if (typeof id !== "string" || !isBrandId(id) || id === "default") {
      return false;
    }
    if (!expected.has(id) || seen.has(id)) {
      return false;
    }
    seen.add(id);
  }
  return seen.size === expected.size;
}

function isSxStandingsSource(x: unknown): x is SxStandingsSource {
  return x === "supercrosslive" || x === "fallback";
}

/** Returns a typed payload or `null` if the body fails validation. */
export function parseManufacturerStandingsResponse(
  data: unknown
): ManufacturerStandingsPayload | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (!isValidOemOrderPermutation(d.order)) return null;
  if (!isSxStandingsSource(d.source)) return null;
  // Loose length check: reject obvious garbage without parsing ISO dates.
  if (typeof d.fetchedAt !== "string" || d.fetchedAt.length < 10) return null;
  return {
    order: d.order,
    source: d.source,
    fetchedAt: d.fetchedAt,
  };
}
