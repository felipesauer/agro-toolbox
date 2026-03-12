import { CULTURAS } from '../constants/culturas.js';
import { round } from '../utils/formatters.js';

export function calcularEstimativaProdutividade({ plantasPorM2, estruturasPorPlanta, graosPorEstrutura, pms, cultura, area }) {
  // kg/ha = (plantas/m² × estruturas/planta × grãos/estrutura × PMS em g) / 1000 × 10000
  // Simplificado: kg/ha = plantas/m² × estruturas × grãos × PMS(g) / 100
  const kgPorHa = (plantasPorM2 * estruturasPorPlanta * graosPorEstrutura * pms) / 100;

  const pesoSaca = cultura && CULTURAS[cultura] ? CULTURAS[cultura].pesoSaca : 60;
  const sacasPorHa = kgPorHa / pesoSaca;
  const tonPorHa = kgPorHa / 1000;

  const result = {
    plantasPorM2,
    estruturasPorPlanta,
    graosPorEstrutura,
    pms,
    cultura: cultura ? CULTURAS[cultura]?.nome || cultura : null,
    pesoSaca,
    kgPorHa: round(kgPorHa, 2),
    sacasPorHa: round(sacasPorHa, 2),
    tonPorHa: round(tonPorHa, 2),
    formula: `(${plantasPorM2} × ${estruturasPorPlanta} × ${graosPorEstrutura} × ${pms}g) / 100 = ${round(kgPorHa, 2)} kg/ha`,
  };

  if (area) {
    result.area = area;
    result.producaoTotalKg = round(kgPorHa * area, 2);
    result.producaoTotalSacas = round(sacasPorHa * area, 2);
    result.producaoTotalTon = round(tonPorHa * area, 2);
  }

  return result;
}
