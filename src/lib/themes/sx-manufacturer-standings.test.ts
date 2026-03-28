import { describe, expect, it } from "vitest";

import { BRAND_IDS_ALPHABETICAL } from "./oem-palettes";
import {
  buildManufacturerStandingsPayload,
  parseManufacturerStandingsOrder,
} from "./sx-manufacturer-standings";

function resultItem(slug: string) {
  return `<div class="result-item"><div class="wrapper"><div class="info"><div class="rider-name">${slug}</div></div></div></div>`;
}

function manufacturerRow(slugs: string[]) {
  return `<div class="results-row" data-class="manufacturer"><div class="results-items-wrapper">${slugs.map(resultItem).join("")}</div></div>`;
}

/** Matches typical Supercross Live order (not alphabetical). */
const SAMPLE_STANDINGS_ORDER = [
  "yamaha",
  "honda",
  "kawasaki",
  "ktm",
  "husqvarna",
  "suzuki",
  "ducati",
  "triumph",
  "gasgas",
  "beta",
] as const;

describe("parseManufacturerStandingsOrder", () => {
  it("returns OEM ids in DOM order", () => {
    const html = manufacturerRow([...SAMPLE_STANDINGS_ORDER]);
    expect(parseManufacturerStandingsOrder(html)).toEqual([
      ...SAMPLE_STANDINGS_ORDER,
    ]);
  });

  it("returns empty array when manufacturer row is missing", () => {
    expect(
      parseManufacturerStandingsOrder("<html><body></body></html>")
    ).toEqual([]);
  });
});

describe("buildManufacturerStandingsPayload", () => {
  it("marks supercrosslive when all OEMs are parsed from the row", () => {
    const html = manufacturerRow([...SAMPLE_STANDINGS_ORDER]);
    const p = buildManufacturerStandingsPayload(html, true);
    expect(p.source).toBe("supercrosslive");
    expect(p.order).toEqual([...SAMPLE_STANDINGS_ORDER]);
  });

  it("marks fallback when the row is incomplete (alphabetical tail used)", () => {
    const html = manufacturerRow([...SAMPLE_STANDINGS_ORDER].slice(0, 9));
    const p = buildManufacturerStandingsPayload(html, true);
    expect(p.source).toBe("fallback");
    expect(p.order.length).toBe(10);
    expect(new Set(p.order).size).toBe(10);
    expect(p.order.slice(0, 9)).toEqual(SAMPLE_STANDINGS_ORDER.slice(0, 9));
  });

  it("returns alphabetical order when fetch failed", () => {
    const p = buildManufacturerStandingsPayload(null, false);
    expect(p.source).toBe("fallback");
    expect(p.order).toEqual(BRAND_IDS_ALPHABETICAL);
  });
});
