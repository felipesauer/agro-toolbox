import { describe, it, expect } from "vitest";
import { converterMedidas } from "@/lib/calculators/agro/conversorMedidas";

describe("converterMedidas", () => {
  it("converts hectares to alqueire paulista", () => {
    const result = converterMedidas({
      valor: 1,
      de: "hectare",
      para: "alqueire_sp",
    });

    // 1 hectare = 10,000 m2, alqueire paulista = 24,200 m2
    expect(result.resultado).toBeCloseTo(0.4132, 3);
  });

  it("converts same unit to same unit", () => {
    const result = converterMedidas({
      valor: 100,
      de: "hectare",
      para: "hectare",
    });

    expect(result.resultado).toBe(100);
  });

  it("throws on unknown unit", () => {
    expect(() =>
      converterMedidas({
        valor: 1,
        de: "inexistente",
        para: "hectare",
      })
    ).toThrow("Unidade desconhecida");
  });

  it("includes m2 conversion", () => {
    const result = converterMedidas({
      valor: 2,
      de: "hectare",
      para: "acre",
    });

    expect(result.m2).toBe(20000); // 2 ha = 20,000 m2
  });
});
