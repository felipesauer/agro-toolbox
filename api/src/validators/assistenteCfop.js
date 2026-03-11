import { z } from 'zod';

export const assistenteCfopSchema = z.object({
  tipo: z.enum(['entrada', 'saida']),
  destino: z.enum(['mesmo_estado', 'outro_estado', 'exterior']),
  operacao: z.string().min(1),
  produto: z.string().optional(),
});
