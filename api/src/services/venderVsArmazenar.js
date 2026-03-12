import { round } from '../utils/formatters.js';

export function calcularVenderVsArmazenar({
  quantidade, precoAtual, precoFuturo, mesesArmazenagem,
  custoArmazenagemMes, taxaOportunidade = 0, quebraTecnica = 0,
}) {
  const receitaVendaImediata = quantidade * precoAtual;

  const custoArmazenagem = custoArmazenagemMes * mesesArmazenagem;
  const perdaQuebra = quantidade * (quebraTecnica / 100) * precoFuturo;
  const custoOportunidade = receitaVendaImediata * (taxaOportunidade / 100 / 12) * mesesArmazenagem;

  const custoTotalArmazenagem = custoArmazenagem + perdaQuebra + custoOportunidade;
  const quantidadeFinal = quantidade * (1 - quebraTecnica / 100);
  const receitaArmazenagem = quantidadeFinal * precoFuturo;
  const lucroLiquidoArmazenagem = receitaArmazenagem - custoTotalArmazenagem;

  const recomendacao = lucroLiquidoArmazenagem > receitaVendaImediata
    ? 'Armazenar e vender depois'
    : 'Vender agora na colheita';

  // Preço mínimo de equilíbrio (break-even)
  const precoEquilibrio = quantidadeFinal > 0
    ? (receitaVendaImediata + custoTotalArmazenagem) / quantidadeFinal
    : 0;

  // Retorno percentual se armazenar
  const retornoArmazenagem = receitaVendaImediata > 0
    ? ((lucroLiquidoArmazenagem - receitaVendaImediata) / receitaVendaImediata) * 100
    : 0;

  return {
    receitaVendaImediata: round(receitaVendaImediata, 2),
    receitaArmazenagem: round(receitaArmazenagem, 2),
    custoTotalArmazenagem: round(custoTotalArmazenagem, 2),
    lucroLiquidoArmazenagem: round(lucroLiquidoArmazenagem, 2),
    diferencaLiquida: round(lucroLiquidoArmazenagem - receitaVendaImediata, 2),
    precoEquilibrio: round(precoEquilibrio, 2),
    retornoArmazenagem: round(retornoArmazenagem, 2),
    recomendacao,
    detalhamento: {
      custoArmazenagem: round(custoArmazenagem, 2),
      perdaQuebra: round(perdaQuebra, 2),
      custoOportunidade: round(custoOportunidade, 2),
      quantidadeFinal: round(quantidadeFinal, 2),
    },
  };
}
