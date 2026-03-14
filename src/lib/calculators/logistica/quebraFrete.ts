import { round } from "@/lib/utils";

const TOLERANCIAS_PADRAO: Record<string, number> = {
  graos: 0.25,
  liquidos: 0.3,
  fertilizantes: 0.5,
  pecuaria: 0.0,
};

export type TipoCarga = "graos" | "liquidos" | "fertilizantes" | "pecuaria";

export interface QuebraFreteInput {
  pesoOrigem: number;
  pesoDestino: number;
  tolerancia?: number;
  tipoCarga?: TipoCarga;
  precoUnitario?: number;
  distanciaKm?: number;
}

export function calcularQuebraFrete({
  pesoOrigem,
  pesoDestino,
  tolerancia,
  tipoCarga,
  precoUnitario,
  distanciaKm,
}: QuebraFreteInput) {
  const toleranciaFinal =
    tolerancia ?? (tipoCarga ? TOLERANCIAS_PADRAO[tipoCarga] : 0.25) ?? 0.25;
  const toleranciaDecimal = toleranciaFinal / 100;
  const pesoMinimoEsperado = pesoOrigem * (1 - toleranciaDecimal);
  const quebraReal = pesoOrigem - pesoDestino;
  const quebraPercentual = (quebraReal / pesoOrigem) * 100;
  const quebraExcedente = Math.max(0, quebraReal - pesoOrigem * toleranciaDecimal);
  const dentroTolerancia = quebraPercentual <= toleranciaFinal;

  const valorPrejuizo = precoUnitario && quebraExcedente > 0 ? round(quebraExcedente * precoUnitario, 2) : undefined;
  const quebraPorKm = distanciaKm ? round(quebraPercentual / distanciaKm, 6) : undefined;
  const quebraAtipica = distanciaKm ? (quebraPercentual / distanciaKm) > 0.001 : undefined;

  return {
    pesoOrigem,
    pesoDestino,
    tolerancia: toleranciaFinal,
    tipoCarga: tipoCarga ?? null,
    pesoMinimoEsperado: round(pesoMinimoEsperado, 2),
    quebraReal: round(quebraReal, 2),
    quebraPercentual: round(quebraPercentual, 2),
    quebraExcedente: round(quebraExcedente, 2),
    dentroTolerancia,
    valorPrejuizo,
    quebraPorKm,
    quebraAtipica,
  };
}
