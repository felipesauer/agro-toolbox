import { describe, it, expect } from 'vitest';
import { calcularNecessidadeSementes } from '../src/services/necessidadeSementes.js';

describe('necessidadeSementes', () => {
  it('calcula kg/ha para soja típica', () => {
    // 300.000 plantas/ha, PMS 180g (por 1000 sementes), germinação 85%
    // fórmula: (300000 * 180) / (85/100 * 100/100) / 1000 = 63529.41 kg/ha
    const r = calcularNecessidadeSementes({ populacaoDesejada: 300000, pms: 180, germinacao: 85 });
    expect(r.kgPorHa).toBeCloseTo(63529.41, 0);
    expect(r.pureza).toBe(100);
  });

  it('calcula sementes por metro linear', () => {
    const r = calcularNecessidadeSementes({ populacaoDesejada: 300000, pms: 180, germinacao: 85, espacamentoEntrelinhas: 45 });
    expect(r.sementesPorMetro).toBeGreaterThan(10);
    expect(r.espacamentoEntrelinhas).toBe(45);
  });

  it('calcula total para área', () => {
    const r = calcularNecessidadeSementes({ populacaoDesejada: 300000, pms: 180, germinacao: 85, area: 100 });
    expect(r.totalKg).toBeCloseTo(r.kgPorHa * 100, 0);
    expect(r.totalSacas).toBeCloseTo(r.sacasPorHa * 100, 0);
  });

  it('sacas de 40kg por hectare', () => {
    const r = calcularNecessidadeSementes({ populacaoDesejada: 300000, pms: 180, germinacao: 85 });
    expect(r.sacasPorHa).toBeCloseTo(r.kgPorHa / 40, 1);
  });

  it('ajusta com pureza menor que 100', () => {
    const r100 = calcularNecessidadeSementes({ populacaoDesejada: 300000, pms: 180, germinacao: 85, pureza: 100 });
    const r90 = calcularNecessidadeSementes({ populacaoDesejada: 300000, pms: 180, germinacao: 85, pureza: 90 });
    expect(r90.kgPorHa).toBeGreaterThan(r100.kgPorHa);
  });
});
