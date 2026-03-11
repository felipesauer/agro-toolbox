import { z } from 'zod';

export const quebraFreteSchema = z.object({
  pesoOrigem: z.number().positive(),
  pesoDestino: z.number().positive(),
  tolerancia: z.number().min(0).max(100).optional(),
  tipoCarga: z.string().min(1),
  precoUnitario: z.number().positive().optional(),
});
