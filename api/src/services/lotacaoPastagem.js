import { round } from '../utils/formatters.js';

export function calcularLotacaoPastagem({ numAnimais, pesoMedio, areaPastagem }) {
  const totalUA = (numAnimais * pesoMedio) / 450;
  const uaPorHa = totalUA / areaPastagem;

  let classificacao;
  if (uaPorHa < 0.5) classificacao = 'Sublotação';
  else if (uaPorHa <= 1.5) classificacao = 'Adequada';
  else if (uaPorHa <= 2.5) classificacao = 'Lotação alta';
  else classificacao = 'Superlotação';

  return {
    numAnimais,
    pesoMedio,
    areaPastagem,
    totalUA: round(totalUA, 2),
    uaPorHa: round(uaPorHa, 2),
    classificacao,
    formula: `(${numAnimais} × ${pesoMedio}kg / 450) / ${areaPastagem}ha = ${round(uaPorHa, 2)} UA/ha`,
  };
}
