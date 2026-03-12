import { round } from '../utils/formatters.js';

export function calcularDepreciacao({ valorAquisicao, valorResidual = 0, vidaUtilAnos, anosUso, metodo = 'linear', horasUso, horasVidaUtil }) {
  if (metodo === 'horas' && horasUso !== undefined && horasVidaUtil) {
    return calcularDepreciacaoHoras({ valorAquisicao, valorResidual, horasVidaUtil, horasUso });
  }

  const depreciacaoAnual = (valorAquisicao - valorResidual) / vidaUtilAnos;
  const depreciacaoMensal = depreciacaoAnual / 12;

  const anos = anosUso ?? vidaUtilAnos;
  const anosEfetivos = Math.min(anos, vidaUtilAnos);
  const acumulada = depreciacaoAnual * anosEfetivos;
  const valorAtual = Math.max(valorAquisicao - acumulada, valorResidual);

  const result = {
    metodo,
    valorAquisicao,
    valorResidual,
    vidaUtilAnos,
    anosUso: anos,
    depreciacaoAnual: round(depreciacaoAnual, 2),
    depreciacaoMensal: round(depreciacaoMensal, 2),
    acumulada: round(acumulada, 2),
    valorAtual: round(valorAtual, 2),
    percentualDepreciado: round((acumulada / (valorAquisicao - valorResidual)) * 100, 2),
    formula: `(${valorAquisicao} - ${valorResidual}) / ${vidaUtilAnos} = ${round(depreciacaoAnual, 2)}/ano`,
  };

  // Cronograma anual
  result.cronograma = [];
  let saldo = valorAquisicao;
  for (let i = 1; i <= vidaUtilAnos; i++) {
    saldo = Math.max(saldo - depreciacaoAnual, valorResidual);
    result.cronograma.push({ ano: i, depreciacao: round(depreciacaoAnual, 2), valorResidualAtual: round(saldo, 2) });
  }

  return result;
}

function calcularDepreciacaoHoras({ valorAquisicao, valorResidual, horasVidaUtil, horasUso }) {
  const taxaPorHora = (valorAquisicao - valorResidual) / horasVidaUtil;
  const acumulada = taxaPorHora * horasUso;
  const valorAtual = Math.max(valorAquisicao - acumulada, valorResidual);

  return {
    metodo: 'horas',
    valorAquisicao,
    valorResidual,
    horasVidaUtil,
    horasUso,
    taxaPorHora: round(taxaPorHora, 2),
    acumulada: round(acumulada, 2),
    valorAtual: round(valorAtual, 2),
    percentualDepreciado: round((acumulada / (valorAquisicao - valorResidual)) * 100, 2),
    horasRestantes: Math.max(0, horasVidaUtil - horasUso),
  };
}
