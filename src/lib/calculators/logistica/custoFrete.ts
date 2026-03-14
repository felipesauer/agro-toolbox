import { round } from "@/lib/utils";

export interface CustoFreteInput {
  distanciaKm: number;
  valorFretePorKm: number;
  pesoTotalKg: number;
  pedagios?: number;
  custoSeguro?: number;
}

export function calcularCustoFrete({
  distanciaKm,
  valorFretePorKm,
  pesoTotalKg,
  pedagios = 0,
  custoSeguro = 0,
}: CustoFreteInput) {
  const frete = distanciaKm * valorFretePorKm;
  const custoTotal = frete + pedagios + custoSeguro;
  const pesoToneladas = pesoTotalKg / 1000;
  const sacas60 = pesoTotalKg / 60;

  return {
    distanciaKm,
    pesoTotalKg,
    custoTotal: round(custoTotal, 2),
    custoPorTonelada: pesoToneladas > 0 ? round(custoTotal / pesoToneladas, 2) : 0,
    custoPorSaca60kg: sacas60 > 0 ? round(custoTotal / sacas60, 2) : 0,
    composicao: {
      frete: round(frete, 2),
      pedagios: round(pedagios, 2),
      seguro: round(custoSeguro, 2),
    },
  };
}
