import { describe, it, expect } from "vitest";
import { formatBRL, formatNumber, round, formatDate } from "@/lib/utils";

describe("formatBRL", () => {
  it("formats positive values", () => {
    expect(formatBRL(1234.56)).toBe("R$\u00A01.234,56");
  });

  it("formats zero", () => {
    expect(formatBRL(0)).toBe("R$\u00A00,00");
  });

  it("formats negative values", () => {
    expect(formatBRL(-500)).toBe("-R$\u00A0500,00");
  });
});

describe("formatNumber", () => {
  it("formats with default 2 decimals", () => {
    expect(formatNumber(1234.5)).toBe("1.234,50");
  });

  it("formats with custom decimals", () => {
    expect(formatNumber(1234.5678, 4)).toBe("1.234,5678");
  });
});

describe("round", () => {
  it("rounds to 2 decimal places by default", () => {
    expect(round(1.235)).toBe(1.24);
    expect(round(1.234)).toBe(1.23);
  });

  it("rounds to custom decimal places", () => {
    expect(round(1.2345, 3)).toBe(1.235);
    expect(round(1.2345, 0)).toBe(1);
  });

  it("handles zero", () => {
    expect(round(0)).toBe(0);
  });
});

describe("formatDate", () => {
  it("formats Date object", () => {
    const date = new Date(2026, 2, 17); // March 17, 2026
    expect(formatDate(date)).toBe("17/03/2026");
  });

  it("formats ISO string", () => {
    expect(formatDate("2026-03-17T12:00:00Z")).toMatch(/17\/03\/2026/);
  });
});
