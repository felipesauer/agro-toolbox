import { describe, it, expect } from 'vitest';
import { simularCbsIbs } from '../src/services/simuladorCbsIbs.js';

describe('simuladorCbsIbs', () => {
  it('simula CBS/IBS para soja (NCM 1201 — redução 60%)', () => {
    const r = simularCbsIbs({ ncm: '12010090', valorOperacao: 100000, tipo: 'saida', uf: 'MT' });
    expect(r.reducao).toMatch(/60%/);
    expect(r.valores.totalBruto).toBeGreaterThan(0);
    expect(r.valores.totalBruto).toBeLessThan(100000 * 0.30); // com redução deve ser menor
    expect(r.fonteAliquotas).toBe('local');
  });

  it('simula alíquota zero para hortifruti (NCM 0702)', () => {
    const r = simularCbsIbs({ ncm: '07020000', valorOperacao: 50000, tipo: 'saida', uf: 'SP' });
    expect(r.reducao).toMatch(/100%/);
    expect(r.valores.totalBruto).toBe(0);
  });

  it('aplica créditos de entrada', () => {
    const r = simularCbsIbs({ ncm: '31010000', valorOperacao: 200000, tipo: 'saida', uf: 'GO', creditosEntrada: 5000 });
    expect(r.valores.creditosEntrada).toBeGreaterThan(0);
    expect(r.valores.totalLiquido).toBeLessThan(r.valores.totalBruto);
  });

  it('simula múltiplos itens', () => {
    const r = simularCbsIbs({
      tipo: 'saida', uf: 'MT', creditosEntrada: 1000,
      itens: [
        { ncm: '12010090', valorOperacao: 50000 },
        { ncm: '10059010', valorOperacao: 30000 },
      ],
    });
    expect(r.itens).toHaveLength(2);
    expect(r.totais).toBeDefined();
    expect(r.totais.totalBruto).toBeGreaterThan(0);
    expect(r.totais.totalLiquido).toBeLessThanOrEqual(r.totais.totalBruto);
  });

  it('retorna memória de cálculo', () => {
    const r = simularCbsIbs({ ncm: '12010090', valorOperacao: 100000, tipo: 'saida', uf: 'PR' });
    expect(r.memoriaCalculo).toBeDefined();
    expect(r.memoriaCalculo.length).toBeGreaterThan(0);
  });
});
