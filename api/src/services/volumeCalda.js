import { round } from '../utils/formatters.js';

export function calcularVolumeCalda({ vazaoBico, numBicos, espacamentoBicos, velocidade }) {
  // Q (L/ha) = (vazaoBico × 60000) / (espacamentoBicos × velocidade)
  // vazaoBico em L/min, espacamentoBicos em cm, velocidade em km/h
  const volumeHa = (vazaoBico * 60000) / (espacamentoBicos * velocidade);

  return {
    vazaoBico,
    numBicos,
    espacamentoBicos,
    velocidade,
    volumeHa: round(volumeHa, 2),
    formula: `(${vazaoBico} L/min × 60000) / (${espacamentoBicos} cm × ${velocidade} km/h) = ${round(volumeHa, 2)} L/ha`,
  };
}
