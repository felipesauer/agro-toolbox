import { describe, it, expect } from 'vitest';
import { calcularQuebraPesoNota } from '../src/services/quebraPesoNota.js';

describe('quebraPesoNota', () => {
  it('calcula diferença e ICMS complementar', () => {
    const r = calcularQuebraPesoNota({ pesoNota: 30000, pesoReal: 30500, valorUnitario: 2.0, aliquotaICMS: 12 });
    expect(r.diferenca).toBe(500);
    expect(r.valorComplementar).toBe(1000);
    expect(r.icmsComplementar).toBe(120);
  });

  it('calcula Funrural e PIS/COFINS complementar', () => {
    const r = calcularQuebraPesoNota({ pesoNota: 20000, pesoReal: 20200, valorUnitario: 3.0, aliquotaICMS: 7, aliquotaFunrural: 1.5, aliquotaPisCofins: 3.65 });
    expect(r.funruralComplementar).toBeCloseTo(9, 0);
    expect(r.pisCofinsComplementar).toBeCloseTo(21.9, 0);
    expect(r.totalImpostosComplementar).toBeGreaterThan(0);
    expect(r.valorLiquidoComplementar).toBeLessThan(r.valorComplementar);
  });

  it('calcula total impostos complementar corretamente', () => {
    const r = calcularQuebraPesoNota({ pesoNota: 10000, pesoReal: 10100, valorUnitario: 5.0, aliquotaICMS: 12, aliquotaFunrural: 1.5 });
    const esperado = r.icmsComplementar + r.funruralComplementar;
    expect(r.totalImpostosComplementar).toBeCloseTo(esperado, 2);
  });
});
