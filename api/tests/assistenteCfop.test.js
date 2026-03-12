import { describe, it, expect } from 'vitest';
import { consultarCfop } from '../src/services/assistenteCfop.js';

describe('assistenteCfop', () => {
  it('consulta CFOP de venda para outro estado', () => {
    const r = consultarCfop({ tipo: 'saida', destino: 'outro_estado', operacao: 'venda' });
    expect(r.cfop).toBe('6.101');
    expect(r.descricao).toBeDefined();
    expect(r.mensagem).toBeNull();
  });

  it('consulta CFOP de venda no mesmo estado', () => {
    const r = consultarCfop({ tipo: 'saida', destino: 'mesmo_estado', operacao: 'venda' });
    expect(r.cfop).toBe('5.101');
  });

  it('busca reversa por código CFOP', () => {
    const r = consultarCfop({ cfop: '5.102' });
    expect(r.cfop).toBe('5.102');
    expect(r.tipo).toBeDefined();
    expect(r.destino).toBeDefined();
    expect(r.operacao).toBeDefined();
  });

  it('busca reversa com código sem ponto', () => {
    const r = consultarCfop({ cfop: '6101' });
    expect(r.cfop).toBe('6.101');
  });

  it('retorna sugestões para operação não encontrada', () => {
    const r = consultarCfop({ tipo: 'saida', destino: 'mesmo_estado', operacao: 'operacao_inexistente_xyz' });
    expect(r.cfop).toBeNull();
    expect(r.sugestoes).toBeDefined();
    expect(r.sugestoes.length).toBeGreaterThan(0);
  });

  it('resolve alias de operação', () => {
    const r = consultarCfop({ tipo: 'saida', destino: 'outro_estado', operacao: 'venda_futura' });
    expect(r.cfop).toBeDefined();
  });

  it('CFOP não encontrado retorna mensagem', () => {
    const r = consultarCfop({ cfop: '9.999' });
    expect(r.descricao).toBeNull();
    expect(r.mensagem).toBeDefined();
  });
});
