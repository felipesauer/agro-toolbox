import { round } from '../utils/formatters.js';

export function calcularNecessidadeSementes({ populacaoDesejada, pms, germinacao, pureza = 100, espacamentoEntrelinhas = 50, area = 1 }) {
  // kg/ha = (população × PMS) / (germinação × pureza) — PMS em gramas
  const kgPorHa = (populacaoDesejada * pms) / ((germinacao / 100) * (pureza / 100)) / 1000;

  // Metros lineares por ha = 10.000 / (entrelinhas em metros)
  const metrosLinearesPorHa = 10_000 / (espacamentoEntrelinhas / 100);
  const sementesPorMetro = populacaoDesejada / metrosLinearesPorHa;

  // Sacas de sementes (saca padrão de 40kg)
  const sacasPorHa = kgPorHa / 40;

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
