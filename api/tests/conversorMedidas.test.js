import { describe, it, expect } from 'vitest';
import { converterMedidas } from '../src/services/conversorMedidas.js';

describe('conversorMedidas', () => {
  it('converte hectare para alqueire paulista', () => {
    const result = converterMedidas({ valor: 100, de: 'hectare', para: 'alqueire_sp' });
    expect(result.resultado).toBeCloseTo(41.3223, 2);
  });

  it('converte alqueire mineiro para hectare', () => {
    const result = converterMedidas({ valor: 10, de: 'alqueire_mg', para: 'hectare' });
    expect(result.resultado).toBeCloseTo(48.4, 1);
  });

  it('converte hectare para m²', () => {
    const result = converterMedidas({ valor: 1, de: 'hectare', para: 'metro_quadrado' });
    expect(result.resultado).toBe(10000);
  });

  it('lança erro para unidade inválida', () => {
    expect(() => converterMedidas({ valor: 1, de: 'invalida', para: 'hectare' })).toThrow();
  });
});
