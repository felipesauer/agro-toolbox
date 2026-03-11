import { describe, it, expect } from 'vitest';
import { converterSacas } from '../src/services/conversorSacas.js';

describe('conversorSacas', () => {
  it('converte 60 sacas de soja para kg', () => {
    const result = converterSacas({ valor: 60, de: 'sacas', para: 'kg', cultura: 'soja' });
    expect(result.resultado).toBe(3600);
  });

  it('converte tonelada para sacas de milho', () => {
    const result = converterSacas({ valor: 1, de: 'toneladas', para: 'sacas', cultura: 'milho' });
    expect(result.resultado).toBeCloseTo(16.6667, 2);
  });

  it('lança erro para cultura inválida', () => {
    expect(() => converterSacas({ valor: 1, de: 'sacas', para: 'kg', cultura: 'invalida' })).toThrow();
  });
});
