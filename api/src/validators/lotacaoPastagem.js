import { z } from 'zod';

export const lotacaoPastagemSchema = z.object({
  numAnimais: z.number().int().positive(),
  pesoMedio: z.number().positive(),
  areaPastagem: z.number().positive(),
});
