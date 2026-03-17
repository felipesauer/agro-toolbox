import { CULTURAS } from "@/lib/constants/culturas";
import { round } from "@/lib/utils";

export interface EstimativaProdutividadeInput {
  plantasPorM2: number;
  estruturasPorPlanta: number;
  graosPorEstrutura: number;
  pms: number;
  cultura?: string;
  area?: number;
}

export function calcularEstimativaProdutividade({
  plantasPorM2,
  estruturasPorPlanta,
  graosPorEstrutura,
  pms,
  cultura,
  area,
}: EstimativaProdutividadeInput) {
  const kgPorHa =
    (plantasPorM2 * estruturasPorPlanta * graosPorEstrutura * pms) / 100;
  const pesoSaca = cultura && CULTURAS[cultura] ? (CULTURAS[cultura].pesoSaca ?? 60) : 60;
  const sacasPorHa = kgPorHa / pesoSaca;
  const tonPorHa = kgPorHa / 1000;

  return {
    plantasPorM2,
    estruturasPorPlanta,
    graosPorEstrutura,
    pms,
    cultura: cultura ? CULTURAS[cultura]?.nome ?? cultura : null,
    pesoSaca,
    kgPorHa: round(kgPorHa, 2),
    sacasPorHa: round(sacasPorHa, 2),
    tonPorHa: round(tonPorHa, 2),
    area: area ?? null,
    producaoTotalKg: area ? round(kgPorHa * area, 2) : null,
    producaoTotalSacas: area ? round(sacasPorHa * area, 2) : null,
    producaoTotalTon: area ? round(tonPorHa * area, 2) : null,
  };
}
