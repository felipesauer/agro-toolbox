// Fundos estaduais de investimento — valores por tonelada (R$/ton)
// Atualizado: referência 2026 — verificar atualizações semestrais
export const FUNDOS = {
  MT: {
    nome: 'FETHAB + FACS/IAGRO',
    fundos: {
      soja: { fethab: 35.18, facs: 1.98, total: 37.16, unidade: 'R$/ton' },
      milho: { fethab: 8.30, facs: 0.00, total: 8.30, unidade: 'R$/ton' },
      algodao: { fethab: 95.20, facs: 4.50, total: 99.70, unidade: 'R$/ton' },
      gado: { fethab: 43.05, facs: 0.00, total: 43.05, unidade: 'R$/cabeça' },
      sorgo: { fethab: 4.10, facs: 0.00, total: 4.10, unidade: 'R$/ton' },
    },
  },
  GO: {
    nome: 'FUNDEINFRA',
    fundos: {
      soja: { fundeinfra: 20.40, total: 20.40, unidade: 'R$/ton' },
      milho: { fundeinfra: 8.15, total: 8.15, unidade: 'R$/ton' },
      algodao: { fundeinfra: 83.80, total: 83.80, unidade: 'R$/ton' },
      gado: { fundeinfra: 4.66, total: 4.66, unidade: 'R$/cabeça' },
      sorgo: { fundeinfra: 6.50, total: 6.50, unidade: 'R$/ton' },
    },
  },
  MS: {
    nome: 'FUNDERSUL',
    fundos: {
      soja: { fundersul: 18.10, total: 18.10, unidade: 'R$/ton' },
      milho: { fundersul: 5.45, total: 5.45, unidade: 'R$/ton' },
      gado: { fundersul: 16.38, total: 16.38, unidade: 'R$/cabeça' },
    },
  },
  MG: {
    nome: 'FEEF/MG',
    fundos: {
      cafe: { feef: 0, total: 0, unidade: 'R$/ton', observacao: 'Isento — diferimento ICMS café em MG' },
    },
  },
  BA: {
    nome: 'FUNDAGRO',
    fundos: {
      soja: { fundagro: 12.60, total: 12.60, unidade: 'R$/ton' },
      algodao: { fundagro: 57.75, total: 57.75, unidade: 'R$/ton' },
    },
  },
  TO: {
    nome: 'FUNDO ESTADUAL TO',
    fundos: {
      soja: { fundo: 10.00, total: 10.00, unidade: 'R$/ton' },
      gado: { fundo: 3.50, total: 3.50, unidade: 'R$/cabeça' },
    },
  },
  PR: {
    nome: 'FUNDO (não aplicável)',
    fundos: {},
  },
};
