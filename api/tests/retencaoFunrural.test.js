import { describe, it, expect } from 'vitest';
import { calcularRetencaoFunrural } from '../src/services/retencaoFunrural.js';

describe('retencaoFunrural', () => {
  it('calcula retenção PF padrão', () => {
    const r = calcularRetencaoFunrural({ valorBruto: 100000, tipoPessoa: 'PF' });
    expect(r.funrural).toBe(1200); // 1.2%
    expect(r.rat).toBe(100); // 0.1%
    expect(r.senar).toBe(200); // 0.2%
    expect(r.totalRetido).toBe(1500); // 1.5%
    expect(r.valorLiquido).toBe(98500);
  });

  it('calcula retenção PJ', () => {
    const r = calcularRetencaoFunrural({ valorBruto: 200000, tipoPessoa: 'PJ' });
    expect(r.totalRetido).toBeCloseTo(200000 * 0.0205, 0);
  });

  it('sem retenção para optante por folha', () => {
    const r = calcularRetencaoFunrural({ valorBruto: 100000, tipoPessoa: 'PF', optanteFolha: true });
    expect(r.totalRetido).toBe(0);
    expect(r.valorLiquido).toBe(100000);
    expect(r.optanteFolha).toBe(true);
  });

  it('calcula projeção anual com múltiplas operações', () => {
    const r = calcularRetencaoFunrural({ valorBruto: 50000, tipoPessoa: 'PF', numOperacoesAno: 12 });
    expect(r.projecaoAnual).toBeDefined();
    expect(r.projecaoAnual.operacoes).toBe(12);
    expect(r.projecaoAnual.totalRetidoAnual).toBeCloseTo(r.totalRetido * 12, 0);
  });

  it('sem projeção para operação única', () => {
    const r = calcularRetencaoFunrural({ valorBruto: 50000, tipoPessoa: 'PF', numOperacoesAno: 1 });
    expect(r.projecaoAnual).toBeUndefined();
  });
});
