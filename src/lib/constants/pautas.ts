// Pautas fiscais por estado — base de cálculo mínima para ICMS (R$/ton)
// Atualizado: referência 2026
export const PAUTAS: Record<
  string,
  Record<string, { pauta: number; vigencia: string; unidade?: string }>
> = {
  MT: {
    soja: { pauta: 1520.0, vigencia: "2026-01" },
    milho: { pauta: 610.0, vigencia: "2026-01" },
    algodao: { pauta: 5100.0, vigencia: "2026-01" },
    arroz: { pauta: 1150.0, vigencia: "2026-01" },
    sorgo: { pauta: 510.0, vigencia: "2026-01" },
    gado: { pauta: 295.0, vigencia: "2026-01", unidade: "R$/arroba" },
    girassol: { pauta: 2200.0, vigencia: "2026-01" },
  },
  GO: {
    soja: { pauta: 1470.0, vigencia: "2026-01" },
    milho: { pauta: 590.0, vigencia: "2026-01" },
    sorgo: { pauta: 490.0, vigencia: "2026-01" },
    gado: { pauta: 290.0, vigencia: "2026-01", unidade: "R$/arroba" },
  },
  MS: {
    soja: { pauta: 1490.0, vigencia: "2026-01" },
    milho: { pauta: 580.0, vigencia: "2026-01" },
    gado: { pauta: 305.0, vigencia: "2026-01", unidade: "R$/arroba" },
  },
  MG: {
    cafe: { pauta: 4800.0, vigencia: "2026-01" },
    milho: { pauta: 630.0, vigencia: "2026-01" },
    gado: { pauta: 280.0, vigencia: "2026-01", unidade: "R$/arroba" },
  },
  PR: {
    soja: { pauta: 1450.0, vigencia: "2026-01" },
    milho: { pauta: 570.0, vigencia: "2026-01" },
    trigo: { pauta: 1380.0, vigencia: "2026-01" },
  },
  SP: {
    cafe: { pauta: 4900.0, vigencia: "2026-01" },
    gado: { pauta: 315.0, vigencia: "2026-01", unidade: "R$/arroba" },
  },
  BA: {
    soja: { pauta: 1450.0, vigencia: "2026-01" },
    algodao: { pauta: 4950.0, vigencia: "2026-01" },
  },
  TO: {
    soja: { pauta: 1430.0, vigencia: "2026-01" },
    milho: { pauta: 560.0, vigencia: "2026-01" },
  },
};

export const ESTADOS_PAUTAS = Object.keys(PAUTAS);
