import { TABELA_IRPF, IRPF_RURAL_PRESUNCAO } from '../constants/aliquotas.js';
import { round } from '../utils/formatters.js';

function calcularIrpfProgressivo(base) {
  for (const faixa of TABELA_IRPF) {
    if (base <= faixa.limite) {
      return Math.max(0, round(base * faixa.aliquota - faixa.deducao, 2));
    }
  }
  const ultima = TABELA_IRPF[TABELA_IRPF.length - 1];
  return round(base * ultima.aliquota - ultima.deducao, 2);
}

function obterFaixaIrpf(base) {
  for (let i = 0; i < TABELA_IRPF.length; i++) {
    if (base <= TABELA_IRPF[i].limite) {
      return { faixa: i + 1, aliquota: TABELA_IRPF[i].aliquota * 100 };
    }
  }
  return { faixa: TABELA_IRPF.length, aliquota: TABELA_IRPF[TABELA_IRPF.length - 1].aliquota * 100 };
}

export function calcularIrpfRural({ receitaBruta, despesasDedutiveis, despesasPorCategoria }) {
  const baseReal = Math.max(0, receitaBruta - despesasDedutiveis);
  const basePresumida = receitaBruta * IRPF_RURAL_PRESUNCAO;

  const irpfReal = calcularIrpfProgressivo(baseReal);
  const irpfPresumido = calcularIrpfProgressivo(basePresumida);

  const economia = round(Math.abs(irpfReal - irpfPresumido), 2);
  const melhorOpcao = irpfReal <= irpfPresumido ? 'Resultado Real' : 'Resultado Presumido';

  const aliquotaEfetivaReal = baseReal > 0 ? round((irpfReal / baseReal) * 100, 2) : 0;
  const aliquotaEfetivaPresumido = basePresumida > 0 ? round((irpfPresumido / basePresumida) * 100, 2) : 0;

  // Percentual de despesas sobre receita bruta
  const percentualDespesas = receitaBruta > 0 ? round((despesasDedutiveis / receitaBruta) * 100, 2) : 0;

  // Ponto de equilíbrio: despesasDedutiveis onde real = presumido
  // receitaBruta - despesasEquilibrio = receitaBruta × 0.20
  // despesasEquilibrio = receitaBruta × (1 - 0.20) = receitaBruta × 0.80
  const despesasEquilibrio = round(receitaBruta * (1 - IRPF_RURAL_PRESUNCAO), 2);

  const result = {
    receitaBruta: round(receitaBruta, 2),
    despesasDedutiveis: round(despesasDedutiveis, 2),
    percentualDespesas,
    despesasEquilibrio,
    baseReal: round(baseReal, 2),
    basePresumida: round(basePresumida, 2),
    faixaReal: obterFaixaIrpf(baseReal),
    faixaPresumido: obterFaixaIrpf(basePresumida),
    irpfReal,
    irpfPresumido,
    aliquotaEfetivaReal,
    aliquotaEfetivaPresumido,
    economia,
    melhorOpcao,
  };

  if (despesasPorCategoria) {
    result.despesasPorCategoria = despesasPorCategoria;
  }

  return result;
}
