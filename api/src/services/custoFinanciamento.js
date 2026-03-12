import { round } from '../utils/formatters.js';

export function calcularCustoFinanciamento({
  valorFinanciamento, taxaAnual, prazoMeses, carenciaMeses = 0,
  sistemaAmortizacao, tarifaBancaria = 0, iof = 0,
}) {
  const taxaMensal = (1 + taxaAnual / 100) ** (1 / 12) - 1;
  const mesesAmortizacao = prazoMeses - carenciaMeses;
  const parcelas = [];
  let saldoDevedor = valorFinanciamento;
  let totalJuros = 0;
  let totalPago = tarifaBancaria;

  // IOF (simplificado — alíquota sobre valor financiado)
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

    let amortizacao;
    if (sistemaAmortizacao === 'SAC') {
      amortizacao = valorFinanciamento / mesesAmortizacao;
    } else {
      // PRICE
      const coef = (taxaMensal * (1 + taxaMensal) ** mesesAmortizacao) /
                    ((1 + taxaMensal) ** mesesAmortizacao - 1);
      const parcelaPrice = valorFinanciamento * coef;
      amortizacao = parcelaPrice - juros;
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

  const custoEfetivo = totalPago - valorFinanciamento;

  // CET — Custo Efetivo Total (taxa anual equivalente)
  const cetAnual = prazoMeses > 0
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
    custoEfetivo: round(custoEfetivo, 2),
    cetAnual: round(cetAnual, 2),
    primeiraParcela: parcelas[0]?.parcela,
    ultimaParcela: parcelas[parcelas.length - 1]?.parcela,
    parcelas,
  };
}
