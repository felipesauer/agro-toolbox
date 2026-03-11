import { z } from 'zod';
import { UNIDADES_AREA } from '../constants/conversoes.js';

const unidades = Object.keys(UNIDADES_AREA);

export const conversorMedidasSchema = z.object({
  valor: z.number().positive('Valor deve ser positivo'),
  de: z.enum(unidades, { message: `Unidade de origem inválida. Opções: ${unidades.join(', ')}` }),
  para: z.enum(unidades, { message: `Unidade de destino inválida. Opções: ${unidades.join(', ')}` }),
});
