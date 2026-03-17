import { FUNRURAL } from "@/lib/constants/aliquotas";
import { round } from "@/lib/utils";

export interface FunruralComparativoInput {
  receitaBrutaAnual: number;
  folhaPagamentoMensal: number;
  numEmpregados: number;
  rat?: number;
  anosProjecao?: number;
}

export function calcularFunruralComparativo({
  receitaBrutaAnual,
  folhaPagamentoMensal,
  numEmpregados,
  rat = 0.02,
  anosProjecao = 5,
}: FunruralComparativoInput) {
  const custoComercializacao = round(
    receitaBrutaAnual * FUNRURAL.PF.total,
    2
  );

  const folhaAnual = folhaPagamentoMensal * 12;
  const patronal = folhaAnual * FUNRURAL.folha.patronal;
  const ratValor = folhaAnual * rat;
  const senarFolha = folhaAnual * FUNRURAL.folha.senar;
  const custoFolha = round(patronal + ratValor + senarFolha, 2);

  const economiaAnual = round(Math.abs(custoComercializacao - custoFolha), 2);
  const recomendacao =
    custoComercializacao <= custoFolha
      ? "Manter recolhimento sobre comercialização"
      : "Optar por recolhimento sobre folha de pagamento";

  const receitaEquilibrio =
    FUNRURAL.PF.total > 0
      ? round(custoFolha / FUNRURAL.PF.total, 2)
      : 0;

  const projecao = Array.from({ length: anosProjecao }, (_, i) => ({
    ano: i + 1,
    economiaAcumulada: round(economiaAnual * (i + 1), 2),
  }));

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
