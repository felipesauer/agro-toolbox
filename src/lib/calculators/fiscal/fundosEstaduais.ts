import { FUNDOS } from "@/lib/constants/fundos";
import { round } from "@/lib/utils";

export interface FundosEstaduaisInput {
  estado: string;
  produto: string;
  quantidade: number;
  valorOperacao: number;
}

export function calcularFundosEstaduais({
  estado,
  produto,
  quantidade,
  valorOperacao,
}: FundosEstaduaisInput) {
  const uf = estado.toUpperCase();
  const prod = produto.toLowerCase().trim();
  const estadoData = FUNDOS[uf];

  if (!estadoData) {
    return {
      estado: uf,
      produto: prod,
      quantidade,
      valorOperacao,
      fundo: "Não disponível",
      aliquota: 0,
      valorFundo: 0,
      mensagem: `Estado ${uf} não possui fundo estadual cadastrado na base.`,
      estadosDisponiveis: Object.keys(FUNDOS),
    };
  }

  const prodData = estadoData.fundos[prod];
  if (!prodData) {
    return {
      estado: uf,
      produto: prod,
      quantidade,
      valorOperacao,
      fundo: estadoData.nome,
      aliquota: 0,
      valorFundo: 0,
      mensagem: `Produto "${prod}" não possui valor de fundo cadastrado para ${uf}.`,
      produtosDisponiveis: Object.keys(estadoData.fundos),
    };
  }

  const valorFundo = round(prodData.total * quantidade, 2);
  const percentualSobreOperacao =
    valorOperacao > 0 ? round((valorFundo / valorOperacao) * 100, 2) : 0;

  return {
    estado: uf,
    produto: prod,
    quantidade,
    valorOperacao,
    fundo: estadoData.nome,
    valorPorUnidade: prodData.total,
    unidade: prodData.unidade,
    valorFundo,
    percentualSobreOperacao,
    detalhamento: { ...prodData },
  };
}
