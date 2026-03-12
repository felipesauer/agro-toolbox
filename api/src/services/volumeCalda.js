import { round } from '../utils/formatters.js';

export function calcularVolumeCalda({ vazaoBico, numBicos, espacamentoBicos, velocidade, capacidadeTanque, areaTotal }) {
  // Q (L/ha) = (vazaoBico × 60000) / (espacamentoBicos × velocidade)
  // vazaoBico em L/min, espacamentoBicos em cm, velocidade em km/h
  const volumeHa = (vazaoBico * 60000) / (espacamentoBicos * velocidade);

  // Vazão total da barra
  const vazaoTotalBarra = vazaoBico * numBicos;

  const result = {
    vazaoBico,
    numBicos,
    espacamentoBicos,
    velocidade,
    volumeHa: round(volumeHa, 2),
    vazaoTotalBarra: round(vazaoTotalBarra, 2),
    formula: `(${vazaoBico} L/min × 60000) / (${espacamentoBicos} cm × ${velocidade} km/h) = ${round(volumeHa, 2)} L/ha`,
  };

  if (capacidadeTanque) {
    const areaPorTanque = capacidadeTanque / volumeHa;
    result.capacidadeTanque = capacidadeTanque;
    result.areaPorTanque = round(areaPorTanque, 2);
  }

  if (areaTotal) {
    const volumeTotal = volumeHa * areaTotal;
    result.areaTotal = areaTotal;
    result.volumeTotal = round(volumeTotal, 2);
    if (capacidadeTanque) {
      result.numTanques = Math.ceil(volumeTotal / capacidadeTanque);
    }
  }

  return result;
}
