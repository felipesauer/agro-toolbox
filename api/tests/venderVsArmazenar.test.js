import { describe, it, expect } from 'vitest';
import { calcularVenderVsArmazenar } from '../src/services/venderVsArmazenar.js';

describe('venderVsArmazenar', () => {
  it('recomenda armazenar quando preço futuro compensa', () => {
    const r = calcularVenderVsArmazenar({
      quantidade: 1000, precoAtual: 100, precoFuturo: 130,
      mesesArmazenagem: 4, custoArmazenagemMes: 500,
    });
    expect(r.receitaVendaImediata).toBe(100000);
    expect(r.receitaArmazenagem).toBe(130000);
    expect(r.recomendacao).toBe('Armazenar e vender depois');
  });

  it('recomenda vender quando custo de armazenagem alto', () => {
    const r = calcularVenderVsArmazenar({
      quantidade: 1000, precoAtual: 100, precoFuturo: 105,
      mesesArmazenagem: 6, custoArmazenagemMes: 3000, taxaOportunidade: 12,
    });
    expect(r.recomendacao).toBe('Vender agora na colheita');
  });

  it('calcula preço de equilíbrio', () => {
    const r = calcularVenderVsArmazenar({
      quantidade: 1000, precoAtual: 100, precoFuturo: 120,
      mesesArmazenagem: 3, custoArmazenagemMes: 1000,
    });
    expect(r.precoEquilibrio).toBeGreaterThan(100);
    expect(r.precoEquilibrio).toBeLessThan(120);
  });

  it('calcula retorno de armazenagem percentual', () => {
    const r = calcularVenderVsArmazenar({
      quantidade: 500, precoAtual: 80, precoFuturo: 100,
      mesesArmazenagem: 3, custoArmazenagemMes: 200,
    });
    expect(typeof r.retornoArmazenagem).toBe('number');
  });

  it('considera quebra técnica na quantidade final', () => {
    const r = calcularVenderVsArmazenar({
      quantidade: 1000, precoAtual: 100, precoFuturo: 120,
      mesesArmazenagem: 6, custoArmazenagemMes: 500, quebraTecnica: 2,
    });
    expect(r.detalhamento.quantidadeFinal).toBe(980);
    expect(r.detalhamento.perdaQuebra).toBeGreaterThan(0);
  });
});
