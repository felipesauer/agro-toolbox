import { UNIDADES_NFE, UTRIB_TO_NFE } from '../constants/conversoes.js';
import { CULTURAS } from '../constants/culturas.js';
import { round } from '../utils/formatters.js';

export function converterUnidadesNfe({ valor, de, para, cultura }) {
  // Support uTrib codes (e.g. KGM → KG)
  const deKey = UTRIB_TO_NFE[de] || de;
  const paraKey = UTRIB_TO_NFE[para] || para;

  const origem = UNIDADES_NFE[deKey];
  const destino = UNIDADES_NFE[paraKey];

  if (!origem || !destino) {
    throw new Error(`Unidade NFe desconhecida: ${!origem ? de : para}. Disponíveis: ${Object.keys(UNIDADES_NFE).join(', ')}`);
  }

  // Ambas devem estar na mesma grandeza (kg-based ou litro-based)
  if (origem.kg !== undefined && destino.kg !== undefined) {
    let pesoSaca = origem.kg;
    if (deKey === 'SC' && cultura && CULTURAS[cultura]) {
      pesoSaca = CULTURAS[cultura].pesoSaca;
    }
    const kgReal = deKey === 'SC' ? valor * pesoSaca : valor * origem.kg;

    let pesoSacaDest = destino.kg;
    if (paraKey === 'SC' && cultura && CULTURAS[cultura]) {
      pesoSacaDest = CULTURAS[cultura].pesoSaca;
    }
    const resultado = paraKey === 'SC' ? kgReal / pesoSacaDest : kgReal / destino.kg;

    return {
      valorOriginal: valor,
      de: origem.nome,
      para: destino.nome,
      resultado: round(resultado, 4),
      cultura: cultura ? CULTURAS[cultura]?.nome : null,
      uTribOrigem: origem.uTrib,
      uTribDestino: destino.uTrib,
    };
  }

  if (origem.litro !== undefined && destino.litro !== undefined) {
    const litros = valor * origem.litro;
    const resultado = litros / destino.litro;
    return {
      valorOriginal: valor,
      de: origem.nome,
      para: destino.nome,
      resultado: round(resultado, 4),
      uTribOrigem: origem.uTrib,
      uTribDestino: destino.uTrib,
    };
  }

  if (origem.un !== undefined && destino.un !== undefined) {
    const unidades = valor * origem.un;
    const resultado = unidades / destino.un;
    return {
      valorOriginal: valor,
      de: origem.nome,
      para: destino.nome,
      resultado: round(resultado, 4),
      uTribOrigem: origem.uTrib,
      uTribDestino: destino.uTrib,
    };
  }

  throw new Error(`Conversão incompatível: ${de} (${origem.nome}) → ${para} (${destino.nome}) — grandezas diferentes`);
}
