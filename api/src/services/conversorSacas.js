import { CULTURAS } from '../constants/culturas.js';
import { round } from '../utils/formatters.js';

const UNIDADES = ['sacas', 'kg', 'toneladas'];

export function converterSacas({ valor, de, para, cultura }) {
  if (!UNIDADES.includes(de) || !UNIDADES.includes(para)) {
    throw new Error(`Unidade inválida: ${de} ou ${para}`);
  }

  const culturaData = CULTURAS[cultura];
  if (!culturaData) {
    throw new Error(`Cultura desconhecida: ${cultura}`);
  }

  const pesoSaca = culturaData.pesoSaca;

  // Converter para kg primeiro
  const toKg = { sacas: (v) => v * pesoSaca, kg: (v) => v, toneladas: (v) => v * 1000 };
  const fromKg = { sacas: (v) => v / pesoSaca, kg: (v) => v, toneladas: (v) => v / 1000 };

  const kg = toKg[de](valor);
  const resultado = fromKg[para](kg);

  return {
    valorOriginal: valor,
    de,
    para,
    cultura: culturaData.nome,
    pesoSaca,
    resultado: round(resultado, 4),
    formula: `${valor} ${de} → ${round(resultado, 4)} ${para} (saca de ${pesoSaca}kg)`,
  };
}
