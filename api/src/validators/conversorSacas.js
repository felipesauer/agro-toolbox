import { z } from 'zod';
import { CULTURAS } from '../constants/culturas.js';

const culturas = Object.keys(CULTURAS);
const unidades = ['sacas', 'kg', 'toneladas'];

export const conversorSacasSchema = z.object({
  valor: z.number().positive('Valor deve ser positivo'),
  de: z.enum(unidades, { message: `Unidade inválida. Opções: ${unidades.join(', ')}` }),
  para: z.enum(unidades, { message: `Unidade inválida. Opções: ${unidades.join(', ')}` }),
  cultura: z.enum(culturas, { message: `Cultura inválida. Opções: ${culturas.join(', ')}` }),
});
