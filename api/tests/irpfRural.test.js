import { describe, it, expect } from 'vitest';
import { calcularIrpfRural } from '../src/services/irpfRural.js';

describe('irpfRural', () => {
  it('compara resultado real vs presumido', () => {
    const r = calcularIrpfRural({ receitaBruta: 500000, despesasDedutiveis: 350000 });
    expect(r.baseReal).toBe(150000);
    expect(r.basePresumida).toBe(100000); // 20% de 500k
    expect(r.irpfReal).toBeGreaterThan(0);
    expect(r.irpfPresumido).toBeGreaterThan(0);
    expect(r.economia).toBeGreaterThan(0);
  });

  it('calcula alíquota efetiva', () => {
    const r = calcularIrpfRural({ receitaBruta: 800000, despesasDedutiveis: 600000 });
    expect(r.aliquotaEfetivaReal).toBeGreaterThanOrEqual(0);
    expect(r.aliquotaEfetivaPresumido).toBeGreaterThanOrEqual(0);
  });

  it('calcula percentual de despesas', () => {
    const r = calcularIrpfRural({ receitaBruta: 500000, despesasDedutiveis: 400000 });
    expect(r.percentualDespesas).toBe(80);
  });

  it('calcula despesas de equilíbrio', () => {
    const r = calcularIrpfRural({ receitaBruta: 500000, despesasDedutiveis: 300000 });
    expect(r.despesasEquilibrio).toBe(400000); // 500k * (1 - 0.20)
  });

  it('identifica faixa IRPF correta', () => {
    const r = calcularIrpfRural({ receitaBruta: 500000, despesasDedutiveis: 450000 });
    expect(r.faixaReal).toHaveProperty('faixa');
    expect(r.faixaReal).toHaveProperty('aliquota');
  });

  it('preserva despesas por categoria quando fornecidas', () => {
    const categorias = { insumos: 200000, maoDobra: 100000, manutencao: 50000 };
    const r = calcularIrpfRural({ receitaBruta: 500000, despesasDedutiveis: 350000, despesasPorCategoria: categorias });
    expect(r.despesasPorCategoria).toEqual(categorias);
  });

  it('recomenda melhor opção', () => {
    const r = calcularIrpfRural({ receitaBruta: 1000000, despesasDedutiveis: 200000 });
    expect(['Resultado Real', 'Resultado Presumido']).toContain(r.melhorOpcao);
  });
});
