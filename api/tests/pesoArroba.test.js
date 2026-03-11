import { describe, it, expect } from 'vitest';
import { calcularPesoArroba } from '../src/services/pesoArroba.js';

describe('pesoArroba', () => {
  it('calcula arrobas de boi de 450kg com rendimento padrão 50%', () => {
    const result = calcularPesoArroba({ pesoVivo: 450 });
    expect(result.arrobas).toBe(15);
    expect(result.pesoCarcaca).toBe(225);
  });

  it('calcula com rendimento customizado', () => {
    const result = calcularPesoArroba({ pesoVivo: 500, rendimentoCarcaca: 52 });
    expect(result.arrobas).toBeCloseTo(17.33, 1);
  });
});
