import { round } from '../utils/formatters.js';

export function calcularQuebraPesoNota({ pesoNota, pesoReal, valorUnitario, aliquotaICMS }) {
  const diferenca = pesoReal - pesoNota;
  const valorComplementar = diferenca * valorUnitario;
  const icmsComplementar = valorComplementar * (aliquotaICMS / 100);

  return {
    pesoNota,
    pesoReal,
    diferenca: round(diferenca, 2),
    valorComplementar: round(valorComplementar, 2),
    icmsComplementar: round(icmsComplementar, 2),
    aliquotaICMS,
  };
}
