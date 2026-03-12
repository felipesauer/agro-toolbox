import { describe, it, expect } from 'vitest';
import { calcularAcertoSafrista } from '../src/services/acertoSafrista.js';

describe('acertoSafrista', () => {
  it('calcula acerto básico de 6 meses', () => {
    const r = calcularAcertoSafrista({ salarioMensal: 2000, mesesTrabalhados: 6 });
    expect(r.salarioBruto).toBe(12000);
    expect(r.feriasProporcionais).toBe(1000);
    expect(r.decimoTerceiro).toBe(1000);
    expect(r.fgts).toBeGreaterThan(0);
    expect(r.totalAcerto).toBeGreaterThan(12000);
  });

  it('calcula multa FGTS em dispensa sem justa causa', () => {
    const r = calcularAcertoSafrista({ salarioMensal: 2000, mesesTrabalhados: 6, motivoRescisao: 'dispensa_sem_justa_causa' });
    expect(r.multaFgts).toBeGreaterThan(0);
    expect(r.multaFgts).toBeCloseTo(r.fgts * 0.40, 1);
  });

  it('calcula multa FGTS 20% em acordo', () => {
    const r = calcularAcertoSafrista({ salarioMensal: 2000, mesesTrabalhados: 6, motivoRescisao: 'acordo' });
    expect(r.multaFgts).toBeCloseTo(r.fgts * 0.20, 1);
  });

  it('sem multa FGTS em término de contrato', () => {
    const r = calcularAcertoSafrista({ salarioMensal: 2000, mesesTrabalhados: 6, motivoRescisao: 'termino_contrato' });
    expect(r.multaFgts).toBe(0);
  });

  it('calcula horas extras e adicional noturno', () => {
    const r = calcularAcertoSafrista({ salarioMensal: 2000, mesesTrabalhados: 6, horasExtras: 20, adicionalNoturno: true });
    expect(r.horasExtrasValor).toBeGreaterThan(0);
    expect(r.adicionalNoturno).toBeGreaterThan(0);
  });

  it('calcula aviso prévio', () => {
    const r = calcularAcertoSafrista({ salarioMensal: 3000, mesesTrabalhados: 12, diasAvisoPrevio: 30 });
    expect(r.avisoPrevio).toBe(3000);
  });

  it('calcula custo empregador total', () => {
    const r = calcularAcertoSafrista({ salarioMensal: 2500, mesesTrabalhados: 8 });
    expect(r.custoEmpregadorTotal).toBe(r.totalAcerto + r.fgts);
  });
});
