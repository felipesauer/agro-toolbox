import { round } from '../utils/formatters.js';

export function calcularEstimativaProdutividade({ plantasPorM2, estruturasPorPlanta, graosPorEstrutura, pms }) {
  // kg/ha = (plantas/m² × estruturas/planta × grãos/estrutura × PMS em g) / 1000 × 10000
  // Simplificado: kg/ha = plantas/m² × estruturas × grãos × PMS(g) / 100
  const kgPorHa = (plantasPorM2 * estruturasPorPlanta * graosPorEstrutura * pms) / 100;
  const sacasPorHa = kgPorHa / 60;

  return {
    plantasPorM2,
    estruturasPorPlanta,
    graosPorEstrutura,
    pms,
    kgPorHa: round(kgPorHa, 2),
    sacasPorHa: round(sacasPorHa, 2),
    formula: `(${plantasPorM2} × ${estruturasPorPlanta} × ${graosPorEstrutura} × ${pms}g) / 100 = ${round(kgPorHa, 2)} kg/ha`,
  };
}
