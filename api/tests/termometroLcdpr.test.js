import { describe, it, expect } from 'vitest';
import { calcularTermometroLcdpr } from '../src/services/termometroLcdpr.js';

describe('termometroLcdpr', () => {
  it('classifica como tranquilo abaixo de 50%', () => {
    const r = calcularTermometroLcdpr({ receitaBrutaTotal: 50000 });
    expect(r.status).toBe('tranquilo');
    expect(r.obrigatorio).toBe(false);
  });

  it('classifica como atencao entre 50% e 80%', () => {
    const r = calcularTermometroLcdpr({ receitaBrutaTotal: 100000 });
    expect(r.status).toBe('atencao');
  });

  it('classifica como obrigatório acima do limite', () => {
    const r = calcularTermometroLcdpr({ receitaBrutaTotal: 200000 });
    expect(r.status).toBe('obrigatorio');
    expect(r.obrigatorio).toBe(true);
    expect(r.margemRestante).toBe(0);
  });

  it('calcula margem restante', () => {
    const r = calcularTermometroLcdpr({ receitaBrutaTotal: 100000 });
    expect(r.margemRestante).toBeCloseTo(53999.50, 1);
  });

  it('calcula evolução mensal', () => {
    const mensais = [10000, 15000, 20000, 25000, 30000, 20000];
    const r = calcularTermometroLcdpr({ receitaBrutaTotal: 120000, receitasMensais: mensais });
    expect(r.evolucaoMensal).toHaveLength(6);
    expect(r.evolucaoMensal[5].acumulado).toBe(120000);
  });

  it('estima meses para atingir limite', () => {
    const mensais = [10000, 12000, 11000];
    const r = calcularTermometroLcdpr({ receitaBrutaTotal: 33000, receitasMensais: mensais });
    expect(r.mesesEstimadosParaLimite).toBeGreaterThan(0);
  });
});
