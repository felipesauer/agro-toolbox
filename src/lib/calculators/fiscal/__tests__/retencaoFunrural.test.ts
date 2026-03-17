import { describe, it, expect } from "vitest";
import { calcularRetencaoFunrural } from "@/lib/calculators/fiscal/retencaoFunrural";

describe("calcularRetencaoFunrural", () => {
  it("calculates PF retention correctly", () => {
    const result = calcularRetencaoFunrural({
      valorBruto: 100000,
      tipoPessoa: "PF",
    });

    expect(result.funrural).toBe(1200); // 1.2%
    expect(result.rat).toBe(100); // 0.1%
    expect(result.senar).toBe(200); // 0.2%
    expect(result.totalRetido).toBe(1500); // 1.5%
    expect(result.valorLiquido).toBe(98500);
  });

  it("calculates PJ retention correctly", () => {
    const result = calcularRetencaoFunrural({
      valorBruto: 100000,
      tipoPessoa: "PJ",
    });

    expect(result.funrural).toBe(1500); // 1.5%
    expect(result.rat).toBe(300); // 0.3%
    expect(result.senar).toBe(250); // 0.25%
    expect(result.totalRetido).toBe(2050); // 2.05%
    expect(result.valorLiquido).toBe(97950);
  });

  it("returns zero retention for folha opt-in", () => {
    const result = calcularRetencaoFunrural({
      valorBruto: 100000,
      tipoPessoa: "PF",
      optanteFolha: true,
    });

    expect(result.totalRetido).toBe(0);
    expect(result.valorLiquido).toBe(100000);
    expect(result.optanteFolha).toBe(true);
  });
});
