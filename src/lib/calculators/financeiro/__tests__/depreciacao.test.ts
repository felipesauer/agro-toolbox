import { describe, it, expect } from "vitest";
import { calcularDepreciacao } from "@/lib/calculators/financeiro/depreciacao";

describe("calcularDepreciacao", () => {
  it("calculates linear depreciation", () => {
    const result = calcularDepreciacao({
      valorAquisicao: 120000,
      valorResidual: 20000,
      vidaUtilAnos: 10,
    });

    expect(result.depreciacaoAnual).toBe(10000);
    expect(result.depreciacaoMensal).toBeCloseTo(833.33, 1);
    expect(result.cronograma).toHaveLength(10);
  });

  it("calculates with custom years of use", () => {
    const result = calcularDepreciacao({
      valorAquisicao: 100000,
      valorResidual: 0,
      vidaUtilAnos: 10,
      anosUso: 5,
    });

    expect(result.acumulada).toBe(50000);
    expect(result.valorAtual).toBe(50000);
    expect(result.percentualDepreciado).toBe(50);
  });

  it("calculates hours-based depreciation", () => {
    const result = calcularDepreciacao({
      valorAquisicao: 200000,
      valorResidual: 20000,
      vidaUtilAnos: 10,
      metodo: "horas",
      horasVidaUtil: 10000,
      horasUso: 5000,
    });

    expect(result.metodo).toBe("horas");
    expect(result.taxaPorHora).toBe(18);
    expect(result.acumulada).toBe(90000);
    expect(result.valorAtual).toBe(110000);
  });

  it("never depreciates below residual value", () => {
    const result = calcularDepreciacao({
      valorAquisicao: 100000,
      valorResidual: 30000,
      vidaUtilAnos: 5,
      anosUso: 10,
    });

    expect(result.valorAtual).toBe(30000);
  });
});
