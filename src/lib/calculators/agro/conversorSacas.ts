import { CULTURAS } from "@/lib/constants/culturas";
import { round } from "@/lib/utils";

export interface ConversorSacasInput {
  valor: number;
  de: "sacas" | "kg" | "toneladas";
  para: "sacas" | "kg" | "toneladas";
  cultura: string;
}

export function converterSacas({ valor, de, para, cultura }: ConversorSacasInput) {
  const culturaData = CULTURAS[cultura];
  if (!culturaData) throw new Error(`Cultura desconhecida: ${cultura}`);

  const pesoSaca = culturaData.pesoSaca ?? 60;

  const toKg: Record<string, (v: number) => number> = {
    sacas: (v) => v * pesoSaca,
    kg: (v) => v,
    toneladas: (v) => v * 1000,
  };
  const fromKg: Record<string, (v: number) => number> = {
    sacas: (v) => v / pesoSaca,
    kg: (v) => v,
    toneladas: (v) => v / 1000,
  };

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
