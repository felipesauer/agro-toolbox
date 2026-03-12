import { describe, it, expect } from 'vitest';
import { calcularCustoHoraMaquina } from '../src/services/custoHoraMaquina.js';

describe('custoHoraMaquina', () => {
  it('calcula custo hora de trator', () => {
    const r = calcularCustoHoraMaquina({
      consumoCombustivel: 15, precoCombustivel: 5.80, custoManutencaoAnual: 20000,
      horasAnoUso: 1000, valorMaquina: 500000, vidaUtilAnos: 10, custoOperador: 30,
    });
    expect(r.custoHoraTotal).toBeGreaterThan(0);
    expect(r.detalhamento.combustivel).toBeCloseTo(87, 0);
    expect(r.detalhamento.depreciacao).toBe(50);
    expect(r.detalhamento.operador).toBe(30);
  });

  it('composição soma 100%', () => {
    const r = calcularCustoHoraMaquina({
      consumoCombustivel: 10, precoCombustivel: 6, custoManutencaoAnual: 15000,
      horasAnoUso: 800, valorMaquina: 300000, vidaUtilAnos: 10, custoOperador: 25, seguroAnual: 5000,
    });
    const soma = r.composicao.combustivel + r.composicao.manutencao + r.composicao.depreciacao + r.composicao.operador + r.composicao.seguro;
    expect(soma).toBeCloseTo(100, 0);
  });

  it('calcula custo anual total', () => {
    const r = calcularCustoHoraMaquina({
      consumoCombustivel: 10, precoCombustivel: 6, custoManutencaoAnual: 15000,
      horasAnoUso: 1000, valorMaquina: 200000, vidaUtilAnos: 10, custoOperador: 25,
    });
    expect(r.custoAnualTotal).toBeCloseTo(r.custoHoraTotal * 1000, 0);
  });

  it('calcula custo por hectare', () => {
    const r = calcularCustoHoraMaquina({
      consumoCombustivel: 15, precoCombustivel: 5.80, custoManutencaoAnual: 20000,
      horasAnoUso: 1000, valorMaquina: 500000, vidaUtilAnos: 10, custoOperador: 30,
      rendimentoHaPorHora: 5,
    });
    expect(r.custoPorHa).toBeCloseTo(r.custoHoraTotal / 5, 1);
    expect(r.rendimentoHaPorHora).toBe(5);
  });
});
