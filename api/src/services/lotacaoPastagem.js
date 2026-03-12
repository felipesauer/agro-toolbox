import { round } from '../utils/formatters.js';

// Capacidade de suporte por forrageira (UA/ha no período das águas)
const FORRAGEIRAS = {
  braquiaria_decumbens: { nome: 'Brachiaria decumbens', suporteAguas: 1.5, suporteSeca: 0.8 },
  braquiaria_brizantha: { nome: 'Brachiaria brizantha (Marandu)', suporteAguas: 2.0, suporteSeca: 1.0 },
  panicum_mombaça: { nome: 'Panicum maximum (Mombaça)', suporteAguas: 3.0, suporteSeca: 1.5 },
  panicum_tanzania: { nome: 'Panicum maximum (Tanzânia)', suporteAguas: 2.5, suporteSeca: 1.2 },
  tifton: { nome: 'Tifton 85', suporteAguas: 4.0, suporteSeca: 2.0 },
};

export function calcularLotacaoPastagem({ numAnimais, pesoMedio, areaPastagem, forrageira, periodo }) {
  const totalUA = (numAnimais * pesoMedio) / 450;
  const uaPorHa = totalUA / areaPastagem;

  let classificacao;
  if (uaPorHa < 0.5) classificacao = 'Sublotação';
  else if (uaPorHa <= 1.5) classificacao = 'Adequada';
  else if (uaPorHa <= 2.5) classificacao = 'Lotação alta';
  else classificacao = 'Superlotação';

  const result = {
    numAnimais,
    pesoMedio,
    areaPastagem,
    totalUA: round(totalUA, 2),
    uaPorHa: round(uaPorHa, 2),
    classificacao,
    formula: `(${numAnimais} × ${pesoMedio}kg / 450) / ${areaPastagem}ha = ${round(uaPorHa, 2)} UA/ha`,
  };

  if (forrageira && FORRAGEIRAS[forrageira]) {
    const f = FORRAGEIRAS[forrageira];
    const suporte = periodo === 'seca' ? f.suporteSeca : f.suporteAguas;
    const capacidadeMaxima = suporte * areaPastagem;
    const animaisMaximos = Math.floor((capacidadeMaxima * 450) / pesoMedio);

    result.forrageira = f.nome;
    result.periodo = periodo || 'aguas';
    result.suporteForrageira = suporte;
    result.capacidadeMaximaUA = round(capacidadeMaxima, 2);
    result.animaisMaximos = animaisMaximos;
    result.excedente = Math.max(0, numAnimais - animaisMaximos);
  }

  return result;
}
