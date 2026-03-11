import { z } from 'zod';

export const depreciacaoSchema = z.object({
  valorAquisicao: z.number().positive('Valor de aquisição deve ser positivo'),
  valorResidual: z.number().min(0).optional(),
  vidaUtilAnos: z.number().int().positive('Vida útil deve ser positiva'),
  anosUso: z.number().int().min(0).optional(),
});
