import { z } from 'zod';

export const fundosEstaduaisSchema = z.object({
  estado: z.string().length(2),
  produto: z.string().min(1),
  quantidade: z.number().positive(),
  valorOperacao: z.number().positive(),
});
