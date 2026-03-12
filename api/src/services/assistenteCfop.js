import { CFOP_TABLE, OPERACAO_ALIASES } from '../constants/cfop.js';

export function consultarCfop({ tipo, destino, operacao, produto, cfop }) {
  // Reverse lookup by CFOP code
  if (cfop) {
    return buscarPorCfop(cfop);
  }

  const operacaoNorm = operacao.toLowerCase().trim().replace(/\s+/g, '_');
  const operacaoKey = OPERACAO_ALIASES[operacaoNorm] || operacaoNorm;

  const grupo = CFOP_TABLE[tipo]?.[destino];
  if (!grupo) {
    return {
      tipo,
      destino,
      operacao,
      produto: produto || null,
      cfop: null,
      descricao: null,
      mensagem: `Combinação tipo="${tipo}" + destino="${destino}" não encontrada.`,
      sugestoes: Object.keys(CFOP_TABLE[tipo] || {}),
    };
  }

  const resultado = grupo[operacaoKey];
  if (!resultado) {
    // Fuzzy: try partial match on keys
    const parcialKey = Object.keys(grupo).find((k) => k.includes(operacaoNorm) || operacaoNorm.includes(k));
    if (parcialKey) {
      const parcial = grupo[parcialKey];
      return {
        tipo, destino, operacao, produto: produto || null,
        cfop: parcial.cfop, descricao: parcial.descricao,
        mensagem: `Correspondência parcial encontrada para "${operacao}" → ${parcialKey}`,
      };
    }
    return {
      tipo,
      destino,
      operacao,
      produto: produto || null,
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
    produto: produto || null,
    cfop: resultado.cfop,
    descricao: resultado.descricao,
    mensagem: null,
  };
}

function buscarPorCfop(cfopCode) {
  const normalizado = cfopCode.replace(/\D/g, '');
  const formatted = normalizado.length >= 4
    ? normalizado.slice(0, 1) + '.' + normalizado.slice(1)
    : cfopCode;

  for (const [tipo, destinos] of Object.entries(CFOP_TABLE)) {
    for (const [destino, operacoes] of Object.entries(destinos)) {
      for (const [operacao, dados] of Object.entries(operacoes)) {
        if (dados.cfop === formatted || dados.cfop.replace('.', '') === normalizado) {
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
