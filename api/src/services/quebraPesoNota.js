import { round } from '../utils/formatters.js';

export function calcularQuebraPesoNota({ pesoNota, pesoReal, valorUnitario, aliquotaICMS, aliquotaFunrural, aliquotaPisCofins }) {
  const diferenca = pesoReal - pesoNota;
  const valorComplementar = diferenca * valorUnitario;
  const icmsComplementar = valorComplementar * (aliquotaICMS / 100);

  const result = {
    pesoNota,
    pesoReal,
    diferenca: round(diferenca, 2),
    valorComplementar: round(valorComplementar, 2),
    icmsComplementar: round(icmsComplementar, 2),
    aliquotaICMS,
  };

  if (aliquotaFunrural) {
    result.funruralComplementar = round(valorComplementar * (aliquotaFunrural / 100), 2);
    result.aliquotaFunrural = aliquotaFunrural;
  }

  if (aliquotaPisCofins) {
    result.pisCofinsComplementar = round(valorComplementar * (aliquotaPisCofins / 100), 2);
    result.aliquotaPisCofins = aliquotaPisCofins;
  }

  const totalImpostos = (result.icmsComplementar || 0) + (result.funruralComplementar || 0) + (result.pisCofinsComplementar || 0);
  result.totalImpostosComplementar = round(totalImpostos, 2);
  result.valorLiquidoComplementar = round(valorComplementar - totalImpostos, 2);

  return result;
}
