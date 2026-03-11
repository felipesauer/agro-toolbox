import { round } from '../utils/formatters.js';

export function calcularCustoFinanciamento({
  valorFinanciamento, taxaAnual, prazoMeses, carenciaMeses = 0,
  sistemaAmortizacao, tarifaBancaria = 0,
}) {
  const taxaMensal = (1 + taxaAnual / 100) ** (1 / 12) - 1;
  const mesesAmortizacao = prazoMeses - carenciaMeses;
  const parcelas = [];
  let saldoDevedor = valorFinanciamento;
  let totalJuros = 0;
  let totalPago = tarifaBancaria;

  for (let i = 1; i <= prazoMeses; i++) {
    const juros = saldoDevedor * taxaMensal;
    totalJuros += juros;

    if (i <= carenciaMeses) {
      // Carência — só juros
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

  return {
    sistemaAmortizacao,
    valorFinanciamento,
    taxaAnual,
    taxaMensal: round(taxaMensal * 100, 4),
    prazoMeses,
    carenciaMeses,
    tarifaBancaria,
    totalJuros: round(totalJuros, 2),
    totalPago: round(totalPago, 2),
    custoEfetivo: round(totalPago - valorFinanciamento, 2),
    parcelas,
  };
}
