import { round } from '../utils/formatters.js';

export function calcularQuebraFrete({ pesoOrigem, pesoDestino, tolerancia = 0.25, tipoCarga, precoUnitario }) {
  const toleranciaDecimal = tolerancia / 100;
  const pesoMinimoEsperado = pesoOrigem * (1 - toleranciaDecimal);
  const quebraReal = pesoOrigem - pesoDestino;
  const quebraPercentual = (quebraReal / pesoOrigem) * 100;
  const quebraExcedente = Math.max(0, quebraReal - (pesoOrigem * toleranciaDecimal));
  const dentroTolerancia = quebraPercentual <= tolerancia;

  const result = {
    pesoOrigem,
    pesoDestino,
    tolerancia,
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

  return result;
}
