import { CULTURAS } from '../constants/culturas.js';

export function calcularCicloCultura({ cultura, variedade, dataPlantio, cicloCustom, culturaSegunda }) {
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

  const progresso = Math.min(100, Math.max(0, ((cicloDias - diasRestantes) / cicloDias) * 100));

  const result = {
    cultura: culturaData.nome,
    variedade: variedade || 'padrão',
    dataPlantio,
    cicloDias,
    dataEstimadaColheita: colheita.toISOString().split('T')[0],
    diasRestantes,
    progresso: Math.round(progresso),
  };

  // Calculate second crop window
  if (culturaSegunda) {
    const culturaSegundaData = CULTURAS[culturaSegunda];
    if (culturaSegundaData) {
      const janelaSafrinha = new Date(colheita);
      janelaSafrinha.setDate(janelaSafrinha.getDate() + 10); // 10 days gap for prep
      const colheitaSegunda = new Date(janelaSafrinha);
      colheitaSegunda.setDate(colheitaSegunda.getDate() + culturaSegundaData.cicloMedio);

      // Janela ideal safrinha milho: até 10 de março para Centro-Oeste
      const anoPlantio = janelaSafrinha.getFullYear();
      const limiteJanela = new Date(anoPlantio, 2, 10); // 10 de março

      result.segundaSafra = {
        cultura: culturaSegundaData.nome,
        dataPlantioEstimada: janelaSafrinha.toISOString().split('T')[0],
        cicloDias: culturaSegundaData.cicloMedio,
        dataColheitaEstimada: colheitaSegunda.toISOString().split('T')[0],
        dentroJanelaIdeal: janelaSafrinha <= limiteJanela,
      };
    }
  }

  return result;
}
