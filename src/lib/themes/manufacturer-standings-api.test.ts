import { describe, expect, it } from "vitest";

import { parseManufacturerStandingsResponse } from "./manufacturer-standings-api";
import { BRAND_IDS_ALPHABETICAL } from "./oem-palettes";

describe("parseManufacturerStandingsResponse", () => {
  const validOrder = [...BRAND_IDS_ALPHABETICAL];
  const base = {
    order: validOrder,
    fetchedAt: "2026-01-01T00:00:00.000Z",
  };

  it("accepts a well-formed fallback payload", () => {
    const p = parseManufacturerStandingsResponse({
      ...base,
      source: "fallback",
    });
    expect(p).not.toBeNull();
    expect(p!.source).toBe("fallback");
    expect(p!.order).toEqual(validOrder);
  });

  it("accepts supercrosslive when shape is valid", () => {
    const p = parseManufacturerStandingsResponse({
      ...base,
      source: "supercrosslive",
    });
    expect(p).not.toBeNull();
    expect(p!.source).toBe("supercrosslive");
  });

  it("rejects unknown source strings", () => {
    expect(
      parseManufacturerStandingsResponse({
        ...base,
        source: "other",
      })
    ).toBeNull();
  });

  it("rejects duplicate OEM ids in order", () => {
    const dup = [...validOrder];
    dup[1] = dup[0];
    expect(
      parseManufacturerStandingsResponse({
        order: dup,
        source: "supercrosslive",
        fetchedAt: "2026-01-01T00:00:00.000Z",
      })
    ).toBeNull();
  });

  it("rejects truncated fetchedAt", () => {
    expect(
      parseManufacturerStandingsResponse({
        ...base,
        fetchedAt: "short",
      })
    ).toBeNull();
  });
});
