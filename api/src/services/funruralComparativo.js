import { FUNRURAL } from '../constants/aliquotas.js';
import { round } from '../utils/formatters.js';

export function calcularFunruralComparativo({ receitaBrutaAnual, folhaPagamentoMensal, numEmpregados, rat = 0.02 }) {
  // Opção 1: Comercialização (1,5% PF sobre receita bruta)
  const custoComercializacao = round(receitaBrutaAnual * FUNRURAL.PF.total, 2);

  // Opção 2: Folha de pagamento
  const folhaAnual = folhaPagamentoMensal * 12;
  const patronal = folhaAnual * FUNRURAL.folha.patronal;
  const ratValor = folhaAnual * rat;
  const senarFolha = folhaAnual * FUNRURAL.folha.senar;
  const custoFolha = round(patronal + ratValor + senarFolha, 2);

  const economiaAnual = round(Math.abs(custoComercializacao - custoFolha), 2);
  const recomendacao = custoComercializacao <= custoFolha
    ? 'Manter recolhimento sobre comercialização'
    : 'Optar por recolhimento sobre folha de pagamento';

  return {
    custoComercializacao,
    custoFolha,
    economiaAnual,
    recomendacao,
    detalhamento: {
      comercializacao: {
        base: receitaBrutaAnual,
        aliquota: `${FUNRURAL.PF.total * 100}%`,
        valor: custoComercializacao,
      },
      folha: {
        base: folhaAnual,
        patronal: round(patronal, 2),
        rat: round(ratValor, 2),
        senar: round(senarFolha, 2),
        valor: custoFolha,
      },
    },
  };
}
