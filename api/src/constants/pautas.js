// Pautas fiscais por estado — base de cálculo mínima para ICMS (R$/ton)
// Atualizado: referência 2026 — verificar comunicados de cada SEFAZ
export const PAUTAS = {
  MT: {
    soja: { pauta: 1520.00, vigencia: '2026-01' },
    milho: { pauta: 610.00, vigencia: '2026-01' },
    algodao: { pauta: 5100.00, vigencia: '2026-01' },
    arroz: { pauta: 1150.00, vigencia: '2026-01' },
    sorgo: { pauta: 510.00, vigencia: '2026-01' },
    gado: { pauta: 295.00, vigencia: '2026-01', unidade: 'R$/arroba' },
    girassol: { pauta: 2200.00, vigencia: '2026-01' },
  },
  GO: {
    soja: { pauta: 1470.00, vigencia: '2026-01' },
    milho: { pauta: 590.00, vigencia: '2026-01' },
    sorgo: { pauta: 490.00, vigencia: '2026-01' },
    gado: { pauta: 290.00, vigencia: '2026-01', unidade: 'R$/arroba' },
  },
  MS: {
    soja: { pauta: 1490.00, vigencia: '2026-01' },
    milho: { pauta: 580.00, vigencia: '2026-01' },
    gado: { pauta: 305.00, vigencia: '2026-01', unidade: 'R$/arroba' },
  },
  MG: {
    cafe: { pauta: 4800.00, vigencia: '2026-01' },
    milho: { pauta: 630.00, vigencia: '2026-01' },
    gado: { pauta: 280.00, vigencia: '2026-01', unidade: 'R$/arroba' },
  },
  PR: {
    soja: { pauta: 1450.00, vigencia: '2026-01' },
    milho: { pauta: 570.00, vigencia: '2026-01' },
    trigo: { pauta: 1380.00, vigencia: '2026-01' },
  },
  SP: {
    cafe: { pauta: 4900.00, vigencia: '2026-01' },
    gado: { pauta: 315.00, vigencia: '2026-01', unidade: 'R$/arroba' },
  },
  BA: {
    soja: { pauta: 1450.00, vigencia: '2026-01' },
    algodao: { pauta: 4950.00, vigencia: '2026-01' },
  },
  TO: {
    soja: { pauta: 1430.00, vigencia: '2026-01' },
    milho: { pauta: 560.00, vigencia: '2026-01' },
  },
};
