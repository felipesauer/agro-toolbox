import { describe, it, expect } from 'vitest';
import { calcularEstimativaProdutividade } from '../src/services/estimativaProdutividade.js';

describe('estimativaProdutividade', () => {
  it('calcula produtividade em kg/ha e sc/ha para soja', () => {
    // 30 plantas/m², 2 vagens/planta, 2.5 grãos/vagem, PMS 180g
    const r = calcularEstimativaProdutividade({ plantasPorM2: 30, estruturasPorPlanta: 2, graosPorEstrutura: 2.5, pms: 180, cultura: 'soja' });
    // (30 * 2 * 2.5 * 180) / 100 = 2700? No, PMS is in 0.1g units → /100 → 270 kg/ha
    expect(r.kgPorHa).toBe(270);
    expect(r.sacasPorHa).toBe(4.5); // 270/60
    expect(r.tonPorHa).toBe(0.27);
  });

  it('usa peso saca da cultura', () => {
    const r = calcularEstimativaProdutividade({ plantasPorM2: 10, estruturasPorPlanta: 1, graosPorEstrutura: 500, pms: 300, cultura: 'algodao' });
    expect(r.pesoSaca).toBe(20.42);
  });

  it('calcula produção total por área', () => {
    const r = calcularEstimativaProdutividade({ plantasPorM2: 30, estruturasPorPlanta: 2, graosPorEstrutura: 2.5, pms: 180, area: 500 });
    expect(r.area).toBe(500);
    expect(r.producaoTotalKg).toBeCloseTo(135000, 0);
    expect(r.producaoTotalSacas).toBeCloseTo(2250, 0);
    expect(r.producaoTotalTon).toBeCloseTo(135, 0);
  });

  it('usa 60kg como padrão sem cultura', () => {
    const r = calcularEstimativaProdutividade({ plantasPorM2: 10, estruturasPorPlanta: 1, graosPorEstrutura: 100, pms: 200 });
    expect(r.pesoSaca).toBe(60);
  });
});
