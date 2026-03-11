import { round } from '../utils/formatters.js';

export function calcularCustoHoraMaquina({
  consumoCombustivel, precoCombustivel, custoManutencaoAnual,
  horasAnoUso, valorMaquina, vidaUtilAnos, custoOperador, seguroAnual = 0,
}) {
  const combustivelHora = consumoCombustivel * precoCombustivel;
  const manutencaoHora = custoManutencaoAnual / horasAnoUso;
  const depreciacaoHora = valorMaquina / vidaUtilAnos / horasAnoUso;
  const seguroHora = seguroAnual / horasAnoUso;

  const custoHoraTotal = combustivelHora + manutencaoHora + depreciacaoHora + custoOperador + seguroHora;

  return {
    custoHoraTotal: round(custoHoraTotal, 2),
    detalhamento: {
      combustivel: round(combustivelHora, 2),
      manutencao: round(manutencaoHora, 2),
      depreciacao: round(depreciacaoHora, 2),
      operador: round(custoOperador, 2),
      seguro: round(seguroHora, 2),
    },
  };
}
