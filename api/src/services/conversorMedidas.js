import { UNIDADES_AREA } from '../constants/conversoes.js';
import { round } from '../utils/formatters.js';

export function converterMedidas({ valor, de, para }) {
  const origem = UNIDADES_AREA[de];
  const destino = UNIDADES_AREA[para];

  if (!origem || !destino) {
    throw new Error(`Unidade desconhecida: ${!origem ? de : para}. Disponíveis: ${Object.keys(UNIDADES_AREA).join(', ')}`);
  }

  // Linear units (braça linear) can only convert to/from other linear or m
  if (origem.linear || destino.linear) {
    if (origem.linear && destino.linear) {
      const resultado = (valor * origem.m2) / destino.m2;
      return { valorOriginal: valor, unidadeOrigem: origem.nome, unidadeDestino: destino.nome, resultado: round(resultado, 4), formula: `${valor} × (${origem.m2} / ${destino.m2})`, tipo: 'linear' };
    }
    throw new Error(`Conversão incompatível: não é possível converter medida linear (${origem.linear ? de : para}) para medida de área (${origem.linear ? para : de}).`);
  }

  const m2 = valor * origem.m2;
  const resultado = m2 / destino.m2;

  // Build equivalence table showing value in all other units
  const equivalencias = {};
  for (const [key, unit] of Object.entries(UNIDADES_AREA)) {
    if (key !== de && key !== para && !unit.linear) {
      equivalencias[unit.nome] = round(m2 / unit.m2, 4);
    }
  }

  return {
    valorOriginal: valor,
    unidadeOrigem: origem.nome,
    unidadeDestino: destino.nome,
    resultado: round(resultado, 4),
    m2: round(m2, 2),
    formula: `${valor} × (${origem.m2} / ${destino.m2})`,
    equivalencias,
  };
}
