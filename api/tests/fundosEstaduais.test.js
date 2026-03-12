import { describe, it, expect } from 'vitest';
import { calcularFundosEstaduais } from '../src/services/fundosEstaduais.js';

describe('fundosEstaduais', () => {
  it('calcula FETHAB soja MT', () => {
    const r = calcularFundosEstaduais({ estado: 'MT', produto: 'soja', quantidade: 1000, valorOperacao: 1500000 });
    expect(r.fundo).toContain('FETHAB');
    expect(r.valorPorUnidade).toBeGreaterThan(0);
    expect(r.valorFundo).toBeGreaterThan(0);
    expect(r.percentualSobreOperacao).toBeGreaterThan(0);
  });

  it('calcula FUNDEINFRA soja GO', () => {
    const r = calcularFundosEstaduais({ estado: 'GO', produto: 'soja', quantidade: 500, valorOperacao: 700000 });
    expect(r.fundo).toContain('FUNDEINFRA');
    expect(r.valorFundo).toBeGreaterThan(0);
  });

  it('retorna estados disponíveis para estado não cadastrado', () => {
    const r = calcularFundosEstaduais({ estado: 'AC', produto: 'soja', quantidade: 100, valorOperacao: 100000 });
    expect(r.valorFundo).toBe(0);
    expect(r.estadosDisponiveis).toBeDefined();
    expect(r.estadosDisponiveis.length).toBeGreaterThan(0);
  });

  it('retorna produtos disponíveis para produto não cadastrado', () => {
    const r = calcularFundosEstaduais({ estado: 'MT', produto: 'mandioca', quantidade: 100, valorOperacao: 50000 });
    expect(r.valorFundo).toBe(0);
    expect(r.produtosDisponiveis).toBeDefined();
    expect(r.produtosDisponiveis).toContain('soja');
  });

  it('calcula percentual sobre operação corretamente', () => {
    const r = calcularFundosEstaduais({ estado: 'MT', produto: 'soja', quantidade: 100, valorOperacao: 200000 });
    const esperado = (r.valorFundo / 200000) * 100;
    expect(r.percentualSobreOperacao).toBeCloseTo(esperado, 1);
  });
});
