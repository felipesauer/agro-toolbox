import { describe, it, expect } from 'vitest';
import { calcularVolumeCalda } from '../src/services/volumeCalda.js';

describe('volumeCalda', () => {
  it('calcula volume de calda padrão pulverização soja', () => {
    // Bico 0,8 L/min, 50cm espaçamento, 7 km/h
    const result = calcularVolumeCalda({ vazaoBico: 0.8, numBicos: 24, espacamentoBicos: 50, velocidade: 7 });
    expect(result.volumeHa).toBeCloseTo(137.14, 0);
  });

  it('aumenta volume com menor velocidade', () => {
    const result1 = calcularVolumeCalda({ vazaoBico: 0.8, numBicos: 24, espacamentoBicos: 50, velocidade: 7 });
    const result2 = calcularVolumeCalda({ vazaoBico: 0.8, numBicos: 24, espacamentoBicos: 50, velocidade: 5 });
    expect(result2.volumeHa).toBeGreaterThan(result1.volumeHa);
  });
});
