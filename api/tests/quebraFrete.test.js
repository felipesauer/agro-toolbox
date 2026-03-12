import { describe, it, expect } from 'vitest';
import { calcularQuebraFrete } from '../src/services/quebraFrete.js';

describe('quebraFrete', () => {
  it('calcula quebra dentro da tolerância', () => {
    const r = calcularQuebraFrete({ pesoOrigem: 30000, pesoDestino: 29950, tolerancia: 0.25 });
    expect(r.dentroTolerancia).toBe(true);
    expect(r.quebraReal).toBe(50);
    expect(r.quebraExcedente).toBe(0);
  });

  it('calcula quebra fora da tolerância com prejuízo', () => {
    const r = calcularQuebraFrete({ pesoOrigem: 30000, pesoDestino: 29800, tolerancia: 0.25, precoUnitario: 2.5 });
    expect(r.dentroTolerancia).toBe(false);
    expect(r.quebraExcedente).toBeCloseTo(125, 0);
    expect(r.valorPrejuizo).toBeCloseTo(312.5, 1);
  });

  it('usa tolerância padrão por tipo de carga', () => {
    const r = calcularQuebraFrete({ pesoOrigem: 10000, pesoDestino: 9960, tipoCarga: 'fertilizantes' });
    // tolerância fertilizantes = 0.50% → 50kg tolerados, quebra real = 40kg
    expect(r.tolerancia).toBe(0.5);
    expect(r.dentroTolerancia).toBe(true);
  });

  it('detecta quebra atípica por distância', () => {
    const r = calcularQuebraFrete({ pesoOrigem: 30000, pesoDestino: 29700, distanciaKm: 100 });
    expect(r.distanciaKm).toBe(100);
    expect(r.quebraPorKm).toBeGreaterThan(0);
    expect(r.quebraAtipica).toBe(true);
  });

  it('sem quebra atípica em distância longa', () => {
    const r = calcularQuebraFrete({ pesoOrigem: 30000, pesoDestino: 29990, distanciaKm: 500 });
    // quebra % = 0.033%, por km = 0.000067% → não atípica
    expect(r.quebraAtipica).toBe(false);
  });
});
