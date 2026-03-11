import { z } from 'zod';
import { CULTURAS } from '../constants/culturas.js';

const culturas = Object.keys(CULTURAS);

export const cicloCulturaSchema = z.object({
  cultura: z.enum(culturas, { message: `Cultura inválida. Opções: ${culturas.join(', ')}` }),
  variedade: z.string().optional(),
  dataPlantio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
  cicloCustom: z.number().int().positive().optional(),
});
