import { round } from '../utils/formatters.js';

// Stub — será implementado completamente na Fase 3 com tabela por estado/produto
export function calcularPautaFiscal({ estado, produto, precoVenda, quantidade }) {
  return {
    estado,
    produto,
    precoVenda,
    quantidade,
    valorPauta: 0,
    baseCalculo: round(precoVenda * quantidade, 2),
    icms: 0,
    usouPauta: false,
    mensagem: 'Tabela de pautas fiscais será implementada na Fase 3',
  };
}
