import { CBS_REFERENCIA } from "@/lib/constants/cbsReferencia";
import { round } from "@/lib/utils";

// Percentuais de crédito presumido — LC 214/2025, Art. 183-185
const PERCENTUAIS: Record<string, number> = {
  produtor_rural_pf: 0.08,
  agricultor_familiar: 0.06,
  cooperativa: 0.1,
};

function getAliquotaTotal(): number {
  const ano = new Date().getFullYear();
  const trans = CBS_REFERENCIA.transicao[ano];
  return trans ? trans.cbs + trans.ibs : 0.265;
}

export type TipoProdutor = "produtor_rural_pf" | "agricultor_familiar" | "cooperativa";

export interface CreditoPresumidoInput {
  receitaBruta: number;
  custos: number;
  tipo: TipoProdutor;
  ncmPrincipal?: string;
  meses?: number;
}

export function calcularCreditoPresumido({
  receitaBruta,
  custos,
  tipo,
  ncmPrincipal,
  meses = 12,
}: CreditoPresumidoInput) {
  const percentual = PERCENTUAIS[tipo] ?? 0.08;
  const aliquotaTotal = getAliquotaTotal();

  const creditoPresumido = round(receitaBruta * percentual, 2);
  const margemOperacional = round(receitaBruta - custos, 2);
  const cargaTributariaEstimada = round(receitaBruta * aliquotaTotal, 2);
  const economiaCredito = round(Math.min(creditoPresumido, cargaTributariaEstimada), 2);
  const cargaLiquida = round(cargaTributariaEstimada - economiaCredito, 2);

  const creditoMensal = round(creditoPresumido / meses, 2);
  const cargaMensal = round(cargaTributariaEstimada / meses, 2);

  // Comparativo: crédito presumido vs crédito real
  const creditoRealEstimado = round(custos * aliquotaTotal, 2);
  const diferencaPresumidoVsReal = round(creditoPresumido - creditoRealEstimado, 2);

  return {
    receitaBruta,
    custos,
    tipo,
    ncmPrincipal: ncmPrincipal ?? null,
    percentualCredito: round(percentual * 100, 2),
    aliquotaTotalReferencia: round(aliquotaTotal * 100, 2),
    creditoPresumido,
    creditoMensal,
    margemOperacional,
    cargaTributariaEstimada,
    cargaMensal,
    economiaCredito,
    cargaLiquida,
    comparativo: {
      creditoPresumido,
      creditoRealEstimado,
      diferenca: diferencaPresumidoVsReal,
      maisVantajoso:
        diferencaPresumidoVsReal >= 0 ? "Crédito Presumido" : "Crédito Real",
    },
    fundamentacaoLegal:
      "LC 214/2025, Art. 183-185 — Crédito presumido para aquisições de produtor rural PF.",
    aviso:
      "Valores de referência — percentuais sujeitos a regulamentação definitiva.",
  };
}
