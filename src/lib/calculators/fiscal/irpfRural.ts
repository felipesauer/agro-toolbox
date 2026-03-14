import { TABELA_IRPF, IRPF_RURAL_PRESUNCAO } from "@/lib/constants/aliquotas";
import { round } from "@/lib/utils";

function calcularIrpfProgressivo(base: number): number {
  for (const faixa of TABELA_IRPF) {
    if (base <= faixa.limite) {
      return Math.max(0, round(base * faixa.aliquota - faixa.deducao, 2));
    }
  }
  const ultima = TABELA_IRPF[TABELA_IRPF.length - 1];
  return round(base * ultima.aliquota - ultima.deducao, 2);
}

function obterFaixaIrpf(base: number) {
  for (let i = 0; i < TABELA_IRPF.length; i++) {
    if (base <= TABELA_IRPF[i].limite) {
      return { faixa: i + 1, aliquota: TABELA_IRPF[i].aliquota * 100 };
    }
  }
  return {
    faixa: TABELA_IRPF.length,
    aliquota: TABELA_IRPF[TABELA_IRPF.length - 1].aliquota * 100,
  };
}

export interface IrpfRuralInput {
  receitaBruta: number;
  despesasDedutiveis: number;
  despesasPorCategoria?: Record<string, number>;
}

export function calcularIrpfRural({
  receitaBruta,
  despesasDedutiveis,
  despesasPorCategoria,
}: IrpfRuralInput) {
  const baseReal = Math.max(0, receitaBruta - despesasDedutiveis);
  const basePresumida = receitaBruta * IRPF_RURAL_PRESUNCAO;

  const irpfReal = calcularIrpfProgressivo(baseReal);
  const irpfPresumido = calcularIrpfProgressivo(basePresumida);

  const economia = round(Math.abs(irpfReal - irpfPresumido), 2);
  const melhorOpcao =
    irpfReal <= irpfPresumido ? "Resultado Real" : "Resultado Presumido";

  const aliquotaEfetivaReal =
    baseReal > 0 ? round((irpfReal / baseReal) * 100, 2) : 0;
  const aliquotaEfetivaPresumido =
    basePresumida > 0
      ? round((irpfPresumido / basePresumida) * 100, 2)
      : 0;

  const percentualDespesas =
    receitaBruta > 0
      ? round((despesasDedutiveis / receitaBruta) * 100, 2)
      : 0;

  const despesasEquilibrio = round(
    receitaBruta * (1 - IRPF_RURAL_PRESUNCAO),
    2
  );

  return {
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
    ...(despesasPorCategoria ? { despesasPorCategoria } : {}),
  };
}
