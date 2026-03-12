import { round } from '../utils/formatters.js';

export function calcularCapacidadeCarga({ pesoTotalKg, capacidadeCaminhaoKg = 37000, distanciaKm, velocidadeMedia = 60 }) {
  const numeroViagens = Math.ceil(pesoTotalKg / capacidadeCaminhaoKg);
  const cargaUltimaViagem = pesoTotalKg % capacidadeCaminhaoKg || capacidadeCaminhaoKg;
  const aproveitamentoUltimaViagem = (cargaUltimaViagem / capacidadeCaminhaoKg) * 100;

  const result = {
    pesoTotalKg,
    capacidadeCaminhaoKg,
    numeroViagens,
    cargaUltimaViagem: round(cargaUltimaViagem, 2),
    aproveitamentoUltimaViagem: round(aproveitamentoUltimaViagem, 2),
  };

  if (distanciaKm) {
    const tempoIdaVoltaHoras = (distanciaKm * 2) / velocidadeMedia;
    result.distanciaKm = distanciaKm;
    result.velocidadeMedia = velocidadeMedia;
    result.tempoEstimadoTotal = round(tempoIdaVoltaHoras * numeroViagens, 1);
  }

  return result;
}
