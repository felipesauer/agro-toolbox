import { round } from "@/lib/utils";

const LIMITE_LCDPR = 153_999.5;

type StatusLcdpr = "tranquilo" | "atencao" | "alerta" | "obrigatorio";

export interface TermometroLcdprInput {
  receitaBrutaTotal: number;
  receitasMensais?: number[];
}

function getStatus(percentual: number): StatusLcdpr {
  if (percentual < 50) return "tranquilo";
  if (percentual < 80) return "atencao";
  if (percentual < 100) return "alerta";
  return "obrigatorio";
}

export function calcularTermometroLcdpr({
  receitaBrutaTotal,
  receitasMensais,
}: TermometroLcdprInput) {
  const percentual = round((receitaBrutaTotal / LIMITE_LCDPR) * 100, 2);
  const status = getStatus(percentual);
  const saldoRestante = round(LIMITE_LCDPR - receitaBrutaTotal, 2);
  const ja_obrigatorio = receitaBrutaTotal >= LIMITE_LCDPR;

  const evolucaoMensal =
    receitasMensais && receitasMensais.length > 0
      ? receitasMensais.map((valor, index) => {
          const acumulado = receitasMensais
            .slice(0, index + 1)
            .reduce((a, b) => a + b, 0);
          return {
            mes: index + 1,
            receita: valor,
            acumulado: round(acumulado, 2),
            percentual: round((acumulado / LIMITE_LCDPR) * 100, 2),
            status: getStatus((acumulado / LIMITE_LCDPR) * 100),
          };
        })
      : undefined;

  const projAnual =
    receitasMensais && receitasMensais.length > 0
      ? round(
          (receitasMensais.reduce((a, b) => a + b, 0) /
            receitasMensais.length) *
            12,
          2
        )
      : undefined;

  return {
    receitaBrutaTotal,
    limiteLcdpr: LIMITE_LCDPR,
    percentual,
    status,
    saldoRestante,
    jaObrigatorio: ja_obrigatorio,
    mensagem: {
      tranquilo: "Situação tranquila. Receita abaixo de 50% do limite.",
      atencao: "Atenção! Receita entre 50–80% do limite. Monitore de perto.",
      alerta:
        "Alerta! Receita acima de 80% do limite. Prepare-se para o LCDPR.",
      obrigatorio:
        "Obrigatório! Receita superou o limite. LCDPR é obrigatório.",
    }[status],
    evolucaoMensal,
    projecaoAnual: projAnual,
    projecaoUltrapassaLimite:
      projAnual !== undefined ? projAnual >= LIMITE_LCDPR : undefined,
  };
}
