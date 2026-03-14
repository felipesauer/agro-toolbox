// Fundos estaduais de investimento — valores por tonelada (R$/ton)
// Atualizado: referência 2026 — verificar atualizações semestrais

export interface FundoItem {
  [key: string]: number | string | undefined;
  total: number;
  unidade: string;
  observacao?: string;
}

export interface FundoEstado {
  nome: string;
  fundos: Record<string, FundoItem>;
}

export const FUNDOS: Record<string, FundoEstado> = {
  MT: {
    nome: "FETHAB + FACS/IAGRO",
    fundos: {
      soja: { fethab: 35.18, facs: 1.98, total: 37.16, unidade: "R$/ton" },
      milho: { fethab: 8.3, facs: 0.0, total: 8.3, unidade: "R$/ton" },
      algodao: { fethab: 95.2, facs: 4.5, total: 99.7, unidade: "R$/ton" },
      gado: { fethab: 43.05, facs: 0.0, total: 43.05, unidade: "R$/cabeça" },
      sorgo: { fethab: 4.1, facs: 0.0, total: 4.1, unidade: "R$/ton" },
    },
  },
  GO: {
    nome: "FUNDEINFRA",
    fundos: {
      soja: { fundeinfra: 20.4, total: 20.4, unidade: "R$/ton" },
      milho: { fundeinfra: 8.15, total: 8.15, unidade: "R$/ton" },
      algodao: { fundeinfra: 83.8, total: 83.8, unidade: "R$/ton" },
      gado: { fundeinfra: 4.66, total: 4.66, unidade: "R$/cabeça" },
      sorgo: { fundeinfra: 6.5, total: 6.5, unidade: "R$/ton" },
    },
  },
  MS: {
    nome: "FUNDERSUL",
    fundos: {
      soja: { fundersul: 18.1, total: 18.1, unidade: "R$/ton" },
      milho: { fundersul: 5.45, total: 5.45, unidade: "R$/ton" },
      gado: { fundersul: 16.38, total: 16.38, unidade: "R$/cabeça" },
    },
  },
  MG: {
    nome: "FEEF/MG",
    fundos: {
      cafe: {
        feef: 0,
        total: 0,
        unidade: "R$/ton",
        observacao: "Isento — diferimento ICMS café em MG",
      },
    },
  },
  BA: {
    nome: "FUNDAGRO",
    fundos: {
      soja: { fundagro: 12.6, total: 12.6, unidade: "R$/ton" },
      algodao: { fundagro: 57.75, total: 57.75, unidade: "R$/ton" },
    },
  },
  TO: {
    nome: "FUNDO ESTADUAL TO",
    fundos: {
      soja: { fundo: 10.0, total: 10.0, unidade: "R$/ton" },
      gado: { fundo: 3.5, total: 3.5, unidade: "R$/cabeça" },
    },
  },
  PR: {
    nome: "FUNDO (não aplicável)",
    fundos: {},
  },
};

export const ESTADOS_FUNDOS = Object.keys(FUNDOS);
export const ESTADOS_FUNDOS_OPTIONS = ESTADOS_FUNDOS.map((uf) => ({
  value: uf,
  label: `${uf} — ${FUNDOS[uf].nome}`,
}));
