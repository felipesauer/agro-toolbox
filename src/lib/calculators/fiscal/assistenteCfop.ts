import { CFOP_TABLE } from "@/lib/constants/cfop";

const OPERACAO_ALIASES: Record<string, string> = {
  venda: "venda",
  compra: "compra",
  devolucao: "devolucao_compra",
  remessa: "remessa_deposito",
  transferencia: "transferencia",
  bonificacao: "bonificacao",
  consignacao: "remessa_consignacao",
  beneficiamento: "remessa_beneficiamento",
  complementar: "nota_complementar",
};

export interface AssistenteCfopInput {
  tipo?: "saida" | "entrada";
  destino?: "mesmo_estado" | "outro_estado" | "exterior";
  operacao?: string;
  produto?: string;
  cfop?: string;
}

export function consultarCfop({
  tipo,
  destino,
  operacao,
  produto,
  cfop,
}: AssistenteCfopInput) {
  if (cfop) {
    return buscarPorCfop(cfop);
  }

  if (!tipo || !destino || !operacao) {
    return {
      tipo,
      destino,
      operacao,
      cfop: null,
      descricao: null,
      mensagem: "Informe tipo, destino e operação, ou o código CFOP para busca reversa.",
    };
  }

  const operacaoNorm = operacao.toLowerCase().trim().replace(/\s+/g, "_");
  const operacaoKey = (OPERACAO_ALIASES as Record<string, string>)[operacaoNorm] ?? operacaoNorm;

  const grupo = (CFOP_TABLE as Record<string, Record<string, Record<string, { cfop: string; descricao: string }>>>)[tipo]?.[destino];
  if (!grupo) {
    return {
      tipo,
      destino,
      operacao,
      produto: produto ?? null,
      cfop: null,
      descricao: null,
      mensagem: `Combinação tipo="${tipo}" + destino="${destino}" não encontrada.`,
      sugestoes: Object.keys((CFOP_TABLE as Record<string, Record<string, unknown>>)[tipo] ?? {}),
    };
  }

  const resultado = grupo[operacaoKey];
  if (!resultado) {
    const parcialKey = Object.keys(grupo).find(
      (k) => k.includes(operacaoNorm) || operacaoNorm.includes(k)
    );
    if (parcialKey) {
      const parcial = grupo[parcialKey];
      return {
        tipo,
        destino,
        operacao,
        produto: produto ?? null,
        cfop: parcial.cfop,
        descricao: parcial.descricao,
        mensagem: `Correspondência parcial encontrada para "${operacao}" → ${parcialKey}`,
      };
    }
    return {
      tipo,
      destino,
      operacao,
      produto: produto ?? null,
      cfop: null,
      descricao: null,
      mensagem: `Operação "${operacao}" não encontrada para ${tipo} / ${destino}.`,
      sugestoes: Object.keys(grupo),
    };
  }

  return {
    tipo,
    destino,
    operacao,
    produto: produto ?? null,
    cfop: resultado.cfop,
    descricao: resultado.descricao,
    mensagem: null,
  };
}

function buscarPorCfop(cfopCode: string) {
  const normalizado = cfopCode.replace(/\D/g, "");
  const formatted =
    normalizado.length >= 4
      ? normalizado.slice(0, 1) + "." + normalizado.slice(1)
      : cfopCode;

  const table = CFOP_TABLE as Record<
    string,
    Record<string, Record<string, { cfop: string; descricao: string }>>
  >;

  for (const [tipo, destinos] of Object.entries(table)) {
    for (const [destino, operacoes] of Object.entries(destinos)) {
      for (const [operacao, dados] of Object.entries(operacoes)) {
        if (
          dados.cfop === formatted ||
          dados.cfop.replace(".", "") === normalizado
        ) {
          return {
            cfop: dados.cfop,
            descricao: dados.descricao,
            tipo,
            destino,
            operacao,
            mensagem: null,
          };
        }
      }
    }
  }

  return {
    cfop: cfopCode,
    descricao: null,
    tipo: null,
    destino: null,
    operacao: null,
    mensagem: `CFOP "${cfopCode}" não encontrado na base agro.`,
  };
}
