import { CULTURAS } from '../constants/culturas.js';
import { round } from '../utils/formatters.js';

export function calcularQuebraUmidade({ pesoBruto, umidadeRecebida, impurezaRecebida, cultura }) {
  const c = CULTURAS[cultura];
  if (!c) throw new Error(`Cultura desconhecida: ${cultura}`);

  const descontoUmidade = umidadeRecebida > c.umidadePadrao
    ? (umidadeRecebida - c.umidadePadrao) * c.fatorUmidade
    : 0;

  const descontoImpureza = impurezaRecebida > c.impurezaPadrao
    ? (impurezaRecebida - c.impurezaPadrao) * c.fatorImpureza
    : 0;

  const descontoTotal = descontoUmidade + descontoImpureza;
  const pesoLiquido = pesoBruto * (1 - descontoTotal / 100);

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
  };
}
