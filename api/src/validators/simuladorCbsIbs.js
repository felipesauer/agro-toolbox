import { z } from 'zod';

export const simuladorCbsIbsSchema = z.object({
  ncm: z.string().min(4),
  valorOperacao: z.number().positive(),
  tipo: z.enum(['venda', 'compra']),
  uf: z.string().length(2),
  creditosEntrada: z.number().min(0).optional(),
});
