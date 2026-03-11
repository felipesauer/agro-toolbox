import { UNIDADES_NFE } from '../constants/conversoes.js';
import { CULTURAS } from '../constants/culturas.js';
import { round } from '../utils/formatters.js';

export function converterUnidadesNfe({ valor, de, para, cultura }) {
  const origem = UNIDADES_NFE[de];
  const destino = UNIDADES_NFE[para];

  if (!origem || !destino) {
    throw new Error(`Unidade NFe desconhecida: ${!origem ? de : para}`);
  }

  // Ambas devem estar na mesma grandeza (kg-based ou litro-based)
  if (origem.kg !== undefined && destino.kg !== undefined) {
    const kg = valor * origem.kg;
    // Se a origem é SC (saca), o peso pode variar por cultura
    let pesoSaca = origem.kg;
    if (de === 'SC' && cultura && CULTURAS[cultura]) {
      pesoSaca = CULTURAS[cultura].pesoSaca;
    }
    const kgReal = de === 'SC' ? valor * pesoSaca : kg;

    let pesoSacaDest = destino.kg;
    if (para === 'SC' && cultura && CULTURAS[cultura]) {
      pesoSacaDest = CULTURAS[cultura].pesoSaca;
    }
    const resultado = para === 'SC' ? kgReal / pesoSacaDest : kgReal / destino.kg;

    return {
      valorOriginal: valor,
      de: origem.nome,
      para: destino.nome,
      resultado: round(resultado, 4),
      cultura: cultura ? CULTURAS[cultura]?.nome : null,
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
    };
  }

  throw new Error(`Conversão incompatível: ${de} → ${para}`);
}
