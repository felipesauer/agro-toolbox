// CBS/IBS reference rates — fallback when CBS API is unavailable
// Period: transição 2026 (LC 214/2025)

export const CBS_REFERENCIA = {
  aliquotaCBS: 0.009, // 0,9% em 2026 (ano-teste)
  aliquotaIBS: 0.001, // 0,1% em 2026 (ano-teste)

  transicao: {
    2026: { cbs: 0.009, ibs: 0.001, nota: "Ano-teste — alíquota simbólica" },
    2027: { cbs: 0.076, ibs: 0.018, nota: "Início fase de transição" },
    2028: { cbs: 0.076, ibs: 0.018, nota: "Transição — mantém 2027" },
    2029: { cbs: 0.088, ibs: 0.177, nota: "Alíquotas de referência plenas vigentes" },
    2030: { cbs: 0.088, ibs: 0.177, nota: "Redução gradual PIS/COFINS/ICMS/ISS" },
    2031: { cbs: 0.088, ibs: 0.177, nota: "Redução gradual PIS/COFINS/ICMS/ISS" },
    2032: { cbs: 0.088, ibs: 0.177, nota: "Redução gradual PIS/COFINS/ICMS/ISS" },
    2033: { cbs: 0.088, ibs: 0.177, nota: "Plenitude — extinção PIS/COFINS/ICMS/ISS" },
  } as Record<number, { cbs: number; ibs: number; nota: string }>,

  ibsPorUf: {
    AC: { uf: 0.0005, municipal: 0.0005 },
    AL: { uf: 0.0005, municipal: 0.0005 },
    AM: { uf: 0.0005, municipal: 0.0005 },
    AP: { uf: 0.0005, municipal: 0.0005 },
    BA: { uf: 0.0005, municipal: 0.0005 },
    CE: { uf: 0.0005, municipal: 0.0005 },
    DF: { uf: 0.001, municipal: 0 },
    ES: { uf: 0.0005, municipal: 0.0005 },
    GO: { uf: 0.0005, municipal: 0.0005 },
    MA: { uf: 0.0005, municipal: 0.0005 },
    MG: { uf: 0.0005, municipal: 0.0005 },
    MS: { uf: 0.0005, municipal: 0.0005 },
    MT: { uf: 0.0005, municipal: 0.0005 },
    PA: { uf: 0.0005, municipal: 0.0005 },
    PB: { uf: 0.0005, municipal: 0.0005 },
    PE: { uf: 0.0005, municipal: 0.0005 },
    PI: { uf: 0.0005, municipal: 0.0005 },
    PR: { uf: 0.0005, municipal: 0.0005 },
    RJ: { uf: 0.0005, municipal: 0.0005 },
    RN: { uf: 0.0005, municipal: 0.0005 },
    RO: { uf: 0.0005, municipal: 0.0005 },
    RR: { uf: 0.0005, municipal: 0.0005 },
    RS: { uf: 0.0005, municipal: 0.0005 },
    SC: { uf: 0.0005, municipal: 0.0005 },
    SE: { uf: 0.0005, municipal: 0.0005 },
    SP: { uf: 0.0005, municipal: 0.0005 },
    TO: { uf: 0.0005, municipal: 0.0005 },
  } as Record<string, { uf: number; municipal: number }>,

  codigosUf: {
    AC: 12, AL: 27, AM: 13, AP: 16, BA: 29, CE: 23, DF: 53,
    ES: 32, GO: 52, MA: 21, MG: 31, MS: 50, MT: 51, PA: 15,
    PB: 25, PE: 26, PI: 22, PR: 41, RJ: 33, RN: 24, RO: 11,
    RR: 14, RS: 43, SC: 42, SE: 28, SP: 35, TO: 17,
  } as Record<string, number>,
};

export const ANOS_TRANSICAO = Object.keys(CBS_REFERENCIA.transicao).map(Number);
export const UFS_BRASIL = Object.keys(CBS_REFERENCIA.ibsPorUf);
