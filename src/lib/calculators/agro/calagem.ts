import { round } from "@/lib/utils";

export interface CalagemInput {
  ctc: number;
  saturacaoAtual: number;
  saturacaoDesejada: number;
  prnt: number;
  area?: number;
  gessagem?: boolean;
  argila?: number;
}

export interface CalagemResult {
  ctc: number;
  saturacaoAtual: number;
  saturacaoDesejada: number;
  prnt: number;
  area: number;
  ncTHa: number;
  calcarioCorrigido: number;
  totalToneladas: number;
  formula: string;
  gessagem?: {
    gessagemTHa: number;
    gessagemTotal: number;
    formula: string;
  };
}

export function calcularCalagem({
  ctc,
  saturacaoAtual,
  saturacaoDesejada,
  prnt,
  area = 1,
  gessagem = false,
  argila,
}: CalagemInput): CalagemResult {
  const base = { ctc, saturacaoAtual, saturacaoDesejada, prnt, area };

  if (saturacaoAtual >= saturacaoDesejada) {
    return {
      ...base,
      ncTHa: 0,
      calcarioCorrigido: 0,
      totalToneladas: 0,
      formula: "Saturação atual já está acima do desejado — calagem não necessária.",
      ...(gessagem && argila ? { gessagem: calcularGessagem(argila, area) } : {}),
    };
  }

  // NC (t/ha) = (V2 - V1) × CTC / 100 / (PRNT/100)
  const nc = ((saturacaoDesejada - saturacaoAtual) * ctc) / 100 / (prnt / 100);

  return {
    ...base,
    ncTHa: round(nc, 2),
    calcarioCorrigido: round(nc, 2),
    totalToneladas: round(nc * area, 2),
    formula: `(${saturacaoDesejada} - ${saturacaoAtual}) × ${ctc} / 100 / (${prnt}/100) = ${round(nc, 2)} t/ha`,
    ...(gessagem && argila ? { gessagem: calcularGessagem(argila, area) } : {}),
  };
}

function calcularGessagem(argila: number, area: number) {
  const fator = argila >= 35 ? 50 : 75;
  const ngKgHa = argila * fator;
  return {
    gessagemTHa: round(ngKgHa / 1000, 2),
    gessagemTotal: round((ngKgHa / 1000) * area, 2),
    formula: `${argila}% argila × ${fator} = ${round(ngKgHa, 0)} kg/ha`,
  };
}
