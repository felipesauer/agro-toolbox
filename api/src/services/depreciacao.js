import { round } from '../utils/formatters.js';

export function calcularDepreciacao({ valorAquisicao, valorResidual = 0, vidaUtilAnos, anosUso }) {
  const depreciacaoAnual = (valorAquisicao - valorResidual) / vidaUtilAnos;
  const depreciacaoMensal = depreciacaoAnual / 12;

  const anos = anosUso ?? vidaUtilAnos;
  const anosEfetivos = Math.min(anos, vidaUtilAnos);
  const acumulada = depreciacaoAnual * anosEfetivos;
  const valorAtual = Math.max(valorAquisicao - acumulada, valorResidual);

  return {
    valorAquisicao,
    valorResidual,
    vidaUtilAnos,
    anosUso: anos,
    depreciacaoAnual: round(depreciacaoAnual, 2),
    depreciacaoMensal: round(depreciacaoMensal, 2),
    acumulada: round(acumulada, 2),
    valorAtual: round(valorAtual, 2),
    formula: `(${valorAquisicao} - ${valorResidual}) / ${vidaUtilAnos} = ${round(depreciacaoAnual, 2)}/ano`,
  };
}
