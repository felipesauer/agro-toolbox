import { FUNRURAL } from '../constants/aliquotas.js';
import { round } from '../utils/formatters.js';

export function calcularFunruralComparativo({ receitaBrutaAnual, folhaPagamentoMensal, numEmpregados, rat = 0.02, anosProjecao = 5 }) {
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

  // Ponto de equilíbrio: receita bruta onde ambos se igualam
  // custoFolha = receitaEquilibrio × FUNRURAL.PF.total
  const receitaEquilibrio = FUNRURAL.PF.total > 0
    ? round(custoFolha / FUNRURAL.PF.total, 2)
    : 0;

  // Projeção plurianual
  const projecao = [];
  for (let i = 1; i <= anosProjecao; i++) {
    projecao.push({
      ano: i,
      economiaAcumulada: round(economiaAnual * i, 2),
    });
  }

  return {
    custoComercializacao,
    custoFolha,
    economiaAnual,
    economiaMensal: round(economiaAnual / 12, 2),
    receitaEquilibrio,
    recomendacao,
    projecao,
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
        numEmpregados,
      },
    },
  };
}
