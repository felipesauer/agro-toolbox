import { describe, it, expect } from 'vitest';
import { calcularQuebraUmidade } from '../src/services/quebraUmidade.js';

describe('quebraUmidade', () => {
  it('calcula desconto de soja com umidade acima do padrão', () => {
    const r = calcularQuebraUmidade({ pesoBruto: 30000, umidadeRecebida: 18, impurezaRecebida: 0.5, cultura: 'soja' });
    expect(r.descontoUmidade).toBe(4);
    expect(r.descontoImpureza).toBe(0);
    expect(r.pesoLiquido).toBeCloseTo(28800, 0);
    expect(r.kgDescontados).toBeCloseTo(1200, 0);
  });

  it('sem desconto quando umidade e impureza dentro do padrão', () => {
    const r = calcularQuebraUmidade({ pesoBruto: 20000, umidadeRecebida: 13, impurezaRecebida: 0.8, cultura: 'soja' });
    expect(r.descontoUmidade).toBe(0);
    expect(r.descontoImpureza).toBe(0);
    expect(r.pesoLiquido).toBe(20000);
  });

  it('desconto progressivo aplica 1.5% acima de 3 pontos', () => {
    const r = calcularQuebraUmidade({ pesoBruto: 10000, umidadeRecebida: 20, impurezaRecebida: 0.5, cultura: 'soja', descontoProgressivo: true });
    // excesso = 6 pontos; faixa1=3*1.0=3, faixa2=3*1.5=4.5 → total = 7.5%
    expect(r.descontoUmidade).toBeCloseTo(7.5, 1);
    expect(r.descontoProgressivo).toBe(true);
  });

  it('calcula peso seco e peso padrão umidade', () => {
    const r = calcularQuebraUmidade({ pesoBruto: 10000, umidadeRecebida: 18, impurezaRecebida: 1, cultura: 'milho' });
    expect(r.pesoSeco).toBeCloseTo(8200, 0);
    expect(r.pesoPadraoUmidade).toBeCloseTo(8600, 0);
  });

  it('lança erro para cultura inexistente', () => {
    expect(() => calcularQuebraUmidade({ pesoBruto: 1000, umidadeRecebida: 15, impurezaRecebida: 1, cultura: 'inexistente' })).toThrow();
  });
});
