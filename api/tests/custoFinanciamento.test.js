import { describe, it, expect } from 'vitest';
import { calcularCustoFinanciamento } from '../src/services/custoFinanciamento.js';

describe('custoFinanciamento', () => {
  it('calcula financiamento SAC básico', () => {
    const r = calcularCustoFinanciamento({ valorFinanciamento: 100000, taxaAnual: 10, prazoMeses: 12, sistemaAmortizacao: 'SAC' });
    expect(r.parcelas).toHaveLength(12);
    expect(r.totalJuros).toBeGreaterThan(0);
    expect(r.totalPago).toBeGreaterThan(100000);
    expect(r.primeiraParcela).toBeGreaterThan(r.ultimaParcela);
  });

  it('calcula financiamento PRICE com parcelas iguais', () => {
    const r = calcularCustoFinanciamento({ valorFinanciamento: 100000, taxaAnual: 12, prazoMeses: 24, sistemaAmortizacao: 'PRICE' });
    expect(r.parcelas).toHaveLength(24);
    expect(r.primeiraParcela).toBeCloseTo(r.ultimaParcela, 0);
  });

  it('calcula com carência', () => {
    const r = calcularCustoFinanciamento({ valorFinanciamento: 200000, taxaAnual: 8, prazoMeses: 36, carenciaMeses: 6, sistemaAmortizacao: 'SAC' });
    expect(r.carenciaMeses).toBe(6);
    // primeiras 6 parcelas são só juros
    expect(r.parcelas[0].amortizacao).toBe(0);
    expect(r.parcelas[0].juros).toBeGreaterThan(0);
    expect(r.parcelas[6].amortizacao).toBeGreaterThan(0);
  });

  it('calcula IOF', () => {
    const r = calcularCustoFinanciamento({ valorFinanciamento: 100000, taxaAnual: 10, prazoMeses: 12, sistemaAmortizacao: 'SAC', iof: 1.5 });
    expect(r.iof).toBe(1500);
    expect(r.totalPago).toBeGreaterThan(100000 + 1500);
  });

  it('calcula CET anual', () => {
    const r = calcularCustoFinanciamento({ valorFinanciamento: 100000, taxaAnual: 10, prazoMeses: 24, sistemaAmortizacao: 'SAC', tarifaBancaria: 500 });
    expect(r.cetAnual).toBeGreaterThan(0);
    expect(r.tarifaBancaria).toBe(500);
  });

  it('custo efetivo é total pago menos financiamento', () => {
    const r = calcularCustoFinanciamento({ valorFinanciamento: 50000, taxaAnual: 12, prazoMeses: 12, sistemaAmortizacao: 'PRICE' });
    expect(r.custoEfetivo).toBeCloseTo(r.totalPago - 50000, 0);
  });
});
