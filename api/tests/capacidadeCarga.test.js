import { describe, it, expect } from 'vitest';
import { calcularCapacidadeCarga } from '../src/services/capacidadeCarga.js';

describe('capacidadeCarga', () => {
  it('calcula viagens para carga exata', () => {
    const r = calcularCapacidadeCarga({ pesoTotalKg: 74000, capacidadeCaminhaoKg: 37000 });
    expect(r.numeroViagens).toBe(2);
    expect(r.cargaUltimaViagem).toBe(37000);
    expect(r.aproveitamentoUltimaViagem).toBe(100);
  });

  it('calcula viagens com sobra', () => {
    const r = calcularCapacidadeCarga({ pesoTotalKg: 100000, capacidadeCaminhaoKg: 37000 });
    expect(r.numeroViagens).toBe(3);
    expect(r.cargaUltimaViagem).toBe(26000);
    expect(r.aproveitamentoUltimaViagem).toBeCloseTo(70.27, 1);
  });

  it('usa capacidade default de 37000 kg', () => {
    const r = calcularCapacidadeCarga({ pesoTotalKg: 37000 });
    expect(r.numeroViagens).toBe(1);
    expect(r.capacidadeCaminhaoKg).toBe(37000);
  });

  it('calcula tempo estimado com distância', () => {
    const r = calcularCapacidadeCarga({ pesoTotalKg: 74000, capacidadeCaminhaoKg: 37000, distanciaKm: 300, velocidadeMedia: 60 });
    // 2 viagens * (300*2/60) = 2 * 10 = 20h
    expect(r.tempoEstimadoTotal).toBe(20);
    expect(r.distanciaKm).toBe(300);
  });

  it('calcula tempo com velocidade customizada', () => {
    const r = calcularCapacidadeCarga({ pesoTotalKg: 37000, capacidadeCaminhaoKg: 37000, distanciaKm: 200, velocidadeMedia: 80 });
    // 1 viagem * (200*2/80) = 5h
    expect(r.tempoEstimadoTotal).toBe(5);
  });
});
