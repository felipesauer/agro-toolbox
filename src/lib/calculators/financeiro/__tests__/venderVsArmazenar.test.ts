import { describe, it, expect } from "vitest";
import { calcularVenderVsArmazenar } from "@/lib/calculators/financeiro/venderVsArmazenar";

describe("calcularVenderVsArmazenar", () => {
  it("calculates storage cost correctly (quantity × rate × months)", () => {
    const result = calcularVenderVsArmazenar({
      quantidade: 5000,
      precoAtual: 120,
      precoFuturo: 135,
      mesesArmazenagem: 4,
      custoArmazenagemMes: 3.5,
    });

    // Storage cost: 3.5 * 5000 * 4 = 70,000
    expect(result.detalhamento.custoArmazenagem).toBe(70000);
    expect(result.receitaVendaImediata).toBe(600000); // 5000 * 120
    expect(result.receitaArmazenagem).toBe(675000); // 5000 * 135
  });

  it("recommends selling when storage is too expensive", () => {
    const result = calcularVenderVsArmazenar({
      quantidade: 5000,
      precoAtual: 120,
      precoFuturo: 121,
      mesesArmazenagem: 6,
      custoArmazenagemMes: 5,
    });

    expect(result.recomendacao).toBe("Vender agora na colheita");
  });

  it("recommends storing when profitable", () => {
    const result = calcularVenderVsArmazenar({
      quantidade: 1000,
      precoAtual: 100,
      precoFuturo: 200,
      mesesArmazenagem: 2,
      custoArmazenagemMes: 1,
    });

    expect(result.recomendacao).toBe("Armazenar e vender depois");
  });

  it("calculates break-even price", () => {
    const result = calcularVenderVsArmazenar({
      quantidade: 1000,
      precoAtual: 100,
      precoFuturo: 120,
      mesesArmazenagem: 3,
      custoArmazenagemMes: 2,
    });

    expect(result.precoEquilibrio).toBeGreaterThan(100);
  });

  it("handles zero quantity gracefully", () => {
    const result = calcularVenderVsArmazenar({
      quantidade: 0,
      precoAtual: 100,
      precoFuturo: 120,
      mesesArmazenagem: 3,
      custoArmazenagemMes: 2,
    });

    expect(result.receitaVendaImediata).toBe(0);
  });
});
