// Fatores de conversão — todas as unidades convertidas para m²
export const UNIDADES_AREA = {
  metro_quadrado: { m2: 1, nome: 'Metro Quadrado (m²)' },
  hectare: { m2: 10_000, nome: 'Hectare (ha)' },
  alqueire_sp: { m2: 24_200, nome: 'Alqueire Paulista' },
  alqueire_mg: { m2: 48_400, nome: 'Alqueire Mineiro/Goiano' },
  alqueire_nordeste: { m2: 27_225, nome: 'Alqueire do Nordeste' },
  tarefa_ba: { m2: 4_356, nome: 'Tarefa Baiana' },
  tarefa_se: { m2: 3_052, nome: 'Tarefa Sergipana' },
  braca_quadrada: { m2: 4.84, nome: 'Braça Quadrada' },
  braca_linear: { m2: 2.2, nome: 'Braça Linear (m)', linear: true },
  quilometro_quadrado: { m2: 1_000_000, nome: 'Quilômetro Quadrado (km²)' },
  acre: { m2: 4_046.86, nome: 'Acre' },
  litro_terra: { m2: 605, nome: 'Litro de Terra (0,0605 ha)' },
};

// Fatores de conversão de peso — base em kg
export const UNIDADES_PESO = {
  kg: { kg: 1, nome: 'Quilograma (kg)' },
  tonelada: { kg: 1_000, nome: 'Tonelada (t)' },
  arroba: { kg: 15, nome: 'Arroba (@)' },
  libra: { kg: 0.4536, nome: 'Libra (lb)' },
};

// Unidades aceitas na NFe — mapeamento conforme NT 2021.004
export const UNIDADES_NFE = {
  KG: { kg: 1, nome: 'Quilograma', uTrib: 'KGM' },
  TON: { kg: 1_000, nome: 'Tonelada', uTrib: 'TNE' },
  SC: { kg: 60, nome: 'Saca (60kg padrão)', uTrib: 'SC' },
  LT: { litro: 1, nome: 'Litro', uTrib: 'LTR' },
  M3: { litro: 1_000, nome: 'Metro Cúbico', uTrib: 'MTQ' },
  UN: { un: 1, nome: 'Unidade', uTrib: 'UNI' },
  CX: { un: 1, nome: 'Caixa', uTrib: 'CX' },
  DZ: { un: 12, nome: 'Dúzia', uTrib: 'DZ' },
  FD: { un: 1, nome: 'Fardo', uTrib: 'FD' },
  GF: { un: 1, nome: 'Garrafa', uTrib: 'GF' },
  PCT: { un: 1, nome: 'Pacote', uTrib: 'PCT' },
  PC: { un: 1, nome: 'Peça', uTrib: 'PC' },
  ML: { litro: 0.001, nome: 'Mililitro', uTrib: 'MLT' },
  GL: { litro: 3.78541, nome: 'Galão', uTrib: 'GL' },
  ARR: { kg: 15, nome: 'Arroba', uTrib: 'ARR' },
  '@': { kg: 15, nome: 'Arroba', uTrib: 'ARR' },
};

// uTrib reverse lookup
export const UTRIB_TO_NFE = Object.fromEntries(
  Object.entries(UNIDADES_NFE).map(([code, data]) => [data.uTrib, code])
);
