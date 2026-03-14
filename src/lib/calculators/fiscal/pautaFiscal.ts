import { PAUTAS } from "@/lib/constants/pautas";
import { round } from "@/lib/utils";

export interface PautaFiscalInput {
  estado: string;
  produto: string;
  precoVenda: number;
  quantidade: number;
}

export function calcularPautaFiscal({
  estado,
  produto,
  precoVenda,
  quantidade,
}: PautaFiscalInput) {
  const uf = estado.toUpperCase();
  const prod = produto.toLowerCase().trim();
  const estadoData = (PAUTAS as Record<string, Record<string, { pauta: number; vigencia: string }>>)[uf];

  if (!estadoData) {
    return {
      estado: uf,
      produto: prod,
      precoVenda,
      quantidade,
      valorPauta: 0,
      baseCalculo: round(precoVenda * quantidade, 2),
      usouPauta: false,
      mensagem: `Estado ${uf} não possui pauta fiscal cadastrada na base.`,
    };
  }

  const prodData = estadoData[prod];
  if (!prodData) {
    return {
      estado: uf,
      produto: prod,
      precoVenda,
      quantidade,
      valorPauta: 0,
      baseCalculo: round(precoVenda * quantidade, 2),
      usouPauta: false,
      mensagem: `Produto "${prod}" não possui pauta fiscal para ${uf}.`,
      produtosDisponiveis: Object.keys(estadoData),
    };
  }

  const usouPauta = prodData.pauta > precoVenda;
  const baseUnitaria = usouPauta ? prodData.pauta : precoVenda;
  const baseCalculo = round(baseUnitaria * quantidade, 2);

  return {
    estado: uf,
    produto: prod,
    precoVenda,
    quantidade,
    valorPauta: prodData.pauta,
    vigenciaPauta: prodData.vigencia,
    baseCalculo,
    baseUnitaria: round(baseUnitaria, 2),
    usouPauta,
    diferencaPauta: usouPauta
      ? round((prodData.pauta - precoVenda) * quantidade, 2)
      : 0,
    mensagem: usouPauta
      ? `Pauta fiscal superior ao preço de venda — base de cálculo ajustada para R$ ${prodData.pauta.toFixed(2)}/ton.`
      : "Preço de venda superior à pauta — base de cálculo é o valor da operação.",
  };
}
