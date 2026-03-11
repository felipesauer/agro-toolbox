import { z } from 'zod';

export const funruralComparativoSchema = z.object({
  receitaBrutaAnual: z.number().positive(),
  folhaPagamentoMensal: z.number().positive(),
  numEmpregados: z.number().int().positive(),
  rat: z.number().min(0).max(0.04).optional(),
});
