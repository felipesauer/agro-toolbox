import { round } from '../utils/formatters.js';

export function calcularCalagem({ ctc, saturacaoAtual, saturacaoDesejada, prnt }) {
  if (saturacaoAtual >= saturacaoDesejada) {
    return {
      ctc,
      saturacaoAtual,
      saturacaoDesejada,
      prnt,
      necessidadeCalcario: 0,
      formula: 'V1 já está acima de V2 — não é necessária calagem',
    };
  }

  // NC (t/ha) = (V2 - V1) × T / 100 / (PRNT/100)
  const nc = ((saturacaoDesejada - saturacaoAtual) * ctc) / 100 / (prnt / 100);

  return {
    ctc,
    saturacaoAtual,
    saturacaoDesejada,
    prnt,
    necessidadeCalcario: round(nc, 2),
    formula: `(${saturacaoDesejada} - ${saturacaoAtual}) × ${ctc} / 100 / (${prnt}/100) = ${round(nc, 2)} t/ha`,
  };
}
