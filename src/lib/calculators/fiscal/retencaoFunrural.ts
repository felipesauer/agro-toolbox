import { FUNRURAL } from "@/lib/constants/aliquotas";
import { round } from "@/lib/utils";

export interface RetencaoFunruralInput {
  valorBruto: number;
  tipoPessoa: "PF" | "PJ";
  optanteFolha?: boolean;
  numOperacoesAno?: number;
}

export function calcularRetencaoFunrural({
  valorBruto,
  tipoPessoa,
  optanteFolha = false,
  numOperacoesAno = 1,
}: RetencaoFunruralInput) {
  if (optanteFolha) {
    return {
      valorBruto,
      tipoPessoa,
      optanteFolha: true,
      mensagem:
        "Optante por recolhimento sobre folha — sem retenção na comercialização",
      totalRetido: 0,
      valorLiquido: valorBruto,
    };
  }

  const aliquotas = FUNRURAL[tipoPessoa];
  const funrural = round(valorBruto * aliquotas.funrural, 2);
  const rat = round(valorBruto * aliquotas.rat, 2);
  const senar = round(valorBruto * aliquotas.senar, 2);
  const totalRetido = round(funrural + rat + senar, 2);

  return {
    valorBruto,
    tipoPessoa,
    optanteFolha: false,
    funrural,
    rat,
    senar,
    totalRetido,
    valorLiquido: round(valorBruto - totalRetido, 2),
    projecaoAnual:
      numOperacoesAno > 1
        ? {
            operacoes: numOperacoesAno,
            totalRetidoAnual: round(totalRetido * numOperacoesAno, 2),
            valorBrutoAnual: round(valorBruto * numOperacoesAno, 2),
          }
        : undefined,
    detalhamento: {
      funrural: `${aliquotas.funrural * 100}%`,
      rat: `${aliquotas.rat * 100}%`,
      senar: `${aliquotas.senar * 100}%`,
      total: `${aliquotas.total * 100}%`,
    },
  };
}
