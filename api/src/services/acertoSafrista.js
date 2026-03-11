import { ENCARGOS_TRABALHISTAS, TABELA_INSS_EMPREGADO } from '../constants/aliquotas.js';
import { round } from '../utils/formatters.js';

function calcularInssEmpregado(salario) {
  let inss = 0;
  let anterior = 0;
  for (const faixa of TABELA_INSS_EMPREGADO) {
    const base = Math.min(salario, faixa.limite) - anterior;
    if (base <= 0) break;
    inss += base * faixa.aliquota;
    anterior = faixa.limite;
  }
  return round(inss, 2);
}

export function calcularAcertoSafrista({ salarioMensal, mesesTrabalhados, horasExtras = 0, adicionalNoturno = false }) {
  const salarioBruto = salarioMensal * mesesTrabalhados;

  // Horas extras (50%)
  const valorHoraExtra = (salarioMensal / 220) * 1.5 * horasExtras;

  // Adicional noturno (20% sobre horas 22h-5h — simplificado como adicional fixo se aplicável)
  const adicionalNoturnoValor = adicionalNoturno ? salarioMensal * 0.2 * mesesTrabalhados : 0;

  // FGTS
  const baseFgts = salarioBruto + valorHoraExtra + adicionalNoturnoValor;
  const fgts = round(baseFgts * ENCARGOS_TRABALHISTAS.fgts, 2);

  // INSS descontado do empregado (sobre último salário, para referência)
  const inssEmpregado = calcularInssEmpregado(salarioMensal);

  // Férias proporcionais + 1/3
  const feriasProporcionais = (salarioMensal / 12) * mesesTrabalhados;
  const tercoFerias = feriasProporcionais * ENCARGOS_TRABALHISTAS.tercoFerias;

  // 13º proporcional
  const decimoTerceiro = (salarioMensal / 12) * mesesTrabalhados;

  const totalAcerto = round(
    salarioBruto + valorHoraExtra + adicionalNoturnoValor +
    feriasProporcionais + tercoFerias + decimoTerceiro,
    2,
  );

  return {
    salarioMensal,
    mesesTrabalhados,
    salarioBruto: round(salarioBruto, 2),
    horasExtrasValor: round(valorHoraExtra, 2),
    adicionalNoturno: round(adicionalNoturnoValor, 2),
    inssEmpregado,
    fgts,
    feriasProporcionais: round(feriasProporcionais, 2),
    tercoFerias: round(tercoFerias, 2),
    decimoTerceiro: round(decimoTerceiro, 2),
    totalAcerto,
  };
}
