import { ENCARGOS_TRABALHISTAS, TABELA_INSS_EMPREGADO } from "@/lib/constants/aliquotas";
import { round } from "@/lib/utils";

function calcularInssEmpregado(salario: number): number {
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

export interface AcertoSafristaInput {
  salarioMensal: number;
  mesesTrabalhados: number;
  horasExtras?: number;
  adicionalNoturno?: boolean;
  motivoRescisao?: "termino_contrato" | "dispensa_sem_justa_causa" | "rescisao_indireta" | "acordo" | "pedido_demissao";
  diasAvisoPrevio?: number;
}

export function calcularAcertoSafrista({
  salarioMensal,
  mesesTrabalhados,
  horasExtras = 0,
  adicionalNoturno = false,
  motivoRescisao = "termino_contrato",
  diasAvisoPrevio = 0,
}: AcertoSafristaInput) {
  const salarioBruto = salarioMensal * mesesTrabalhados;
  const valorHoraExtra = (salarioMensal / 220) * 1.5 * horasExtras;
  const adicionalNoturnoValor = adicionalNoturno
    ? salarioMensal * 0.2 * mesesTrabalhados
    : 0;

  const baseFgts = salarioBruto + valorHoraExtra + adicionalNoturnoValor;
  const fgts = round(baseFgts * ENCARGOS_TRABALHISTAS.fgts, 2);
  const inssEmpregado = calcularInssEmpregado(salarioMensal);

  const feriasProporcionais = (salarioMensal / 12) * mesesTrabalhados;
  const tercoFerias = feriasProporcionais * ENCARGOS_TRABALHISTAS.tercoFerias;
  const decimoTerceiro = (salarioMensal / 12) * mesesTrabalhados;

  let multaFgts = 0;
  if (motivoRescisao === "dispensa_sem_justa_causa" || motivoRescisao === "rescisao_indireta") {
    multaFgts = round(fgts * 0.4, 2);
  } else if (motivoRescisao === "acordo") {
    multaFgts = round(fgts * 0.2, 2);
  }

  const avisoPrevio =
    diasAvisoPrevio > 0
      ? round((salarioMensal / 30) * diasAvisoPrevio, 2)
      : 0;

  const totalAcerto = round(
    salarioBruto +
      valorHoraExtra +
      adicionalNoturnoValor +
      feriasProporcionais +
      tercoFerias +
      decimoTerceiro +
      multaFgts +
      avisoPrevio,
    2
  );

  return {
    salarioMensal,
    mesesTrabalhados,
    motivoRescisao,
    salarioBruto: round(salarioBruto, 2),
    horasExtrasValor: round(valorHoraExtra, 2),
    adicionalNoturno: round(adicionalNoturnoValor, 2),
    inssEmpregado,
    fgts,
    multaFgts,
    avisoPrevio,
    feriasProporcionais: round(feriasProporcionais, 2),
    tercoFerias: round(tercoFerias, 2),
    decimoTerceiro: round(decimoTerceiro, 2),
    totalAcerto,
    custoEmpregadorTotal: round(totalAcerto + fgts, 2),
  };
}
