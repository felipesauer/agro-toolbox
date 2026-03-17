// Tabela CFOP para operações agropecuárias comuns
// Fonte: Convênio S/N de 1970 (CONFAZ)

export interface CfopEntry {
  cfop: string;
  descricao: string;
}

type Destino = "mesmo_estado" | "outro_estado" | "exterior";
type TipoOp = "saida" | "entrada";

export const CFOP_TABLE: Record<TipoOp, Record<Destino, Record<string, CfopEntry>>> = {
  saida: {
    mesmo_estado: {
      venda: { cfop: "5.101", descricao: "Venda de produção do estabelecimento" },
      venda_entrega_futura: { cfop: "5.116", descricao: "Venda de produção para entrega futura" },
      venda_ordem: { cfop: "5.120", descricao: "Venda de mercadoria adquirida — entrega por conta e ordem" },
      remessa_deposito: { cfop: "5.905", descricao: "Remessa para depósito fechado ou armazém-geral" },
      remessa_beneficiamento: { cfop: "5.901", descricao: "Remessa para industrialização por encomenda" },
      remessa_armazem_geral: { cfop: "5.934", descricao: "Remessa simbólica de mercadoria depositada em armazém-geral" },
      remessa_consignacao: { cfop: "5.917", descricao: "Remessa de mercadoria em consignação" },
      devolucao_compra: { cfop: "5.201", descricao: "Devolução de compra para industrialização ou produção rural" },
      devolucao_consumo: { cfop: "5.202", descricao: "Devolução de compra para comercialização" },
      transferencia: { cfop: "5.151", descricao: "Transferência de produção do estabelecimento" },
      transferencia_ativo: { cfop: "5.552", descricao: "Transferência de bem do ativo imobilizado" },
      bonificacao: { cfop: "5.910", descricao: "Remessa em bonificação, doação ou brinde" },
      nota_complementar: { cfop: "5.949", descricao: "Outra saída não especificada (complementar, ajuste)" },
    },
    outro_estado: {
      venda: { cfop: "6.101", descricao: "Venda de produção do estabelecimento" },
      venda_entrega_futura: { cfop: "6.116", descricao: "Venda de produção para entrega futura" },
      venda_ordem: { cfop: "6.120", descricao: "Venda de mercadoria adquirida — entrega por conta e ordem" },
      remessa_deposito: { cfop: "6.905", descricao: "Remessa para depósito fechado ou armazém-geral" },
      remessa_beneficiamento: { cfop: "6.901", descricao: "Remessa para industrialização por encomenda" },
      remessa_armazem_geral: { cfop: "6.934", descricao: "Remessa simbólica de mercadoria depositada em armazém-geral" },
      remessa_consignacao: { cfop: "6.917", descricao: "Remessa de mercadoria em consignação" },
      devolucao_compra: { cfop: "6.201", descricao: "Devolução de compra para industrialização ou produção rural" },
      devolucao_consumo: { cfop: "6.202", descricao: "Devolução de compra para comercialização" },
      transferencia: { cfop: "6.151", descricao: "Transferência de produção do estabelecimento" },
      transferencia_ativo: { cfop: "6.552", descricao: "Transferência de bem do ativo imobilizado" },
      bonificacao: { cfop: "6.910", descricao: "Remessa em bonificação, doação ou brinde" },
      venda_nao_contribuinte: { cfop: "6.107", descricao: "Venda de produção para não contribuinte" },
      nota_complementar: { cfop: "6.949", descricao: "Outra saída não especificada (complementar, ajuste)" },
    },
    exterior: {
      venda: { cfop: "7.101", descricao: "Venda de produção do estabelecimento (exportação)" },
      venda_indireta: { cfop: "7.501", descricao: "Exportação indireta — formação de lote em recinto alfandegado" },
      devolucao_compra: { cfop: "7.201", descricao: "Devolução de compra para industrialização (importação)" },
    },
  },
  entrada: {
    mesmo_estado: {
      compra: { cfop: "1.101", descricao: "Compra para industrialização ou produção rural" },
      compra_comercializacao: { cfop: "1.102", descricao: "Compra para comercialização" },
      compra_energia: { cfop: "1.252", descricao: "Compra de energia elétrica para consumo no estabelecimento" },
      devolucao_venda: { cfop: "1.201", descricao: "Devolução de venda de produção do estabelecimento" },
      retorno_deposito: { cfop: "1.906", descricao: "Retorno de mercadoria de depósito ou armazém" },
      retorno_beneficiamento: { cfop: "1.902", descricao: "Retorno de mercadoria de industrialização por encomenda" },
      transferencia: { cfop: "1.151", descricao: "Transferência de produção do estabelecimento" },
      compra_ativo: { cfop: "1.551", descricao: "Compra de bem para o ativo imobilizado" },
      compra_uso_consumo: { cfop: "1.556", descricao: "Compra para uso ou consumo" },
      recebimento_consignacao: { cfop: "1.917", descricao: "Recebimento de mercadoria em consignação" },
    },
    outro_estado: {
      compra: { cfop: "2.101", descricao: "Compra para industrialização ou produção rural" },
      compra_comercializacao: { cfop: "2.102", descricao: "Compra para comercialização" },
      devolucao_venda: { cfop: "2.201", descricao: "Devolução de venda de produção do estabelecimento" },
      retorno_deposito: { cfop: "2.906", descricao: "Retorno de mercadoria de depósito ou armazém" },
      retorno_beneficiamento: { cfop: "2.902", descricao: "Retorno de mercadoria de industrialização por encomenda" },
      transferencia: { cfop: "2.151", descricao: "Transferência de produção do estabelecimento" },
      compra_ativo: { cfop: "2.551", descricao: "Compra de bem para o ativo imobilizado" },
      compra_uso_consumo: { cfop: "2.556", descricao: "Compra para uso ou consumo" },
      recebimento_consignacao: { cfop: "2.917", descricao: "Recebimento de mercadoria em consignação" },
    },
    exterior: {
      compra: { cfop: "3.101", descricao: "Compra para industrialização ou produção rural (importação)" },
      compra_comercializacao: { cfop: "3.102", descricao: "Compra para comercialização (importação)" },
      compra_ativo: { cfop: "3.551", descricao: "Compra de bem para o ativo imobilizado (importação)" },
      compra_uso_consumo: { cfop: "3.556", descricao: "Compra para uso ou consumo (importação)" },
    },
  },
};

