import { fetchSafe, getClassificacoesTributarias, validarClassificacaoDfe, getFundamentacoesLegais, getNcm } from '../clients/cbsApi.js';

export async function consultarClassificacaoTributaria({ ncm, siglaDfe, cClassTrib }) {
  const [apiClassificacoes, apiNcm, apiFundamentacoes] = await Promise.all([
    fetchSafe(getClassificacoesTributarias),
    ncm ? fetchSafe(getNcm, ncm) : null,
    fetchSafe(getFundamentacoesLegais),
  ]);

  let classificacao = null;
  if (apiClassificacoes && Array.isArray(apiClassificacoes) && cClassTrib) {
    classificacao = apiClassificacoes.find((c) => c.cClassTrib === cClassTrib) || null;
  }

  // Validate DFe compatibility
  let validacaoDfe = null;
  if (siglaDfe && cClassTrib) {
    validacaoDfe = await fetchSafe(validarClassificacaoDfe, siglaDfe, cClassTrib);
  }

  // Fundamentações legais
  let fundamentacoes = [];
  if (apiFundamentacoes && Array.isArray(apiFundamentacoes)) {
    fundamentacoes = apiFundamentacoes
      .filter((f) => f.cClassTrib === cClassTrib || !cClassTrib)
      .slice(0, 10);
  }

  return {
    ncm: ncm || null,
    siglaDfe: siglaDfe || null,
    cClassTrib: cClassTrib || null,
    classificacao: classificacao ? {
      cClassTrib: classificacao.cClassTrib,
      descricao: classificacao.descricao || null,
      percentualReducaoCbs: classificacao.percentualReducaoCbs || 0,
      percentualReducaoIbsUf: classificacao.percentualReducaoIbsUf || 0,
      percentualReducaoIbsMun: classificacao.percentualReducaoIbsMun || 0,
      creditoPresumidoFornecedor: classificacao.indicaCreditoPresumidoFornecedor || false,
      creditoPresumidoAdquirente: classificacao.indicaCreditoPresumidoAdquirente || false,
    } : null,
    ncmInfo: apiNcm || null,
    validacaoDfe: validacaoDfe ? { valido: true, dados: validacaoDfe } : (siglaDfe && cClassTrib ? { valido: false, mensagem: 'Não foi possível validar — CBS API indisponível' } : null),
    fundamentacoesLegais: fundamentacoes,
    fonteAliquotas: apiClassificacoes ? 'CBS API (Dados Abertos)' : 'indisponível',
    aviso: !apiClassificacoes
      ? 'CBS API indisponível — não foi possível consultar classificações tributárias em tempo real.'
      : 'Dados obtidos em tempo real da CBS API — Dados Abertos.',
  };
}
