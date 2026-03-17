import { round } from "@/lib/utils";

export interface VolumeCaldaInput {
  vazaoBico: number; // L/min
  numBicos: number;
  espacamentoBicos: number; // cm
  velocidade: number; // km/h
  capacidadeTanque?: number;
  areaTotal?: number;
}

export function calcularVolumeCalda({
  vazaoBico,
  numBicos,
  espacamentoBicos,
  velocidade,
  capacidadeTanque,
  areaTotal,
}: VolumeCaldaInput) {
  const volumeHa = (vazaoBico * 60000) / (espacamentoBicos * velocidade);
  const vazaoTotalBarra = vazaoBico * numBicos;

  const volumeTotal = areaTotal ? round(volumeHa * areaTotal, 2) : undefined;
  const areaPorTanque = capacidadeTanque ? round(capacidadeTanque / volumeHa, 2) : undefined;
  const numTanques = capacidadeTanque && volumeTotal ? Math.ceil(volumeTotal / capacidadeTanque) : undefined;

  return {
    vazaoBico,
    numBicos,
    espacamentoBicos,
    velocidade,
    volumeHa: round(volumeHa, 2),
    vazaoTotalBarra: round(vazaoTotalBarra, 2),
    formula: `(${vazaoBico} L/min × 60000) / (${espacamentoBicos} cm × ${velocidade} km/h) = ${round(volumeHa, 2)} L/ha`,
    areaPorTanque,
    volumeTotal,
    numTanques,
  };
}
