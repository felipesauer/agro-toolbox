import { describe, it, expect } from 'vitest';
import { calcularDepreciacao } from '../src/services/depreciacao.js';

describe('depreciacao', () => {
  it('calcula depreciação de trator R$500k em 10 anos', () => {
    const result = calcularDepreciacao({ valorAquisicao: 500000, valorResidual: 50000, vidaUtilAnos: 10 });
    expect(result.depreciacaoAnual).toBe(45000);
    expect(result.depreciacaoMensal).toBe(3750);
  });

  it('calcula valor atual após 5 anos de uso', () => {
    const result = calcularDepreciacao({ valorAquisicao: 500000, valorResidual: 50000, vidaUtilAnos: 10, anosUso: 5 });
    expect(result.acumulada).toBe(225000);
    expect(result.valorAtual).toBe(275000);
  });

  it('não deprecia abaixo do valor residual', () => {
    const result = calcularDepreciacao({ valorAquisicao: 100000, valorResidual: 20000, vidaUtilAnos: 5, anosUso: 10 });
    expect(result.valorAtual).toBe(20000);
  });
});
