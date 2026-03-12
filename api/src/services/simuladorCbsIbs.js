import { round } from '../utils/formatters.js';
import { CBS_REFERENCIA } from '../constants/cbsReferencia.js';
import { fetchSafe, getAliquotaUniao, getAliquotaUf, getAliquotaMunicipio, getClassificacoesTributarias } from '../clients/cbsApi.js';

// Fallback local rates (alíquotas de referência plenas — LC 214/2025)
const ALIQUOTA_CBS_FALLBACK = 0.088;
const ALIQUOTA_IBS_FALLBACK = 0.177;

// Produtos agro com redução de 60% na alíquota (cesta básica ampliada)
const NCM_REDUCAO_60 = new Set([
  '1001', '1005', '1201', '1006', '0901', // trigo, milho, soja, arroz, café
  '0713', '1701', '1507', '1515', '0207', // feijão, açúcar, óleo soja, óleo girassol, frango
  '0203', '0201', '0202', '0401',         // suíno, bovino, leite
]);

// Produtos agro com alíquota zero (cesta básica nacional — Art. 8 LC 214)
const NCM_ALIQUOTA_ZERO = new Set([
  '0702', '0703', '0704', '0705', '0706', '0707', '0708', '0709', '0710', // hortaliças
  '0803', '0804', '0805', '0806', '0807', '0808', '0809', '0810',         // frutas
  '1901', '0407',                                                           // farinha, ovos
]);

function getReducaoLocal(ncm) {
  const ncm4 = ncm.substring(0, 4);
  if (NCM_ALIQUOTA_ZERO.has(ncm4)) return 1.0;
  if (NCM_REDUCAO_60.has(ncm4)) return 0.6;
  return 0;
}

function getAliquotasLocais(uf) {
  const ano = new Date().getFullYear();
  const trans = CBS_REFERENCIA.transicao[ano];
  const cbsRate = trans ? trans.cbs : ALIQUOTA_CBS_FALLBACK;
  const ibsUf = CBS_REFERENCIA.ibsPorUf[uf];
  const ibsRate = ibsUf ? ibsUf.uf + ibsUf.municipal : (trans ? trans.ibs : ALIQUOTA_IBS_FALLBACK);
  return { cbs: cbsRate, ibs: ibsRate };
}

// Synchronous version — uses local constants only (backwards-compatible)
export function simularCbsIbs(params) {
  const { ncm, valorOperacao, tipo, uf, creditosEntrada = 0, itens } = params;

  // Multi-item support
  if (itens && Array.isArray(itens) && itens.length > 0) {
    const resultados = itens.map((item) => calcularItem(item, uf));
    const totais = resultados.reduce(
      (acc, r) => ({
        cbs: acc.cbs + r.valores.cbs,
        ibs: acc.ibs + r.valores.ibs,
        bruto: acc.bruto + r.valores.totalBruto,
      }),
      { cbs: 0, ibs: 0, bruto: 0 },
    );
    const creditoUtilizado = Math.min(creditosEntrada || 0, totais.bruto);
    return {
      tipo,
      uf,
      itens: resultados,
      totais: {
        cbs: round(totais.cbs, 2),
        ibs: round(totais.ibs, 2),
        totalBruto: round(totais.bruto, 2),
        creditosEntrada: round(creditoUtilizado, 2),
        totalLiquido: round(totais.bruto - creditoUtilizado, 2),
      },
      fonteAliquotas: 'local',
      aviso: 'Valores de referência local — alíquotas sujeitas a atualização durante transição da Reforma Tributária.',
    };
  }

  return calcularItem({ ncm, valorOperacao, creditosEntrada }, uf);
}

