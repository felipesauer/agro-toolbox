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
  quilometro_quadrado: { m2: 1_000_000, nome: 'Quilômetro Quadrado (km²)' },
  acre: { m2: 4_046.86, nome: 'Acre' },
};

// Fatores de conversão de peso — base em kg
export const UNIDADES_PESO = {
  kg: { kg: 1, nome: 'Quilograma (kg)' },
  tonelada: { kg: 1_000, nome: 'Tonelada (t)' },
  arroba: { kg: 15, nome: 'Arroba (@)' },
  libra: { kg: 0.4536, nome: 'Libra (lb)' },
};

// Unidades aceitas na NFe
export const UNIDADES_NFE = {
  KG: { kg: 1, nome: 'Quilograma' },
  TON: { kg: 1_000, nome: 'Tonelada' },
  SC: { kg: 60, nome: 'Saca (60kg padrão)' },
  LT: { litro: 1, nome: 'Litro' },
  M3: { litro: 1_000, nome: 'Metro Cúbico' },
  UN: { un: 1, nome: 'Unidade' },
};
