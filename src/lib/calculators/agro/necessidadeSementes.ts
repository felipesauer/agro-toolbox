import { round } from "@/lib/utils";

export interface NecessidadeSementesInput {
  populacaoDesejada: number;
  pms: number;
  germinacao: number;
  pureza?: number;
  espacamentoEntrelinhas?: number;
  area?: number;
}

export function calcularNecessidadeSementes({
  populacaoDesejada,
  pms,
  germinacao,
  pureza = 100,
  espacamentoEntrelinhas = 50,
  area = 1,
}: NecessidadeSementesInput) {
  const kgPorHa =
    ((populacaoDesejada * pms) / ((germinacao / 100) * (pureza / 100))) / 1000;
  const metrosLinearesPorHa = 10_000 / (espacamentoEntrelinhas / 100);
  const sementesPorMetro = populacaoDesejada / metrosLinearesPorHa;
  const sacasPorHa = kgPorHa / 40; // saca padrão de 40kg

  return {
    populacaoDesejada,
    pms,
    germinacao,
    pureza,
    espacamentoEntrelinhas,
    kgPorHa: round(kgPorHa, 2),
    totalKg: round(kgPorHa * area, 2),
    area,
    sementesPorMetro: round(sementesPorMetro, 1),
    sacasPorHa: round(sacasPorHa, 2),
    totalSacas: round(sacasPorHa * area, 2),
    formula: `(${populacaoDesejada} × ${pms}g) / (${germinacao}% × ${pureza}%) / 1000 = ${round(kgPorHa, 2)} kg/ha`,
  };
}
