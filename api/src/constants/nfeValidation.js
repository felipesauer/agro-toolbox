// Referência de validação RTC (Reforma Tributária Consumo) para NF-e
// Baseado na NT 2025.002 v1.34 e MOC v7.0

// CSTs válidos para CBS/IBS
export const CST_CBS_IBS = [
  { codigo: '000', descricao: 'Tributação normal', grupo: 'Tributado' },
  { codigo: '010', descricao: 'Tributação com alíquota ad rem', grupo: 'Tributado' },
  { codigo: '100', descricao: 'Operação com alíquota reduzida', grupo: 'Reduzido' },
  { codigo: '110', descricao: 'Operação com alíquota reduzida ad rem', grupo: 'Reduzido' },
  { codigo: '200', descricao: 'Operação com alíquota zero', grupo: 'Zero' },
  { codigo: '300', descricao: 'Operação imune', grupo: 'Imune' },
  { codigo: '310', descricao: 'Imunidade com crédito', grupo: 'Imune' },
  { codigo: '400', descricao: 'Operação com suspensão', grupo: 'Suspenso' },
  { codigo: '500', descricao: 'Operação com diferimento', grupo: 'Diferido' },
  { codigo: '510', descricao: 'Diferimento parcial', grupo: 'Diferido' },
  { codigo: '800', descricao: 'IBS: Operação com crédito presumido', grupo: 'Crédito Presumido' },
  { codigo: '900', descricao: 'Outras situações', grupo: 'Outros' },
];

// Campos RTC na NF-e (grupo gIBSCBS)
export const CAMPOS_RTC = {
  gIBSCBS: {
    tag: 'gIBSCBS',
    descricao: 'Grupo de informações de IBS e CBS',
    pai: 'det/imposto',
    obrigatorio: true,
    regra: 'LA01',
  },
  CST: {
    tag: 'CST',
    descricao: 'Código da Situação Tributária CBS/IBS',
    pai: 'gIBSCBS',
    obrigatorio: true,
    regra: 'N12-30',
    tamanho: 3,
  },
  cClassTrib: {
    tag: 'cClassTrib',
    descricao: 'Código da classificação tributária',
    pai: 'gIBSCBS',
    obrigatorio: true,
    regra: 'LA01-20',
    tamanho: '1-10',
  },
  vBC: {
    tag: 'vBC',
    descricao: 'Base de cálculo CBS/IBS',
    pai: 'gIBSCBS',
    obrigatorio: true,
    regra: 'LA03',
    formato: 'decimal 15,2',
  },
  pCBS: {
    tag: 'pCBS',
    descricao: 'Alíquota da CBS (%)',
    pai: 'gIBSCBS/gCBS',
    obrigatorio: true,
    regra: 'LA04',
    formato: 'decimal 5,4',
  },
  vCBS: {
    tag: 'vCBS',
    descricao: 'Valor da CBS',
    pai: 'gIBSCBS/gCBS',
    obrigatorio: true,
    regra: 'LA05',
    formato: 'decimal 15,2',
  },
  pIBSUF: {
    tag: 'pIBSUF',
    descricao: 'Alíquota do IBS Estadual (%)',
    pai: 'gIBSCBS/gIBS',
    obrigatorio: true,
    regra: 'LA06',
    formato: 'decimal 5,4',
  },
  vIBSUF: {
    tag: 'vIBSUF',
    descricao: 'Valor do IBS Estadual',
    pai: 'gIBSCBS/gIBS',
    obrigatorio: true,
    regra: 'LA07',
    formato: 'decimal 15,2',
  },
  pIBSMun: {
    tag: 'pIBSMun',
    descricao: 'Alíquota do IBS Municipal (%)',
    pai: 'gIBSCBS/gIBS',
    obrigatorio: true,
    regra: 'LA08',
    formato: 'decimal 5,4',
  },
  vIBSMun: {
    tag: 'vIBSMun',
    descricao: 'Valor do IBS Municipal',
    pai: 'gIBSCBS/gIBS',
    obrigatorio: true,
    regra: 'LA09',
    formato: 'decimal 15,2',
  },
};

// DFe tipo ↔ cClassTrib permitidos
export const DFE_TIPOS = {
  nfe: { descricao: 'Nota Fiscal Eletrônica (NF-e)', modelo: 55 },
  nfce: { descricao: 'NF-e ao Consumidor (NFC-e)', modelo: 65 },
};

// Unidades tributáveis (uTrib) — NT 2016.001
export const UTRIB_CODIGOS = {
  UNID: { descricao: 'Unidade' },
  PC: { descricao: 'Peça' },
  PAR: { descricao: 'Par' },
  DZ: { descricao: 'Dúzia' },
  CX: { descricao: 'Caixa' },
  FD: { descricao: 'Fardo' },
  JOGO: { descricao: 'Jogo' },
  KG: { descricao: 'Quilograma' },
  TON: { descricao: 'Tonelada' },
  LT: { descricao: 'Litro' },
  M3: { descricao: 'Metro cúbico' },
  M: { descricao: 'Metro' },
  M2: { descricao: 'Metro quadrado' },
  SC: { descricao: 'Saca' },
  ARROBA: { descricao: 'Arroba (15 kg)' },
  CAB: { descricao: 'Cabeça' },
};
