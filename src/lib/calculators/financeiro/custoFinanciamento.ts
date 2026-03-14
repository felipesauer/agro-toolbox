import { round } from "@/lib/utils";

export interface CustoFinanciamentoInput {
  valorFinanciamento: number;
  taxaAnual: number;
  prazoMeses: number;
  carenciaMeses?: number;
  sistemaAmortizacao: "SAC" | "PRICE";
  tarifaBancaria?: number;
  iof?: number;
}

export function calcularCustoFinanciamento({
  valorFinanciamento,
  taxaAnual,
  prazoMeses,
  carenciaMeses = 0,
  sistemaAmortizacao,
  tarifaBancaria = 0,
  iof = 0,
}: CustoFinanciamentoInput) {
  const taxaMensal = (1 + taxaAnual / 100) ** (1 / 12) - 1;
  const mesesAmortizacao = prazoMeses - carenciaMeses;
  const parcelas: Array<{
    mes: number;
    amortizacao: number;
    juros: number;
    parcela: number;
    saldoDevedor: number;
  }> = [];
  let saldoDevedor = valorFinanciamento;
  let totalJuros = 0;
  let totalPago = tarifaBancaria;

  const valorIof = round(valorFinanciamento * (iof / 100), 2);
  totalPago += valorIof;

  for (let i = 1; i <= prazoMeses; i++) {
    const juros = saldoDevedor * taxaMensal;
    totalJuros += juros;

    if (i <= carenciaMeses) {
      parcelas.push({
        mes: i,
        amortizacao: 0,
        juros: round(juros, 2),
        parcela: round(juros, 2),
        saldoDevedor: round(saldoDevedor, 2),
      });
      totalPago += juros;
      continue;
    }

    let amortizacao: number;
    if (sistemaAmortizacao === "SAC") {
      amortizacao = valorFinanciamento / mesesAmortizacao;
    } else {
      const coef =
        (taxaMensal * (1 + taxaMensal) ** mesesAmortizacao) /
        ((1 + taxaMensal) ** mesesAmortizacao - 1);
      amortizacao = valorFinanciamento * coef - juros;
    }

    saldoDevedor = Math.max(0, saldoDevedor - amortizacao);
    const parcela = amortizacao + juros;
    totalPago += parcela;

    parcelas.push({
      mes: i,
      amortizacao: round(amortizacao, 2),
      juros: round(juros, 2),
      parcela: round(parcela, 2),
      saldoDevedor: round(saldoDevedor, 2),
    });
  }

  const cetAnual =
    prazoMeses > 0
      ? ((totalPago / valorFinanciamento) ** (12 / prazoMeses) - 1) * 100
      : 0;

  return {
    sistemaAmortizacao,
    valorFinanciamento,
    taxaAnual,
    taxaMensal: round(taxaMensal * 100, 4),
    prazoMeses,
    carenciaMeses,
    tarifaBancaria,
    iof: valorIof,
    totalJuros: round(totalJuros, 2),
    totalPago: round(totalPago, 2),
    custoEfetivo: round(totalPago - valorFinanciamento, 2),
    cetAnual: round(cetAnual, 2),
    primeiraParcela: parcelas[0]?.parcela,
    ultimaParcela: parcelas[parcelas.length - 1]?.parcela,
    parcelas,
  };
}
