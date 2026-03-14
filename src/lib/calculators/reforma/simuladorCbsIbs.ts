import { CBS_REFERENCIA } from "@/lib/constants/cbsReferencia";
import { round } from "@/lib/utils";

// Alíquotas de referência plenas — LC 214/2025
const ALIQUOTA_CBS_FALLBACK = 0.088;
const ALIQUOTA_IBS_FALLBACK = 0.177;

// Produtos agro com redução de 60% (cesta básica ampliada)
const NCM_REDUCAO_60 = new Set([
  "1001", "1005", "1201", "1006", "0901",
  "0713", "1701", "1507", "1515", "0207",
  "0203", "0201", "0202", "0401",
]);

// Produtos agro com alíquota zero (cesta básica nacional — Art. 8 LC 214)
const NCM_ALIQUOTA_ZERO = new Set([
  "0702", "0703", "0704", "0705", "0706", "0707", "0708", "0709", "0710",
  "0803", "0804", "0805", "0806", "0807", "0808", "0809", "0810",
  "1901", "0407",
]);

function getReducaoLocal(ncm: string): number {
  const ncm4 = ncm.substring(0, 4);
  if (NCM_ALIQUOTA_ZERO.has(ncm4)) return 1.0;
  if (NCM_REDUCAO_60.has(ncm4)) return 0.6;
  return 0;
}

function getAliquotasLocais(uf?: string) {
  const ano = new Date().getFullYear();
  const trans = CBS_REFERENCIA.transicao[ano];
  const cbsRate = trans ? trans.cbs : ALIQUOTA_CBS_FALLBACK;
  const ibsUf = uf ? CBS_REFERENCIA.ibsPorUf[uf] : undefined;
  const ibsRate = ibsUf
    ? ibsUf.uf + ibsUf.municipal
    : trans
    ? trans.ibs
    : ALIQUOTA_IBS_FALLBACK;
  return { cbs: cbsRate, ibs: ibsRate };
}

export interface SimuladorCbsIbsItem {
  ncm: string;
  valorOperacao: number;
  creditosEntrada?: number;
}

export interface SimuladorCbsIbsInput {
  ncm?: string;
  valorOperacao?: number;
  tipo?: string;
  uf?: string;
  creditosEntrada?: number;
  itens?: SimuladorCbsIbsItem[];
}

function calcularItem(
  { ncm, valorOperacao, creditosEntrada = 0 }: SimuladorCbsIbsItem,
  uf?: string
) {
  const reducao = getReducaoLocal(ncm);
  const fator = 1 - reducao;
  const { cbs: aliqCbs, ibs: aliqIbs } = getAliquotasLocais(uf);

  const cbsEfetiva = aliqCbs * fator;
  const ibsEfetiva = aliqIbs * fator;
  const totalEfetiva = cbsEfetiva + ibsEfetiva;

  const cbsValor = round(valorOperacao * cbsEfetiva, 2);
  const ibsValor = round(valorOperacao * ibsEfetiva, 2);
  const totalBruto = round(cbsValor + ibsValor, 2);

  const creditoUtilizado = Math.min(creditosEntrada, totalBruto);
  const totalLiquido = round(totalBruto - creditoUtilizado, 2);

  return {
    ncm,
    valorOperacao,
    uf,
    reducao: reducao > 0 ? `${round(reducao * 100, 0)}%` : "Sem redução",
    aliquotas: {
      cbs: round(cbsEfetiva * 100, 2),
      ibs: round(ibsEfetiva * 100, 2),
      total: round(totalEfetiva * 100, 2),
    },
    valores: {
      cbs: cbsValor,
      ibs: ibsValor,
      totalBruto,
      creditosEntrada: round(creditoUtilizado, 2),
      totalLiquido,
    },
    memoriaCalculo: [
      `Alíquota CBS: ${round(aliqCbs * 100, 2)}% × fator (1 - ${round(reducao * 100, 0)}%) = ${round(cbsEfetiva * 100, 2)}%`,
      `Alíquota IBS: ${round(aliqIbs * 100, 2)}% × fator = ${round(ibsEfetiva * 100, 2)}%`,
      `CBS: R$ ${valorOperacao.toFixed(2)} × ${round(cbsEfetiva * 100, 2)}% = R$ ${cbsValor.toFixed(2)}`,
      `IBS: R$ ${valorOperacao.toFixed(2)} × ${round(ibsEfetiva * 100, 2)}% = R$ ${ibsValor.toFixed(2)}`,
      `Total bruto: R$ ${totalBruto.toFixed(2)}`,
      creditoUtilizado > 0 ? `Créditos: -R$ ${creditoUtilizado.toFixed(2)}` : null,
      `Total líquido: R$ ${totalLiquido.toFixed(2)}`,
    ].filter(Boolean) as string[],
    fonteAliquotas: "local",
    aviso:
      "Valores de referência local — alíquotas sujeitas a atualização durante transição da Reforma Tributária.",
  };
}

export function simularCbsIbs(params: SimuladorCbsIbsInput) {
  const { ncm, valorOperacao, tipo, uf, creditosEntrada = 0, itens } = params;

  if (itens && Array.isArray(itens) && itens.length > 0) {
    const resultados = itens.map((item) => calcularItem(item, uf));
    const totais = resultados.reduce(
      (acc, r) => ({
        cbs: acc.cbs + r.valores.cbs,
        ibs: acc.ibs + r.valores.ibs,
        bruto: acc.bruto + r.valores.totalBruto,
      }),
      { cbs: 0, ibs: 0, bruto: 0 }
    );
    const creditoUtilizado = Math.min(creditosEntrada, totais.bruto);
    return {
      tipo,
      uf,
      itens: resultados,
      totais: {
        cbs: round(totais.cbs, 2),
        ibs: round(totais.ibs, 2),
        totalBruto: round(totais.bruto, 2),
        creditosEntrada: round(creditoUtilizado, 2),
        totalLiquido: round(totais.bruto - creditoUtilizado, 2),
      },
      fonteAliquotas: "local",
      aviso:
        "Valores de referência local — alíquotas sujeitas a atualização durante transição da Reforma Tributária.",
    };
  }

  if (!ncm || !valorOperacao) {
    return {
      erro: "Informe ncm e valorOperacao, ou um array de itens.",
    };
  }

  return calcularItem({ ncm, valorOperacao, creditosEntrada }, uf);
}
