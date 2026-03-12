import { describe, it, expect } from 'vitest';
import { calcularFunruralComparativo } from '../src/services/funruralComparativo.js';

describe('funruralComparativo', () => {
  it('compara comercialização vs folha', () => {
    const r = calcularFunruralComparativo({ receitaBrutaAnual: 5000000, folhaPagamentoMensal: 50000, numEmpregados: 20 });
    expect(r.custoComercializacao).toBeGreaterThan(0);
    expect(r.custoFolha).toBeGreaterThan(0);
    expect(r.economiaAnual).toBeGreaterThan(0);
    expect(['Manter recolhimento sobre comercialização', 'Optar por recolhimento sobre folha de pagamento']).toContain(r.recomendacao);
  });

  it('calcula receita de equilíbrio', () => {
    const r = calcularFunruralComparativo({ receitaBrutaAnual: 3000000, folhaPagamentoMensal: 30000, numEmpregados: 10 });
    expect(r.receitaEquilibrio).toBeGreaterThan(0);
  });

  it('calcula economia mensal', () => {
    const r = calcularFunruralComparativo({ receitaBrutaAnual: 5000000, folhaPagamentoMensal: 50000, numEmpregados: 15 });
    expect(r.economiaMensal).toBeCloseTo(r.economiaAnual / 12, 0);
  });

  it('gera projeção plurianual', () => {
    const r = calcularFunruralComparativo({ receitaBrutaAnual: 2000000, folhaPagamentoMensal: 20000, numEmpregados: 8, anosProjecao: 3 });
    expect(r.projecao).toHaveLength(3);
    expect(r.projecao[2].economiaAcumulada).toBeCloseTo(r.economiaAnual * 3, 0);
  });

  it('detalhamento inclui número de empregados', () => {
    const r = calcularFunruralComparativo({ receitaBrutaAnual: 1000000, folhaPagamentoMensal: 10000, numEmpregados: 5 });
    expect(r.detalhamento.folha.numEmpregados).toBe(5);
  });
});
