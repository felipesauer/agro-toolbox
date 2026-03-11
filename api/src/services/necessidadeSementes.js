import { round } from '../utils/formatters.js';

export function calcularNecessidadeSementes({ populacaoDesejada, pms, germinacao, pureza = 100 }) {
  // kg/ha = (população × PMS) / (germinação × pureza) — PMS em gramas
  const kgPorHa = (populacaoDesejada * pms) / ((germinacao / 100) * (pureza / 100)) / 1000;

  // Sementes por metro linear (considerando espaçamento de 0,50m padrão soja)
  const sementesPorMetro = populacaoDesejada / 20000; // 20.000 metros lineares por ha (0,50m entrelinhas)

  return {
    populacaoDesejada,
    pms,
    germinacao,
    pureza,
    kgPorHa: round(kgPorHa, 2),
    sementesPorMetro: round(sementesPorMetro, 1),
    formula: `(${populacaoDesejada} × ${pms}g) / (${germinacao}% × ${pureza}%) / 1000 = ${round(kgPorHa, 2)} kg/ha`,
  };
}
