import { TABELA_ITR } from '../constants/aliquotas.js';
import { round } from '../utils/formatters.js';

export function calcularEstimativaItr({ areaTotal, areaUtilizada, areaPreservacao, vtn }) {
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

  return {
    areaTotal,
    areaUtilizada,
    areaPreservacao,
    grauUtilizacao: round(grauUtilizacao, 2),
    faixaArea: TABELA_ITR.faixasArea[faixaAreaIdx]?.label,
    faixaGU: TABELA_ITR.faixasGU[faixaGUIdx]?.label,
    aliquota,
    vtnTributavel: round(vtnTributavel, 2),
    itrEstimado,
  };
}
