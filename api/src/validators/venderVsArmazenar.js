import { z } from 'zod';

export const venderVsArmazenarSchema = z.object({
  quantidade: z.number().positive(),
  precoAtual: z.number().positive(),
  precoFuturo: z.number().positive(),
  mesesArmazenagem: z.number().int().positive(),
  custoArmazenagemMes: z.number().min(0),
  taxaOportunidade: z.number().min(0).max(100).optional(),
  quebraTecnica: z.number().min(0).max(100).optional(),
});
