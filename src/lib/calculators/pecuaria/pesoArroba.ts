import { round } from "@/lib/utils";

const RENDIMENTOS: Record<string, number> = {
  boi_gordo: 52,
  vaca_gorda: 50,
  novilho: 54,
  novilha: 50,
  bezerro: 48,
  bubalino: 50,
};

export interface PesoArrobaInput {
  pesoVivo: number;
  rendimentoCarcaca?: number;
  categoria?: string;
  precoArroba?: number;
  numAnimais?: number;
}

export function calcularPesoArroba({
  pesoVivo,
  rendimentoCarcaca,
  categoria,
  precoArroba,
  numAnimais = 1,
}: PesoArrobaInput) {
  const rendimento = rendimentoCarcaca ?? (categoria ? RENDIMENTOS[categoria] : undefined) ?? 50;
  const pesoCarcaca = pesoVivo * (rendimento / 100);
  const arrobas = pesoCarcaca / 15;

  return {
    pesoVivo,
    rendimentoCarcaca: rendimento,
    categoria: categoria ?? null,
    pesoCarcaca: round(pesoCarcaca, 2),
    arrobas: round(arrobas, 2),
    formula: `(${pesoVivo}kg × ${rendimento}%) / 15 = ${round(arrobas, 2)}@`,
    arrobasTotais: numAnimais > 1 ? round(arrobas * numAnimais, 2) : undefined,
    pesoCarcacaTotal: numAnimais > 1 ? round(pesoCarcaca * numAnimais, 2) : undefined,
    valorAnimal: precoArroba ? round(arrobas * precoArroba, 2) : undefined,
    valorTotal: precoArroba ? round(arrobas * precoArroba * numAnimais, 2) : undefined,
  };
}
