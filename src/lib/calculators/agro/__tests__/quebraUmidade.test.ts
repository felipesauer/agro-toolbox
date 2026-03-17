import { describe, it, expect } from "vitest";
import { calcularQuebraUmidade } from "@/lib/calculators/agro/quebraUmidade";

describe("calcularQuebraUmidade", () => {
  it("calculates standard discount for soja above threshold", () => {
    const result = calcularQuebraUmidade({
      pesoBruto: 1000,
      umidadeRecebida: 16,
      impurezaRecebida: 2,
      cultura: "soja",
    });

    expect(result.pesoLiquido).toBeLessThan(1000);
    expect(result.kgDescontados).toBeGreaterThan(0);
    expect(result.umidadePadrao).toBe(14);
    expect(result.descontoUmidade).toBe(2); // (16-14)*1.0 = 2%
    expect(result.descontoImpureza).toBe(1); // (2-1)*1.0 = 1%
    expect(result.descontoTotal).toBe(3);
  });

  it("applies no discount when below threshold", () => {
    const result = calcularQuebraUmidade({
      pesoBruto: 1000,
      umidadeRecebida: 13,
      impurezaRecebida: 0.5,
      cultura: "soja",
    });

    expect(result.descontoUmidade).toBe(0);
    expect(result.descontoImpureza).toBe(0);
    expect(result.pesoLiquido).toBe(1000);
  });

  it("throws on unknown culture", () => {
    expect(() =>
      calcularQuebraUmidade({
        pesoBruto: 1000,
        umidadeRecebida: 15,
        impurezaRecebida: 1,
        cultura: "inexistente",
      })
    ).toThrow("Cultura desconhecida");
  });

  it("supports progressive discount", () => {
    const result = calcularQuebraUmidade({
      pesoBruto: 1000,
      umidadeRecebida: 20,
      impurezaRecebida: 1,
      cultura: "soja",
      descontoProgressivo: true,
    });

    // 20% - 14% = 6% excess. faixa1 = 3*1.0*1.0 = 3, faixa2 = 3*1.5*1.0 = 4.5, total = 7.5
    expect(result.descontoUmidade).toBe(7.5);
    expect(result.descontoProgressivo).toBe(true);
  });
});
