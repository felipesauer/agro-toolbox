import { describe, it, expect } from 'vitest';
import { calcularCicloCultura } from '../src/services/cicloCultura.js';

describe('cicloCultura', () => {
  it('calcula data colheita com ciclo médio', () => {
    const r = calcularCicloCultura({ cultura: 'soja', dataPlantio: '2025-10-01' });
    expect(r.cicloDias).toBe(120);
    expect(r.dataEstimadaColheita).toBe('2026-01-29');
    expect(r.cultura).toBe('Soja');
  });

  it('usa ciclo da variedade quando informada', () => {
    const r = calcularCicloCultura({ cultura: 'soja', variedade: 'precoce', dataPlantio: '2025-10-01' });
    expect(r.cicloDias).toBe(100);
    expect(r.variedade).toBe('precoce');
  });

  it('usa ciclo customizado quando fornecido', () => {
    const r = calcularCicloCultura({ cultura: 'milho', dataPlantio: '2025-09-15', cicloCustom: 90 });
    expect(r.cicloDias).toBe(90);
  });

  it('calcula progresso entre 0 e 100', () => {
    const r = calcularCicloCultura({ cultura: 'soja', dataPlantio: '2020-10-01' });
    expect(r.progresso).toBe(100);
    expect(r.diasRestantes).toBe(0);
  });

  it('calcula janela de segunda safra', () => {
    const r = calcularCicloCultura({ cultura: 'soja', dataPlantio: '2025-09-15', culturaSegunda: 'milho' });
    expect(r.segundaSafra).toBeDefined();
    expect(r.segundaSafra.cultura).toBe('Milho');
    expect(r.segundaSafra.cicloDias).toBe(130);
    expect(typeof r.segundaSafra.dentroJanelaIdeal).toBe('boolean');
  });

  it('lança erro para cultura inexistente', () => {
    expect(() => calcularCicloCultura({ cultura: 'invalida', dataPlantio: '2025-10-01' })).toThrow();
  });
});
