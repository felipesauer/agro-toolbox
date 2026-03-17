import { describe, it, expect } from "vitest";
import { calcularPesoArroba } from "@/lib/calculators/pecuaria/pesoArroba";

describe("calcularPesoArroba", () => {
  it("calculates arrobas from live weight", () => {
    const result = calcularPesoArroba({
      pesoVivo: 500,
      rendimentoCarcaca: 52,
    });

    // 500 * 52% = 260kg carcaça / 15 = 17.33@
    expect(result.pesoCarcaca).toBe(260);
    expect(result.arrobas).toBeCloseTo(17.33, 1);
  });

  it("uses default 50% yield", () => {
    const result = calcularPesoArroba({ pesoVivo: 450 });

    expect(result.rendimentoCarcaca).toBe(50);
    expect(result.pesoCarcaca).toBe(225);
  });

  it("uses category-based yield", () => {
    const result = calcularPesoArroba({
      pesoVivo: 500,
      categoria: "boi_gordo",
    });

    expect(result.rendimentoCarcaca).toBe(52);
    expect(result.pesoCarcaca).toBe(260);
  });

  it("calculates total value when price provided", () => {
    const result = calcularPesoArroba({
      pesoVivo: 500,
      rendimentoCarcaca: 52,
      precoArroba: 320,
      numAnimais: 10,
    });

    expect(result.valorAnimal).toBeGreaterThan(0);
    expect(result.valorTotal).toBeCloseTo(result.valorAnimal! * 10, 0);
    expect(result.arrobasTotais).toBeCloseTo(result.arrobas * 10, 1);
  });
});
