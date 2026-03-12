import { round } from '../utils/formatters.js';

// Rendimento padrão por categoria animal (%)
const RENDIMENTOS = {
  boi_gordo: 52,
  vaca_gorda: 50,
  novilho: 54,
  novilha: 50,
  bezerro: 48,
  bubalino: 50,
};

export function calcularPesoArroba({ pesoVivo, rendimentoCarcaca, categoria, precoArroba, numAnimais = 1 }) {
  const rendimento = rendimentoCarcaca ?? RENDIMENTOS[categoria] ?? 50;

  const pesoCarcaca = pesoVivo * (rendimento / 100);
  const arrobas = pesoCarcaca / 15;

  const result = {
    pesoVivo,
    rendimentoCarcaca: rendimento,
    categoria: categoria || null,
    pesoCarcaca: round(pesoCarcaca, 2),
    arrobas: round(arrobas, 2),
    formula: `(${pesoVivo}kg × ${rendimento}%) / 15 = ${round(arrobas, 2)}@`,
  };

  if (numAnimais > 1) {
    result.numAnimais = numAnimais;
    result.arrobasTotais = round(arrobas * numAnimais, 2);
    result.pesoCarcacaTotal = round(pesoCarcaca * numAnimais, 2);
  }

  if (precoArroba) {
    result.precoArroba = precoArroba;
    result.valorAnimal = round(arrobas * precoArroba, 2);
    result.valorTotal = round(arrobas * precoArroba * numAnimais, 2);
  }

  return result;
}
