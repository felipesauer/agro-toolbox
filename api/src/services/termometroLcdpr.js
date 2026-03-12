import { round } from '../utils/formatters.js';

const LIMITE_LCDPR = 153_999.50;

export function calcularTermometroLcdpr({ receitaBrutaTotal, receitasMensais }) {
  const percentual = (receitaBrutaTotal / LIMITE_LCDPR) * 100;

  let status;
  if (percentual < 50) status = 'tranquilo';
  else if (percentual < 80) status = 'atencao';
  else if (percentual < 100) status = 'alerta';
  else status = 'obrigatorio';

  const margemRestante = Math.max(0, LIMITE_LCDPR - receitaBrutaTotal);

  const result = {
    receitaTotal: round(receitaBrutaTotal, 2),
    limite: LIMITE_LCDPR,
    percentual: round(percentual, 2),
    status,
    obrigatorio: receitaBrutaTotal >= LIMITE_LCDPR,
    margemRestante: round(margemRestante, 2),
  };

  // Monthly projection if receitasMensais provided
  if (receitasMensais && Array.isArray(receitasMensais)) {
    let acumulado = 0;
    result.evolucaoMensal = receitasMensais.map((valor, i) => {
      acumulado += valor;
      return {
        mes: i + 1,
        valor: round(valor, 2),
        acumulado: round(acumulado, 2),
        percentual: round((acumulado / LIMITE_LCDPR) * 100, 2),
      };
    });

    // Estimate when the limit will be reached (month)
    if (receitasMensais.length > 0) {
      const mediaMensal = receitaBrutaTotal / receitasMensais.length;
      if (mediaMensal > 0 && receitaBrutaTotal < LIMITE_LCDPR) {
        const mesesParaLimite = Math.ceil(margemRestante / mediaMensal);
        result.mesesEstimadosParaLimite = mesesParaLimite;
      }
    }
  }

  return result;
}
