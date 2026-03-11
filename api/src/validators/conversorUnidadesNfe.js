import { z } from 'zod';
import { UNIDADES_NFE } from '../constants/conversoes.js';

const unidades = Object.keys(UNIDADES_NFE);

export const conversorUnidadesNfeSchema = z.object({
  valor: z.number().positive('Valor deve ser positivo'),
  de: z.enum(unidades, { message: `Unidade inválida. Opções: ${unidades.join(', ')}` }),
  para: z.enum(unidades, { message: `Unidade inválida. Opções: ${unidades.join(', ')}` }),
  cultura: z.string().optional(),
});
