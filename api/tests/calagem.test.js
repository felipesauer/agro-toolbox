import { describe, it, expect } from 'vitest';
import { calcularCalagem } from '../src/services/calagem.js';

describe('calagem', () => {
  it('calcula necessidade de calcário — solo argiloso típico', () => {
    const result = calcularCalagem({ ctc: 10, saturacaoAtual: 30, saturacaoDesejada: 60, prnt: 80 });
    expect(result.necessidadeCalcario).toBeCloseTo(3.75, 1);
  });

  it('retorna zero quando V1 >= V2', () => {
    const result = calcularCalagem({ ctc: 10, saturacaoAtual: 70, saturacaoDesejada: 60, prnt: 80 });
    expect(result.necessidadeCalcario).toBe(0);
  });

  it('calcula com PRNT 100', () => {
    const result = calcularCalagem({ ctc: 8, saturacaoAtual: 40, saturacaoDesejada: 60, prnt: 100 });
    expect(result.necessidadeCalcario).toBeCloseTo(1.6, 1);
  });
});
