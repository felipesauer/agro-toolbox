import { round } from '../utils/formatters.js';

export function calcularCustoFrete({ distanciaKm, valorFretePorKm, pesoTotalKg, pedagios = 0, custoSeguro = 0 }) {
  const frete = distanciaKm * valorFretePorKm;
  const custoTotal = frete + pedagios + custoSeguro;
  const pesoToneladas = pesoTotalKg / 1000;
  const custoPorTonelada = custoTotal / pesoToneladas;
  const custoPorSaca60kg = custoTotal / (pesoTotalKg / 60);

  return {
    distanciaKm,
    pesoTotalKg,
    custoTotal: round(custoTotal, 2),
    custoPorTonelada: round(custoPorTonelada, 2),
    custoPorSaca60kg: round(custoPorSaca60kg, 2),
    composicao: {
      frete: round(frete, 2),
      pedagios: round(pedagios, 2),
      seguro: round(custoSeguro, 2),
    },
  };
}
