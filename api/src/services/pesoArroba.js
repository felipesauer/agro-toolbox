import { round } from '../utils/formatters.js';

export function calcularPesoArroba({ pesoVivo, rendimentoCarcaca = 50 }) {
  const rendimento = rendimentoCarcaca / 100;
  const pesoCarcaca = pesoVivo * rendimento;
  const arrobas = pesoCarcaca / 15;

  return {
    pesoVivo,
    rendimentoCarcaca,
    pesoCarcaca: round(pesoCarcaca, 2),
    arrobas: round(arrobas, 2),
    formula: `(${pesoVivo}kg × ${rendimentoCarcaca}%) / 15 = ${round(arrobas, 2)}@`,
  };
}
