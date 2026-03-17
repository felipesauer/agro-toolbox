import { round } from "@/lib/utils";

export interface CustoHoraMaquinaInput {
  consumoCombustivel: number;
  precoCombustivel: number;
  custoManutencaoAnual: number;
  horasAnoUso: number;
  valorMaquina: number;
  vidaUtilAnos: number;
  custoOperador: number;
  seguroAnual?: number;
  rendimentoHaPorHora?: number;
}

export function calcularCustoHoraMaquina({
  consumoCombustivel,
  precoCombustivel,
  custoManutencaoAnual,
  horasAnoUso,
  valorMaquina,
  vidaUtilAnos,
  custoOperador,
  seguroAnual = 0,
  rendimentoHaPorHora,
}: CustoHoraMaquinaInput) {
  const combustivelHora = consumoCombustivel * precoCombustivel;
  const manutencaoHora = custoManutencaoAnual / horasAnoUso;
  const depreciacaoHora = valorMaquina / vidaUtilAnos / horasAnoUso;
  const seguroHora = seguroAnual / horasAnoUso;

  const custoHoraTotal =
    combustivelHora + manutencaoHora + depreciacaoHora + custoOperador + seguroHora;

  return {
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
    custoPorHa: rendimentoHaPorHora ? round(custoHoraTotal / rendimentoHaPorHora, 2) : undefined,
  };
}
