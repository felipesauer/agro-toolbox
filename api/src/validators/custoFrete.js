import { z } from 'zod';

export const custoFreteSchema = z.object({
  distanciaKm: z.number().positive(),
  valorFretePorKm: z.number().positive(),
  pesoTotalKg: z.number().positive(),
  pedagios: z.number().min(0).optional(),
  custoSeguro: z.number().min(0).optional(),
});
