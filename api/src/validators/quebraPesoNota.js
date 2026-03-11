import { z } from 'zod';

export const quebraPesoNotaSchema = z.object({
  pesoNota: z.number().positive(),
  pesoReal: z.number().positive(),
  valorUnitario: z.number().positive(),
  aliquotaICMS: z.number().min(0).max(100),
});
