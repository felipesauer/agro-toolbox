import { fetchSafe, getSituacoesTributariasCbsIbs, getSituacoesTributariasIs } from '../clients/cbsApi.js';
import { CBS_REFERENCIA } from '../constants/cbsReferencia.js';
import { round } from '../utils/formatters.js';

// Local fallback CSTs
const CST_LOCAL = [
  { codigo: '000', descricao: 'Tributação normal CBS/IBS' },
  { codigo: '100', descricao: 'Tributação com alíquota reduzida' },
  { codigo: '200', descricao: 'Tributação com alíquota zero' },
  { codigo: '300', descricao: 'Imunidade' },
  { codigo: '400', descricao: 'Suspensão' },
  { codigo: '500', descricao: 'Diferimento' },
  { codigo: '900', descricao: 'Outras situações tributárias' },
];

export async function consultarSituacoesTributarias() {
  const [apiCsts, apiCstsIs] = await Promise.all([
    fetchSafe(getSituacoesTributariasCbsIbs),
    fetchSafe(getSituacoesTributariasIs),
  ]);

  return {
    cbsIbs: apiCsts || CST_LOCAL,
    impostoSeletivo: apiCstsIs || [],
    fonteAliquotas: apiCsts ? 'CBS API (Dados Abertos)' : 'local',
  };
}

export async function consultarAliquotasUf(uf) {
  const { getAliquotaUniao, getAliquotaUf, getMunicipios } = await import('../clients/cbsApi.js');

  const codigoUf = CBS_REFERENCIA.codigosUf[uf.toUpperCase()];
  if (!codigoUf) {
    return { uf, erro: `UF "${uf}" não encontrada.` };
  }

  const [apiCbs, apiIbsUf, apiMunicipios] = await Promise.all([
    fetchSafe(getAliquotaUniao),
    fetchSafe(getAliquotaUf, codigoUf),
    fetchSafe(getMunicipios, uf.toUpperCase()),
  ]);

  const fallback = CBS_REFERENCIA.ibsPorUf[uf.toUpperCase()];
  const ano = new Date().getFullYear();
  const trans = CBS_REFERENCIA.transicao[ano];

  const cbsRate = apiCbs?.aliquota != null ? apiCbs.aliquota : (trans ? round(trans.cbs * 100, 2) : 0.9);
  const ibsUfRate = apiIbsUf?.aliquota != null ? apiIbsUf.aliquota : (fallback ? round(fallback.uf * 100, 2) : 0.05);

  return {
    uf: uf.toUpperCase(),
    codigoUf,
    aliquotas: {
      cbs: cbsRate,
      ibsUf: ibsUfRate,
      total: round(cbsRate + ibsUfRate, 4),
    },
    municipios: apiMunicipios ? (Array.isArray(apiMunicipios) ? apiMunicipios.slice(0, 50) : []) : [],
    fonteAliquotas: apiCbs ? 'CBS API (Dados Abertos)' : 'local',
    aviso: !apiCbs
      ? 'Dados em tempo real indisponíveis — usando valores de referência local.'
      : 'Alíquotas obtidas em tempo real da CBS API.',
  };
}
