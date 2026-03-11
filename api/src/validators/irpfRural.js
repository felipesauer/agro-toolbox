import { z } from 'zod';

export const irpfRuralSchema = z.object({
  receitaBruta: z.number().positive(),
  despesasDedutiveis: z.number().min(0),
});