function calcularItem({ ncm, valorOperacao, creditosEntrada = 0, cClassTrib }, uf) {
  const reducao = getReducaoLocal(ncm);
  const fator = 1 - reducao;
  const { cbs: aliqCbs, ibs: aliqIbs } = getAliquotasLocais(uf);

  const cbsEfetiva = aliqCbs * fator;
  const ibsEfetiva = aliqIbs * fator;
  const totalEfetiva = cbsEfetiva + ibsEfetiva;

  const cbsValor = round(valorOperacao * cbsEfetiva, 2);
  const ibsValor = round(valorOperacao * ibsEfetiva, 2);
  const totalBruto = round(cbsValor + ibsValor, 2);

  const creditoUtilizado = Math.min(creditosEntrada, totalBruto);
  const totalLiquido = round(totalBruto - creditoUtilizado, 2);

  return {
    ncm,
    valorOperacao,
    uf,
    cClassTrib: cClassTrib || null,
    reducao: reducao > 0 ? `${round(reducao * 100, 0)}%` : 'Sem redução',
    aliquotas: {
      cbs: round(cbsEfetiva * 100, 2),
      ibs: round(ibsEfetiva * 100, 2),
      total: round(totalEfetiva * 100, 2),
    },
    valores: {
      cbs: cbsValor,
      ibs: ibsValor,
      totalBruto,
      creditosEntrada: round(creditoUtilizado, 2),
      totalLiquido,
    },
    memoriaCalculo: [
      `Alíquota CBS: ${round(aliqCbs * 100, 2)}% × fator (1 - ${round(reducao * 100, 0)}%) = ${round(cbsEfetiva * 100, 2)}%`,
      `Alíquota IBS: ${round(aliqIbs * 100, 2)}% × fator = ${round(ibsEfetiva * 100, 2)}%`,
      `CBS: R$ ${valorOperacao.toFixed(2)} × ${round(cbsEfetiva * 100, 2)}% = R$ ${cbsValor.toFixed(2)}`,
      `IBS: R$ ${valorOperacao.toFixed(2)} × ${round(ibsEfetiva * 100, 2)}% = R$ ${ibsValor.toFixed(2)}`,
      `Total bruto: R$ ${totalBruto.toFixed(2)}`,
      creditoUtilizado > 0 ? `Créditos: -R$ ${creditoUtilizado.toFixed(2)}` : null,
      `Total líquido: R$ ${totalLiquido.toFixed(2)}`,
    ].filter(Boolean),
    fonteAliquotas: 'local',
    aviso: 'Valores de referência local — alíquotas sujeitas a atualização durante transição da Reforma Tributária.',
  };
}

