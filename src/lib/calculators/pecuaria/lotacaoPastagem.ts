import { round } from "@/lib/utils";

export const FORRAGEIRAS: Record<
  string,
  { nome: string; suporteAguas: number; suporteSeca: number }
> = {
  braquiaria_decumbens: {
    nome: "Brachiaria decumbens",
    suporteAguas: 1.5,
    suporteSeca: 0.8,
  },
  braquiaria_brizantha: {
    nome: "Brachiaria brizantha (Marandu)",
    suporteAguas: 2.0,
    suporteSeca: 1.0,
  },
  panicum_mombaca: {
    nome: "Panicum maximum (Mombaça)",
    suporteAguas: 3.0,
    suporteSeca: 1.5,
  },
  panicum_tanzania: {
    nome: "Panicum maximum (Tanzânia)",
    suporteAguas: 2.5,
    suporteSeca: 1.2,
  },
  tifton: { nome: "Tifton 85", suporteAguas: 4.0, suporteSeca: 2.0 },
};

export const FORRAGEIRAS_OPTIONS = Object.entries(FORRAGEIRAS).map(
  ([key, f]) => ({ value: key, label: f.nome })
);

export interface LotacaoPastagemInput {
  numAnimais: number;
  pesoMedio: number;
  areaPastagem: number;
  forrageira?: string;
  periodo?: "aguas" | "seca";
}

export function calcularLotacaoPastagem({
  numAnimais,
  pesoMedio,
  areaPastagem,
  forrageira,
  periodo,
}: LotacaoPastagemInput) {
  const totalUA = (numAnimais * pesoMedio) / 450;
  const uaPorHa = totalUA / areaPastagem;

  let classificacao: string;
  if (uaPorHa < 0.5) classificacao = "Sublotação";
  else if (uaPorHa <= 1.5) classificacao = "Adequada";
  else if (uaPorHa <= 2.5) classificacao = "Lotação alta";
  else classificacao = "Superlotação";

  const f = forrageira ? FORRAGEIRAS[forrageira] : null;
  const suporte = f ? (periodo === "seca" ? f.suporteSeca : f.suporteAguas) : undefined;
  const capacidadeMaximaUA = suporte !== undefined ? round(suporte * areaPastagem, 2) : undefined;
  const animaisMaximos = suporte !== undefined && pesoMedio > 0
    ? Math.floor((suporte * areaPastagem * 450) / pesoMedio)
    : undefined;

  return {
    numAnimais,
    pesoMedio,
    areaPastagem,
    totalUA: round(totalUA, 2),
    uaPorHa: round(uaPorHa, 2),
    classificacao,
    formula: `(${numAnimais} × ${pesoMedio}kg / 450) / ${areaPastagem}ha = ${round(uaPorHa, 2)} UA/ha`,
    forrageira: f ? f.nome : undefined,
    periodo: f ? (periodo ?? "aguas") : undefined,
    suporteForrageira: suporte,
    capacidadeMaximaUA,
    animaisMaximos,
    excedente: animaisMaximos !== undefined ? Math.max(0, numAnimais - animaisMaximos) : undefined,
  };
}
