import { round } from '../utils/formatters.js';
import { CBS_REFERENCIA } from '../constants/cbsReferencia.js';
import { fetchSafe, getClassificacoesTributarias } from '../clients/cbsApi.js';

// Crédito presumido para pessoas físicas — Reforma Tributária (LC 214/2025, Art. 183-185)
const PERCENTUAIS = {
  produtor_rural_pf: 0.08,
  agricultor_familiar: 0.06,
  cooperativa: 0.10,
};

function getAliquotaTotal() {
  const ano = new Date().getFullYear();
  const trans = CBS_REFERENCIA.transicao[ano];
  return trans ? trans.cbs + trans.ibs : 0.265;
}

export function calcularCreditoPresumido({ receitaBruta, custos, tipo, ncmPrincipal, meses = 12 }) {
  const percentual = PERCENTUAIS[tipo] || 0.08;
  const aliquotaTotal = getAliquotaTotal();

  const creditoPresumido = round(receitaBruta * percentual, 2);
  const margemOperacional = round(receitaBruta - custos, 2);
  const cargaTributariaEstimada = round(receitaBruta * aliquotaTotal, 2);
  const economiaCredito = round(Math.min(creditoPresumido, cargaTributariaEstimada), 2);
  const cargaLiquida = round(cargaTributariaEstimada - economiaCredito, 2);

  // Projeção mensal/anual
  const creditoMensal = round(creditoPresumido / meses, 2);
  const cargaMensal = round(cargaTributariaEstimada / meses, 2);

  // Comparativo: crédito presumido vs crédito real (se comprador pudesse apropriar)
  const creditoRealEstimado = round(custos * aliquotaTotal, 2);
  const diferencaPresumidoVsReal = round(creditoPresumido - creditoRealEstimado, 2);

  return {
    receitaBruta,
    custos,
    tipo,
    ncmPrincipal: ncmPrincipal || null,
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
      maisVantajoso: diferencaPresumidoVsReal >= 0 ? 'Crédito Presumido' : 'Crédito Real',
    },
    fundamentacaoLegal: 'LC 214/2025, Art. 183-185 — Crédito presumido para aquisições de produtor rural PF.',
    aviso: 'Valores de referência — percentuais sujeitos a regulamentação definitiva.',
  };
}

// Async version — cross-references cClassTrib from CBS API
export async function calcularCreditoPresumidoAsync(params) {
  const base = calcularCreditoPresumido(params);

  if (params.ncmPrincipal) {
    const apiClassificacoes = await fetchSafe(getClassificacoesTributarias);
    if (apiClassificacoes && Array.isArray(apiClassificacoes)) {
      const relevantes = apiClassificacoes.filter((c) =>
        c.indicaCreditoPresumidoFornecedor || c.indicaCreditoPresumidoAdquirente,
      );
      base.classificacoesTributariasComCredito = relevantes.map((c) => ({
        cClassTrib: c.cClassTrib,
        creditoFornecedor: c.indicaCreditoPresumidoFornecedor || false,
        creditoAdquirente: c.indicaCreditoPresumidoAdquirente || false,
      }));
      base.fonteAliquotas = 'CBS API (Dados Abertos) + local';
    }
  }

  return base;
}