// Async version — tries CBS API first, falls back to local
export async function simularCbsIbsAsync(params) {
  const { ncm, valorOperacao, tipo, uf, creditosEntrada = 0, municipio, cClassTrib } = params;

  const codigoUf = CBS_REFERENCIA.codigosUf[uf];

  // Try CBS API for real-time rates
  const [apiCbs, apiIbsUf, apiIbsMun, apiClassificacoes] = await Promise.all([
    fetchSafe(getAliquotaUniao),
    codigoUf ? fetchSafe(getAliquotaUf, codigoUf) : null,
    municipio ? fetchSafe(getAliquotaMunicipio, municipio) : null,
    cClassTrib ? fetchSafe(getClassificacoesTributarias) : null,
  ]);

  const usouApi = !!(apiCbs || apiIbsUf);
  const { cbs: cbsFallback, ibs: ibsFallback } = getAliquotasLocais(uf);

  const aliqCbs = apiCbs?.aliquota != null ? apiCbs.aliquota / 100 : cbsFallback;
  const aliqIbsUf = apiIbsUf?.aliquota != null ? apiIbsUf.aliquota / 100 : (CBS_REFERENCIA.ibsPorUf[uf]?.uf || ibsFallback / 2);
  const aliqIbsMun = apiIbsMun?.aliquota != null ? apiIbsMun.aliquota / 100 : (CBS_REFERENCIA.ibsPorUf[uf]?.municipal || ibsFallback / 2);
  const aliqIbs = aliqIbsUf + aliqIbsMun;

  // Check for reduction via cClassTrib from API
  let reducaoApi = null;
  if (apiClassificacoes && cClassTrib) {
    const ct = Array.isArray(apiClassificacoes)
      ? apiClassificacoes.find((c) => c.cClassTrib === cClassTrib)
      : null;
    if (ct) {
      reducaoApi = {
        cbs: (ct.percentualReducaoCbs || 0) / 100,
        ibsUf: (ct.percentualReducaoIbsUf || 0) / 100,
        ibsMun: (ct.percentualReducaoIbsMun || 0) / 100,
      };
    }
  }

  const reducaoLocal = getReducaoLocal(ncm);
  const fatorCbs = reducaoApi ? (1 - reducaoApi.cbs) : (1 - reducaoLocal);
  const fatorIbsUf = reducaoApi ? (1 - reducaoApi.ibsUf) : (1 - reducaoLocal);
  const fatorIbsMun = reducaoApi ? (1 - reducaoApi.ibsMun) : (1 - reducaoLocal);

  const cbsEfetiva = aliqCbs * fatorCbs;
  const ibsUfEfetiva = aliqIbsUf * fatorIbsUf;
  const ibsMunEfetiva = aliqIbsMun * fatorIbsMun;
  const ibsEfetiva = ibsUfEfetiva + ibsMunEfetiva;
  const totalEfetiva = cbsEfetiva + ibsEfetiva;

  const cbsValor = round(valorOperacao * cbsEfetiva, 2);
  const ibsUfValor = round(valorOperacao * ibsUfEfetiva, 2);
  const ibsMunValor = round(valorOperacao * ibsMunEfetiva, 2);
  const ibsValor = round(ibsUfValor + ibsMunValor, 2);
  const totalBruto = round(cbsValor + ibsValor, 2);

  const creditoUtilizado = Math.min(creditosEntrada, totalBruto);
  const totalLiquido = round(totalBruto - creditoUtilizado, 2);

  const reducaoLabel = reducaoApi
    ? `CBS: ${round(reducaoApi.cbs * 100, 0)}%, IBS UF: ${round(reducaoApi.ibsUf * 100, 0)}%, IBS Mun: ${round(reducaoApi.ibsMun * 100, 0)}%`
    : reducaoLocal > 0 ? `${round(reducaoLocal * 100, 0)}%` : 'Sem redução';

  return {
    ncm,
    valorOperacao,
    tipo,
    uf,
    municipio: municipio || null,
    cClassTrib: cClassTrib || null,
    reducao: reducaoLabel,
    aliquotas: {
      cbs: round(cbsEfetiva * 100, 4),
      ibsUf: round(ibsUfEfetiva * 100, 4),
      ibsMun: round(ibsMunEfetiva * 100, 4),
      ibs: round(ibsEfetiva * 100, 4),
      total: round(totalEfetiva * 100, 4),
    },
    valores: {
      cbs: cbsValor,
      ibsUf: ibsUfValor,
      ibsMun: ibsMunValor,
      ibs: ibsValor,
      totalBruto,
      creditosEntrada: round(creditoUtilizado, 2),
      totalLiquido,
    },
    splitPayment: {
      parcela_cbs: cbsValor,
      parcela_ibs_uf: ibsUfValor,
      parcela_ibs_mun: ibsMunValor,
    },
    memoriaCalculo: [
      `Alíquota CBS: ${round(aliqCbs * 100, 4)}% × fator ${round(fatorCbs, 4)} = ${round(cbsEfetiva * 100, 4)}%`,
      `Alíquota IBS UF: ${round(aliqIbsUf * 100, 4)}% × fator ${round(fatorIbsUf, 4)} = ${round(ibsUfEfetiva * 100, 4)}%`,
      `Alíquota IBS Mun: ${round(aliqIbsMun * 100, 4)}% × fator ${round(fatorIbsMun, 4)} = ${round(ibsMunEfetiva * 100, 4)}%`,
      `CBS: R$ ${valorOperacao.toFixed(2)} × ${round(cbsEfetiva * 100, 4)}% = R$ ${cbsValor.toFixed(2)}`,
      `IBS UF: R$ ${valorOperacao.toFixed(2)} × ${round(ibsUfEfetiva * 100, 4)}% = R$ ${ibsUfValor.toFixed(2)}`,
      `IBS Mun: R$ ${valorOperacao.toFixed(2)} × ${round(ibsMunEfetiva * 100, 4)}% = R$ ${ibsMunValor.toFixed(2)}`,
      `Total bruto: R$ ${totalBruto.toFixed(2)}`,
      creditoUtilizado > 0 ? `Créditos: -R$ ${creditoUtilizado.toFixed(2)}` : null,
      `Total líquido: R$ ${totalLiquido.toFixed(2)}`,
    ].filter(Boolean),
    fonteAliquotas: usouApi ? 'CBS API (Dados Abertos)' : 'local',
    aviso: usouApi
      ? 'Alíquotas obtidas em tempo real da CBS API — Dados Abertos.'
      : 'Dados em tempo real indisponíveis — usando valores de referência local.',
  };
}
