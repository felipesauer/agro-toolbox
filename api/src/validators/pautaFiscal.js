import { z } from 'zod';

export const pautaFiscalSchema = z.object({
  estado: z.string().length(2),
  produto: z.string().min(1),
  precoVenda: z.number().positive(),
  quantidade: z.number().positive(),
});
