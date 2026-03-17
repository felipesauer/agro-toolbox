import { round } from "@/lib/utils";

export interface CapacidadeCargaInput {
  pesoTotalKg: number;
  capacidadeCaminhaoKg?: number;
  distanciaKm?: number;
  velocidadeMedia?: number;
}

export function calcularCapacidadeCarga({
  pesoTotalKg,
  capacidadeCaminhaoKg = 37000,
  distanciaKm,
  velocidadeMedia = 60,
}: CapacidadeCargaInput) {
  const numeroViagens = Math.ceil(pesoTotalKg / capacidadeCaminhaoKg);
  const restante = pesoTotalKg % capacidadeCaminhaoKg;
  const cargaUltimaViagem = restante === 0 ? capacidadeCaminhaoKg : restante;
  const aproveitamentoUltimaViagem = (cargaUltimaViagem / capacidadeCaminhaoKg) * 100;

  const tempoEstimadoTotal = distanciaKm ? round(((distanciaKm * 2) / velocidadeMedia) * numeroViagens, 1) : undefined;

  return {
    pesoTotalKg,
    capacidadeCaminhaoKg,
    numeroViagens,
    cargaUltimaViagem: round(cargaUltimaViagem, 2),
    aproveitamentoUltimaViagem: round(aproveitamentoUltimaViagem, 2),
    tempoEstimadoTotal,
  };
}
