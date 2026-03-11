import { z } from 'zod';

export const acertoSafristaSchema = z.object({
  salarioMensal: z.number().positive(),
  mesesTrabalhados: z.number().positive().max(12),
  horasExtras: z.number().min(0).optional(),
  adicionalNoturno: z.boolean().optional(),
});
