// Alíquotas Funrural
export const FUNRURAL = {
  PF: {
    funrural: 0.012,   // 1,2%
    rat: 0.001,         // 0,1%
    senar: 0.002,       // 0,2%
    total: 0.015,       // 1,5%
  },
  PJ: {
    funrural: 0.015,   // 1,5%
    rat: 0.003,         // 0,3%
    senar: 0.0025,      // 0,25%
    total: 0.0205,      // 2,05%
  },
  folha: {
    patronal: 0.20,     // 20%
    rat: 0.03,           // até 3% (usar 2% como padrão)
    senar: 0.0025,       // 0,25% Senar sobre folha
  },
};

// Tabela Progressiva IRPF 2026 (valores atualizados pela Medida Provisória)
export const TABELA_IRPF = [
  { limite: 2_428.80 * 12, aliquota: 0, deducao: 0 },
  { limite: 2_826.65 * 12, aliquota: 0.075, deducao: 169.44 * 12 },
  { limite: 3_751.05 * 12, aliquota: 0.15, deducao: 381.44 * 12 },
  { limite: 4_664.68 * 12, aliquota: 0.225, deducao: 662.77 * 12 },
  { limite: Infinity, aliquota: 0.275, deducao: 896.00 * 12 },
];

// IRPF Rural — percentual de presunção
export const IRPF_RURAL_PRESUNCAO = 0.20; // 20% da receita bruta

// ITR — tabela de alíquotas por grau de utilização e área
// Linhas: área total (ha), Colunas: grau de utilização (%)
export const TABELA_ITR = {
  faixasArea: [
    { ate: 50, label: 'Até 50 ha' },
    { ate: 200, label: '50 a 200 ha' },
    { ate: 500, label: '200 a 500 ha' },
    { ate: 1000, label: '500 a 1.000 ha' },
    { ate: 5000, label: '1.000 a 5.000 ha' },
    { ate: Infinity, label: 'Acima de 5.000 ha' },
  ],
  faixasGU: [
    { ate: 30, label: 'Até 30%' },
    { ate: 50, label: '30% a 50%' },
    { ate: 65, label: '50% a 65%' },
    { ate: 80, label: '65% a 80%' },
    { ate: Infinity, label: 'Acima de 80%' },
  ],
  // aliquotas[faixaArea][faixaGU] em %
  aliquotas: [
    [1.0, 0.7, 0.4, 0.2, 0.03],
    [2.0, 1.4, 0.8, 0.4, 0.07],
    [3.3, 2.3, 1.3, 0.6, 0.1],
    [4.7, 3.3, 1.9, 0.85, 0.15],
    [6.0, 4.2, 2.4, 1.1, 0.2],
    [12.0, 8.4, 4.8, 2.2, 0.45],
  ],
};

// INSS e FGTS (para acerto safrista)
export const ENCARGOS_TRABALHISTAS = {
  fgts: 0.08,             // 8%
  inssPatronal: 0.20,     // 20%
  tercoFerias: 1 / 3,     // 1/3 constitucional
};

// Tabela INSS empregado 2026 (valores atualizados — Portaria MPS)
export const TABELA_INSS_EMPREGADO = [
  { limite: 1_556.94, aliquota: 0.075 },
  { limite: 2_765.66, aliquota: 0.09 },
  { limite: 4_152.56, aliquota: 0.12 },
  { limite: 8_305.12, aliquota: 0.14 },
];
