import { round } from '../utils/formatters.js';

// Tolerância padrão por tipo de carga (%)
const TOLERANCIAS_PADRAO = {
  graos: 0.25,
  liquidos: 0.30,
  fertilizantes: 0.50,
  pecuaria: 0.00,
};

export function calcularQuebraFrete({ pesoOrigem, pesoDestino, tolerancia, tipoCarga, precoUnitario, distanciaKm }) {
  const toleranciaFinal = tolerancia ?? TOLERANCIAS_PADRAO[tipoCarga] ?? 0.25;
  const toleranciaDecimal = toleranciaFinal / 100;
  const pesoMinimoEsperado = pesoOrigem * (1 - toleranciaDecimal);
  const quebraReal = pesoOrigem - pesoDestino;
  const quebraPercentual = (quebraReal / pesoOrigem) * 100;
  const quebraExcedente = Math.max(0, quebraReal - (pesoOrigem * toleranciaDecimal));
  const dentroTolerancia = quebraPercentual <= toleranciaFinal;

  const result = {
    pesoOrigem,
    pesoDestino,
    tolerancia: toleranciaFinal,
    tipoCarga,
    pesoMinimoEsperado: round(pesoMinimoEsperado, 2),
    quebraReal: round(quebraReal, 2),
    quebraPercentual: round(quebraPercentual, 2),
    quebraExcedente: round(quebraExcedente, 2),
    dentroTolerancia,
  };

  if (precoUnitario && quebraExcedente > 0) {
    result.valorPrejuizo = round(quebraExcedente * precoUnitario, 2);
  }

  if (distanciaKm) {
    const quebraEstimadaPorKm = quebraPercentual / distanciaKm;
    result.distanciaKm = distanciaKm;
    result.quebraPorKm = round(quebraEstimadaPorKm, 6);
    // Flag if atypical (>0.001% per km is suspicious)
    result.quebraAtipica = quebraEstimadaPorKm > 0.001;
  }

  return result;
}
