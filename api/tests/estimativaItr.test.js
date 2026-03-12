import { describe, it, expect } from 'vitest';
import { calcularEstimativaItr } from '../src/services/estimativaItr.js';

describe('estimativaItr', () => {
  it('calcula ITR de propriedade com alta utilização', () => {
    const r = calcularEstimativaItr({ areaTotal: 200, areaUtilizada: 160, areaPreservacao: 40, vtn: 2000000 });
    expect(r.grauUtilizacao).toBe(100); // 160 / (200-40) * 100
    expect(r.itrEstimado).toBeGreaterThan(0);
    expect(r.areaAproveitavel).toBe(160);
  });

  it('calcula VTN por hectare e ITR por hectare', () => {
    const r = calcularEstimativaItr({ areaTotal: 500, areaUtilizada: 300, areaPreservacao: 100, vtn: 5000000 });
    expect(r.vtnPorHa).toBe(10000);
    expect(r.itrPorHa).toBeGreaterThan(0);
  });

  it('calcula cenário alternativo', () => {
    const r = calcularEstimativaItr({ areaTotal: 500, areaUtilizada: 200, areaPreservacao: 100, vtn: 5000000, areaUtilizadaAlternativa: 350 });
    expect(r.cenarioAlternativo).toBeDefined();
    expect(r.cenarioAlternativo.areaUtilizada).toBe(350);
    expect(r.cenarioAlternativo.grauUtilizacao).toBeGreaterThan(r.grauUtilizacao);
    expect(r.cenarioAlternativo.economia).toBeGreaterThan(0);
  });

  it('identifica faixa de área e grau de utilização', () => {
    const r = calcularEstimativaItr({ areaTotal: 100, areaUtilizada: 60, areaPreservacao: 20, vtn: 800000 });
    expect(r.faixaArea).toBeDefined();
    expect(r.faixaGU).toBeDefined();
    expect(r.aliquota).toBeGreaterThanOrEqual(0);
  });
});
