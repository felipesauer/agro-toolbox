import { UNIDADES_AREA } from "@/lib/constants/conversoes";
import { round } from "@/lib/utils";

export interface ConversorMedidasInput {
  valor: number;
  de: string;
  para: string;
}

export interface ConversorMedidasResult {
  valorOriginal: number;
  unidadeOrigem: string;
  unidadeDestino: string;
  resultado: number;
  m2?: number;
  formula: string;
  equivalencias?: Record<string, number>;
}

export function converterMedidas({
  valor,
  de,
  para,
}: ConversorMedidasInput): ConversorMedidasResult {
  const origem = UNIDADES_AREA[de as keyof typeof UNIDADES_AREA];
  const destino = UNIDADES_AREA[para as keyof typeof UNIDADES_AREA];

  if (!origem || !destino) {
    throw new Error(`Unidade desconhecida: ${!origem ? de : para}`);
  }

  const m2 = valor * origem.m2;
  const resultado = m2 / destino.m2;

  const equivalencias: Record<string, number> = {};
  for (const [key, unit] of Object.entries(UNIDADES_AREA)) {
    if (key !== de && key !== para) {
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
