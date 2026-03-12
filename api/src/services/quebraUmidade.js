import { CULTURAS } from '../constants/culturas.js';
import { round } from '../utils/formatters.js';

export function calcularQuebraUmidade({ pesoBruto, umidadeRecebida, impurezaRecebida, cultura, descontoProgressivo = false }) {
  const c = CULTURAS[cultura];
  if (!c) throw new Error(`Cultura desconhecida: ${cultura}`);

  let descontoUmidade;
  if (descontoProgressivo && umidadeRecebida > c.umidadePadrao) {
    // Progressive: 1% per point from standard to standard+3, 1.5% per point above that
    const excesso = umidadeRecebida - c.umidadePadrao;
    const faixa1 = Math.min(excesso, 3);
    const faixa2 = Math.max(0, excesso - 3);
    descontoUmidade = (faixa1 * 1.0 + faixa2 * 1.5) * c.fatorUmidade;
  } else {
    descontoUmidade = umidadeRecebida > c.umidadePadrao
      ? (umidadeRecebida - c.umidadePadrao) * c.fatorUmidade
      : 0;
  }

  const descontoImpureza = impurezaRecebida > c.impurezaPadrao
    ? (impurezaRecebida - c.impurezaPadrao) * c.fatorImpureza
    : 0;

  const descontoTotal = descontoUmidade + descontoImpureza;
  const pesoLiquido = pesoBruto * (1 - descontoTotal / 100);

  // Peso seco (base seca — 0% umidade)
  const pesoSeco = pesoBruto * (1 - umidadeRecebida / 100);
  const pesoPadraoUmidade = pesoBruto * (1 - c.umidadePadrao / 100);

  return {
    pesoBruto,
    cultura: c.nome,
    umidadePadrao: c.umidadePadrao,
    impurezaPadrao: c.impurezaPadrao,
    descontoUmidade: round(descontoUmidade, 2),
    descontoImpureza: round(descontoImpureza, 2),
    descontoTotal: round(descontoTotal, 2),
    percentualDesconto: round(descontoTotal, 2),
    pesoLiquido: round(pesoLiquido, 2),
    pesoSeco: round(pesoSeco, 2),
    pesoPadraoUmidade: round(pesoPadraoUmidade, 2),
    descontoProgressivo,
    kgDescontados: round(pesoBruto - pesoLiquido, 2),
  };
}
