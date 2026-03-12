import { TABELA_ITR } from '../constants/aliquotas.js';
import { round } from '../utils/formatters.js';

export function calcularEstimativaItr({ areaTotal, areaUtilizada, areaPreservacao, vtn, areaUtilizadaAlternativa }) {
  const areaAproveitavel = areaTotal - areaPreservacao;
  const grauUtilizacao = areaAproveitavel > 0
    ? (areaUtilizada / areaAproveitavel) * 100
    : 0;

  // Encontrar faixa de área
  const faixaAreaIdx = TABELA_ITR.faixasArea.findIndex((f) => areaTotal <= f.ate);
  const faixaGUIdx = TABELA_ITR.faixasGU.findIndex((f) => grauUtilizacao <= f.ate);

  const aliquota = TABELA_ITR.aliquotas[faixaAreaIdx]?.[faixaGUIdx] ?? 0;

  // VTNt = (VTN / área total) × (área total - área isenta)
  const vtnPorHa = vtn / areaTotal;
  const areaTributavel = areaTotal - areaPreservacao;
  const vtnTributavel = vtnPorHa * areaTributavel;

  const itrEstimado = round(vtnTributavel * (aliquota / 100), 2);
  const itrPorHa = areaTotal > 0 ? round(itrEstimado / areaTotal, 2) : 0;

  const result = {
    areaTotal,
    areaUtilizada,
    areaPreservacao,
    areaAproveitavel: round(areaAproveitavel, 2),
    grauUtilizacao: round(grauUtilizacao, 2),
    faixaArea: TABELA_ITR.faixasArea[faixaAreaIdx]?.label,
    faixaGU: TABELA_ITR.faixasGU[faixaGUIdx]?.label,
    aliquota,
    vtnPorHa: round(vtnPorHa, 2),
    vtnTributavel: round(vtnTributavel, 2),
    itrEstimado,
    itrPorHa,
  };

  // Scenario: if they increase area utilizada
  if (areaUtilizadaAlternativa) {
    const guAlt = areaAproveitavel > 0 ? (areaUtilizadaAlternativa / areaAproveitavel) * 100 : 0;
    const faixaGUAltIdx = TABELA_ITR.faixasGU.findIndex((f) => guAlt <= f.ate);
    const aliquotaAlt = TABELA_ITR.aliquotas[faixaAreaIdx]?.[faixaGUAltIdx] ?? 0;
    const itrAlternativo = round(vtnTributavel * (aliquotaAlt / 100), 2);

    result.cenarioAlternativo = {
      areaUtilizada: areaUtilizadaAlternativa,
      grauUtilizacao: round(guAlt, 2),
      faixaGU: TABELA_ITR.faixasGU[faixaGUAltIdx]?.label,
      aliquota: aliquotaAlt,
      itrEstimado: itrAlternativo,
      economia: round(itrEstimado - itrAlternativo, 2),
    };
  }

  return result;
}
