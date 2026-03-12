import { round } from '../utils/formatters.js';

export function calcularCustoHoraMaquina({
  consumoCombustivel, precoCombustivel, custoManutencaoAnual,
  horasAnoUso, valorMaquina, vidaUtilAnos, custoOperador, seguroAnual = 0,
  rendimentoHaPorHora,
}) {
  const combustivelHora = consumoCombustivel * precoCombustivel;
  const manutencaoHora = custoManutencaoAnual / horasAnoUso;
  const depreciacaoHora = valorMaquina / vidaUtilAnos / horasAnoUso;
  const seguroHora = seguroAnual / horasAnoUso;

  const custoHoraTotal = combustivelHora + manutencaoHora + depreciacaoHora + custoOperador + seguroHora;

  const result = {
    custoHoraTotal: round(custoHoraTotal, 2),
    detalhamento: {
      combustivel: round(combustivelHora, 2),
      manutencao: round(manutencaoHora, 2),
      depreciacao: round(depreciacaoHora, 2),
      operador: round(custoOperador, 2),
      seguro: round(seguroHora, 2),
    },
    composicao: {
      combustivel: round((combustivelHora / custoHoraTotal) * 100, 1),
      manutencao: round((manutencaoHora / custoHoraTotal) * 100, 1),
      depreciacao: round((depreciacaoHora / custoHoraTotal) * 100, 1),
      operador: round((custoOperador / custoHoraTotal) * 100, 1),
      seguro: round((seguroHora / custoHoraTotal) * 100, 1),
    },
    custoAnualTotal: round(custoHoraTotal * horasAnoUso, 2),
  };

  if (rendimentoHaPorHora) {
    result.custoPorHa = round(custoHoraTotal / rendimentoHaPorHora, 2);
    result.rendimentoHaPorHora = rendimentoHaPorHora;
  }

  return result;
}
