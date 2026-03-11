import { CULTURAS } from '../constants/culturas.js';

export function calcularCicloCultura({ cultura, variedade, dataPlantio, cicloCustom }) {
  const culturaData = CULTURAS[cultura];
  if (!culturaData) {
    throw new Error(`Cultura desconhecida: ${cultura}`);
  }

  let cicloDias = cicloCustom;
  if (!cicloDias) {
    if (variedade && culturaData.variedades[variedade]) {
      cicloDias = culturaData.variedades[variedade].ciclo;
    } else {
      cicloDias = culturaData.cicloMedio;
    }
  }

  const plantio = new Date(dataPlantio);
  const colheita = new Date(plantio);
  colheita.setDate(colheita.getDate() + cicloDias);

  const hoje = new Date();
  const diasRestantes = Math.max(0, Math.ceil((colheita - hoje) / (1000 * 60 * 60 * 24)));

  return {
    cultura: culturaData.nome,
    variedade: variedade || 'padrão',
    dataPlantio,
    cicloDias,
    dataEstimadaColheita: colheita.toISOString().split('T')[0],
    diasRestantes,
  };
}
