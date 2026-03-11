import { round } from '../utils/formatters.js';

const LIMITE_LCDPR = 153_999.50;

export function calcularTermometroLcdpr({ receitaBrutaTotal }) {
  const percentual = (receitaBrutaTotal / LIMITE_LCDPR) * 100;

  let status;
  if (percentual < 50) status = 'tranquilo';
  else if (percentual < 80) status = 'atencao';
  else if (percentual < 100) status = 'alerta';
  else status = 'obrigatorio';

  return {
    receitaTotal: round(receitaBrutaTotal, 2),
    limite: LIMITE_LCDPR,
    percentual: round(percentual, 2),
    status,
    obrigatorio: receitaBrutaTotal >= LIMITE_LCDPR,
  };
}