export function getCfop(
  tipo: TipoOp,
  destino: Destino,
  operacao: string
): CfopEntry | undefined {
  return CFOP_TABLE[tipo]?.[destino]?.[operacao];
}

export const OPERACOES_SAIDA_OPTIONS = [
  { value: "venda", label: "Venda de produção própria" },
  { value: "venda_entrega_futura", label: "Venda para entrega futura" },
  { value: "venda_ordem", label: "Venda — entrega por conta e ordem" },
  { value: "remessa_deposito", label: "Remessa para depósito / armazém-geral" },
  { value: "remessa_beneficiamento", label: "Remessa para beneficiamento / industrialização" },
  { value: "remessa_consignacao", label: "Remessa em consignação" },
  { value: "devolucao_compra", label: "Devolução de compra" },
  { value: "transferencia", label: "Transferência entre estabelecimentos" },
  { value: "transferencia_ativo", label: "Transferência de ativo imobilizado" },
  { value: "bonificacao", label: "Bonificação / doação / brinde" },
  { value: "nota_complementar", label: "Nota complementar / ajuste" },
];

export const DESTINO_OPTIONS = [
  { value: "mesmo_estado", label: "Mesmo estado (dentro do estado)" },
  { value: "outro_estado", label: "Outro estado (operação interestadual)" },
  { value: "exterior", label: "Exterior (exportação)" },
];
