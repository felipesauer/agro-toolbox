import { describe, it, expect } from 'vitest';
import { calcularLotacaoPastagem } from '../src/services/lotacaoPastagem.js';

describe('lotacaoPastagem', () => {
  it('calcula UA/ha e classifica como adequada', () => {
    const r = calcularLotacaoPastagem({ numAnimais: 50, pesoMedio: 450, areaPastagem: 50 });
    expect(r.totalUA).toBe(50);
    expect(r.uaPorHa).toBe(1);
    expect(r.classificacao).toBe('Adequada');
  });

  it('detecta superlotação', () => {
    const r = calcularLotacaoPastagem({ numAnimais: 200, pesoMedio: 450, areaPastagem: 20 });
    expect(r.uaPorHa).toBeGreaterThan(2.5);
    expect(r.classificacao).toBe('Superlotação');
  });

  it('detecta sublotação', () => {
    const r = calcularLotacaoPastagem({ numAnimais: 5, pesoMedio: 400, areaPastagem: 50 });
    expect(r.uaPorHa).toBeLessThan(0.5);
    expect(r.classificacao).toBe('Sublotação');
  });

  it('calcula capacidade máxima com forrageira', () => {
    const r = calcularLotacaoPastagem({ numAnimais: 50, pesoMedio: 450, areaPastagem: 30, forrageira: 'braquiaria_brizantha', periodo: 'aguas' });
    expect(r.forrageira).toBe('Brachiaria brizantha (Marandu)');
    expect(r.suporteForrageira).toBe(2.0);
    expect(r.capacidadeMaximaUA).toBe(60);
    expect(r.animaisMaximos).toBeGreaterThan(0);
  });

  it('ajusta suporte para período de seca', () => {
    const rAguas = calcularLotacaoPastagem({ numAnimais: 50, pesoMedio: 450, areaPastagem: 30, forrageira: 'panicum_mombaça', periodo: 'aguas' });
    const rSeca = calcularLotacaoPastagem({ numAnimais: 50, pesoMedio: 450, areaPastagem: 30, forrageira: 'panicum_mombaça', periodo: 'seca' });
    expect(rSeca.suporteForrageira).toBeLessThan(rAguas.suporteForrageira);
    expect(rSeca.animaisMaximos).toBeLessThan(rAguas.animaisMaximos);
  });

  it('calcula excedente de animais', () => {
    const r = calcularLotacaoPastagem({ numAnimais: 100, pesoMedio: 450, areaPastagem: 10, forrageira: 'braquiaria_decumbens', periodo: 'seca' });
    expect(r.excedente).toBeGreaterThan(0);
  });
});
