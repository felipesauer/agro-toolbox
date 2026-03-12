import { round } from '../utils/formatters.js';

export function calcularCalagem({ ctc, saturacaoAtual, saturacaoDesejada, prnt, area = 1, metodo = 'saturacao_bases', gessagem = false, argila }) {
  if (saturacaoAtual >= saturacaoDesejada) {
    const result = {
      ctc,
      saturacaoAtual,
      saturacaoDesejada,
      prnt,
      area,
      metodo,
      necessidadeCalcario: 0,
      totalCalcario: 0,
      formula: 'V1 já está acima de V2 — não é necessária calagem',
    };
    if (gessagem && argila) {
      result.gessagem = calcularGessagem(argila, area);
    }
    return result;
  }

  // NC (t/ha) = (V2 - V1) × T / 100 / (PRNT/100)
  const nc = ((saturacaoDesejada - saturacaoAtual) * ctc) / 100 / (prnt / 100);

  const result = {
    ctc,
    saturacaoAtual,
    saturacaoDesejada,
    prnt,
    area,
    metodo,
    necessidadeCalcario: round(nc, 2),
    totalCalcario: round(nc * area, 2),
    custoPorHa: null,
    formula: `(${saturacaoDesejada} - ${saturacaoAtual}) × ${ctc} / 100 / (${prnt}/100) = ${round(nc, 2)} t/ha`,
  };

  if (gessagem && argila) {
    result.gessagem = calcularGessagem(argila, area);
  }

  return result;
}

function calcularGessagem(argila, area) {
  // NG (kg/ha) = argila(%) × 50 (solos argilosos) ou × 75 (solos arenosos)
  const fator = argila >= 35 ? 50 : 75;
  const ngKgHa = argila * fator;
  return {
    necessidadeGesso: round(ngKgHa / 1000, 2),
    totalGesso: round((ngKgHa / 1000) * area, 2),
    unidade: 't/ha',
    formula: `${argila}% argila × ${fator} = ${round(ngKgHa, 0)} kg/ha`,
  };
}
