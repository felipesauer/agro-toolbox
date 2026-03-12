import { describe, it, expect } from 'vitest';
import { consultarNcm } from '../src/services/consultorNcm.js';

describe('consultorNcm', () => {
  it('consulta NCM de soja', () => {
    const r = consultarNcm('12010090');
    expect(r.encontrado).toBe(true);
    expect(r.descricao).toContain('Soja');
    expect(r.cestaTributaria).toBe('reduzida');
    expect(r.reducaoAliquota).toBe('60%');
  });

  it('consulta NCM de tomate (alíquota zero)', () => {
    const r = consultarNcm('07020000');
    expect(r.encontrado).toBe(true);
    expect(r.cestaTributaria).toBe('zero');
    expect(r.reducaoAliquota).toBe('100%');
  });

  it('consulta NCM de defensivo agrícola', () => {
    const r = consultarNcm('38089190');
    expect(r.encontrado).toBe(true);
    expect(r.capitulo).toBeDefined();
  });

  it('retorna não encontrado para NCM fora da base agro', () => {
    const r = consultarNcm('99990000');
    expect(r.encontrado).toBe(false);
    expect(r.mensagem).toContain('não encontrado');
  });

  it('retorna observação sobre tributação', () => {
    const r = consultarNcm('10010010');
    expect(r.encontrado).toBe(true);
    expect(r.observacao).toBeDefined();
    expect(r.observacao.length).toBeGreaterThan(0);
  });

  it('identifica imposto seletivo quando aplicável', () => {
    const r = consultarNcm('12010090');
    expect(typeof r.impostoSeletivo).toBe('boolean');
  });
});
