import { describe, it, expect } from 'vitest';
import { calcularPautaFiscal } from '../src/services/pautaFiscal.js';

describe('pautaFiscal', () => {
  it('usa pauta quando preço de venda é inferior', () => {
    const r = calcularPautaFiscal({ estado: 'MT', produto: 'soja', precoVenda: 1200, quantidade: 100 });
    expect(r.usouPauta).toBe(true);
    expect(r.valorPauta).toBe(1520);
    expect(r.baseCalculo).toBe(152000);
    expect(r.diferencaPauta).toBeGreaterThan(0);
  });

  it('usa preço de venda quando superior à pauta', () => {
    const r = calcularPautaFiscal({ estado: 'MT', produto: 'soja', precoVenda: 1800, quantidade: 50 });
    expect(r.usouPauta).toBe(false);
    expect(r.baseCalculo).toBe(90000);
    expect(r.diferencaPauta).toBe(0);
  });

  it('retorna mensagem para estado não cadastrado', () => {
    const r = calcularPautaFiscal({ estado: 'AC', produto: 'soja', precoVenda: 1000, quantidade: 10 });
    expect(r.usouPauta).toBe(false);
    expect(r.mensagem).toContain('não possui pauta');
  });

  it('retorna produtos disponíveis quando produto não encontrado', () => {
    const r = calcularPautaFiscal({ estado: 'MT', produto: 'mandioca', precoVenda: 500, quantidade: 10 });
    expect(r.usouPauta).toBe(false);
    expect(r.produtosDisponiveis).toBeDefined();
    expect(r.produtosDisponiveis).toContain('soja');
  });

  it('consulta pauta de gado em R$/arroba', () => {
    const r = calcularPautaFiscal({ estado: 'SP', produto: 'gado', precoVenda: 200, quantidade: 100 });
    expect(r.usouPauta).toBe(true);
    expect(r.valorPauta).toBe(315);
  });
});
