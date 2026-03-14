import { round } from "@/lib/utils";

export interface QuebraPesoNotaInput {
  pesoNota: number;
  pesoReal: number;
  valorUnitario: number;
  aliquotaICMS: number;
  aliquotaFunrural?: number;
  aliquotaPisCofins?: number;
}

export function calcularQuebraPesoNota({
  pesoNota,
  pesoReal,
  valorUnitario,
  aliquotaICMS,
  aliquotaFunrural,
  aliquotaPisCofins,
}: QuebraPesoNotaInput) {
  const diferenca = pesoReal - pesoNota;
  const valorComplementar = diferenca * valorUnitario;
  const icmsComplementar = valorComplementar * (aliquotaICMS / 100);

  const result: Record<string, number | undefined> = {
    pesoNota,
    pesoReal,
    diferenca: round(diferenca, 2),
    valorComplementar: round(valorComplementar, 2),
    icmsComplementar: round(icmsComplementar, 2),
    aliquotaICMS,
  };

  if (aliquotaFunrural != null) {
    result.funruralComplementar = round(
      valorComplementar * (aliquotaFunrural / 100),
      2
    );
    result.aliquotaFunrural = aliquotaFunrural;
  }

  if (aliquotaPisCofins != null) {
    result.pisCofinsComplementar = round(
      valorComplementar * (aliquotaPisCofins / 100),
      2
    );
    result.aliquotaPisCofins = aliquotaPisCofins;
  }

  const totalImpostos =
    (result.icmsComplementar || 0) +
    (result.funruralComplementar || 0) +
    (result.pisCofinsComplementar || 0);

  result.totalImpostosComplementar = round(totalImpostos, 2);
  result.valorLiquidoComplementar = round(valorComplementar - totalImpostos, 2);

  return result;
}
