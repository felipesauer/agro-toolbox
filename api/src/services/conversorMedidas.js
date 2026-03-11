import { UNIDADES_AREA } from '../constants/conversoes.js';
import { round } from '../utils/formatters.js';

export function converterMedidas({ valor, de, para }) {
  const origem = UNIDADES_AREA[de];
  const destino = UNIDADES_AREA[para];

  if (!origem || !destino) {
    throw new Error(`Unidade desconhecida: ${!origem ? de : para}`);
  }

  const m2 = valor * origem.m2;
  const resultado = m2 / destino.m2;

  return {
    valorOriginal: valor,
    unidadeOrigem: origem.nome,
    unidadeDestino: destino.nome,
    resultado: round(resultado, 4),
    formula: `${valor} × (${origem.m2} / ${destino.m2})`,
  };
}
