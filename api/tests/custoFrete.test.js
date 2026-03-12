import { describe, it, expect } from 'vitest';
import { calcularCustoFrete } from '../src/services/custoFrete.js';

describe('custoFrete', () => {
  it('calcula custo básico de frete', () => {
    const r = calcularCustoFrete({ distanciaKm: 500, valorFretePorKm: 5, pesoTotalKg: 30000 });
    expect(r.custoTotal).toBe(2500);
    expect(r.custoPorTonelada).toBeCloseTo(83.33, 1);
    expect(r.custoPorSaca60kg).toBe(5);
  });

  it('inclui pedágios e seguro', () => {
    const r = calcularCustoFrete({ distanciaKm: 300, valorFretePorKm: 4, pesoTotalKg: 37000, pedagios: 200, custoSeguro: 150 });
    expect(r.custoTotal).toBe(1550);
    expect(r.composicao.frete).toBe(1200);
    expect(r.composicao.pedagios).toBe(200);
    expect(r.composicao.seguro).toBe(150);
  });

  it('calcula custo por saca corretamente', () => {
    const r = calcularCustoFrete({ distanciaKm: 100, valorFretePorKm: 10, pesoTotalKg: 60000 });
    // 1000 total, 60000/60=1000 sacas -> R$1/saca
    expect(r.custoPorSaca60kg).toBe(1);
    expect(r.custoPorTonelada).toBeCloseTo(16.67, 1);
  });

  it('lida com carga pequena', () => {
    const r = calcularCustoFrete({ distanciaKm: 50, valorFretePorKm: 3, pesoTotalKg: 1000 });
    expect(r.custoTotal).toBe(150);
    expect(r.custoPorTonelada).toBe(150);
  });
});
