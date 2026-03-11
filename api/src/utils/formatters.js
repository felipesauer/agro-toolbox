export function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatNumber(valor, decimais = 2) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  });
}

export function round(valor, decimais = 2) {
  const fator = 10 ** decimais;
  return Math.round(valor * fator) / fator;
}
