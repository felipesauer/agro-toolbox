import { z } from 'zod';

export const retencaoFunruralSchema = z.object({
  valorBruto: z.number().positive(),
  tipoPessoa: z.enum(['PF', 'PJ']),
  optanteFolha: z.boolean().optional(),
});
