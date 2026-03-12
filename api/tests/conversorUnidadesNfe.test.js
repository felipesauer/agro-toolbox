import { describe, it, expect } from 'vitest';
import { converterUnidadesNfe } from '../src/services/conversorUnidadesNfe.js';

describe('conversorUnidadesNfe', () => {
  it('converte kg para tonelada', () => {
    const r = converterUnidadesNfe({ valor: 1000, de: 'KG', para: 'TON' });
    expect(r.resultado).toBe(1);
  });

  it('converte sacas de soja para kg', () => {
    const r = converterUnidadesNfe({ valor: 100, de: 'SC', para: 'KG', cultura: 'soja' });
    expect(r.resultado).toBe(6000);
    expect(r.cultura).toBe('Soja');
  });

  it('converte sacas de milho para tonelada', () => {
    const r = converterUnidadesNfe({ valor: 100, de: 'SC', para: 'TON', cultura: 'milho' });
    expect(r.resultado).toBe(6);
  });

  it('converte litro para m³', () => {
    const r = converterUnidadesNfe({ valor: 1000, de: 'LT', para: 'M3' });
    expect(r.resultado).toBe(1);
  });

  it('aceita uTrib como entrada', () => {
    const r = converterUnidadesNfe({ valor: 500, de: 'KGM', para: 'TON' });
    expect(r.resultado).toBe(0.5);
  });

  it('retorna uTrib nos resultados', () => {
    const r = converterUnidadesNfe({ valor: 100, de: 'KG', para: 'TON' });
    expect(r.uTribOrigem).toBeDefined();
    expect(r.uTribDestino).toBeDefined();
  });

  it('converte dúzia para unidade', () => {
    const r = converterUnidadesNfe({ valor: 5, de: 'DZ', para: 'UN' });
    expect(r.resultado).toBe(60);
  });

  it('lança erro para unidade inválida', () => {
    expect(() => converterUnidadesNfe({ valor: 1, de: 'INVALIDA', para: 'KG' })).toThrow();
  });

  it('lança erro para conversão entre grandezas diferentes', () => {
    expect(() => converterUnidadesNfe({ valor: 1, de: 'KG', para: 'LT' })).toThrow('incompatível');
  });
});
