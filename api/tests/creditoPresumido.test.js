import { describe, it, expect } from 'vitest';
import { calcularCreditoPresumido } from '../src/services/creditoPresumido.js';

describe('creditoPresumido', () => {
  it('calcula crédito para produtor rural PF', () => {
    const r = calcularCreditoPresumido({ receitaBruta: 1000000, custos: 700000, tipo: 'produtor_rural_pf' });
    expect(r.percentualCredito).toBe(8);
    expect(r.creditoPresumido).toBe(80000);
    expect(r.margemOperacional).toBe(300000);
  });

  it('calcula crédito para cooperativa', () => {
    const r = calcularCreditoPresumido({ receitaBruta: 2000000, custos: 1500000, tipo: 'cooperativa' });
    expect(r.percentualCredito).toBe(10);
    expect(r.creditoPresumido).toBe(200000);
  });

  it('calcula carga tributária líquida', () => {
    const r = calcularCreditoPresumido({ receitaBruta: 500000, custos: 300000, tipo: 'produtor_rural_pf' });
    expect(r.cargaTributariaEstimada).toBeGreaterThan(0);
    expect(r.economiaCredito).toBeGreaterThan(0);
    expect(r.cargaLiquida).toBeLessThan(r.cargaTributariaEstimada);
  });

  it('calcula crédito mensal', () => {
    const r = calcularCreditoPresumido({ receitaBruta: 1200000, custos: 800000, tipo: 'produtor_rural_pf', meses: 12 });
    expect(r.creditoMensal).toBeCloseTo(r.creditoPresumido / 12, 0);
    expect(r.cargaMensal).toBeCloseTo(r.cargaTributariaEstimada / 12, 0);
  });

  it('compara crédito presumido vs real', () => {
    const r = calcularCreditoPresumido({ receitaBruta: 1000000, custos: 600000, tipo: 'produtor_rural_pf' });
    expect(r.comparativo).toBeDefined();
    expect(r.comparativo.creditoPresumido).toBe(r.creditoPresumido);
    expect(r.comparativo.creditoRealEstimado).toBeGreaterThan(0);
    expect(['Crédito Presumido', 'Crédito Real']).toContain(r.comparativo.maisVantajoso);
  });

  it('inclui fundamentação legal', () => {
    const r = calcularCreditoPresumido({ receitaBruta: 500000, custos: 300000, tipo: 'agricultor_familiar' });
    expect(r.fundamentacaoLegal).toContain('LC 214/2025');
  });
});
