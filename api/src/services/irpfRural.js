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

export function calcularIrpfRural({ receitaBruta, despesasDedutiveis }) {
  const baseReal = Math.max(0, receitaBruta - despesasDedutiveis);
  const basePresumida = receitaBruta * IRPF_RURAL_PRESUNCAO;

  const irpfReal = calcularIrpfProgressivo(baseReal);
  const irpfPresumido = calcularIrpfProgressivo(basePresumida);

  const economia = round(Math.abs(irpfReal - irpfPresumido), 2);
  const melhorOpcao = irpfReal <= irpfPresumido ? 'Resultado Real' : 'Resultado Presumido';

  return {
    baseReal: round(baseReal, 2),
    basePresumida: round(basePresumida, 2),
    irpfReal,
    irpfPresumido,
    economia,
    melhorOpcao,
  };
}
