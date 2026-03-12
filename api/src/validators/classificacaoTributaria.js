import { z } from 'zod';

export const classificacaoTributariaSchema = z.object({
  ncm: z.string().min(4).max(10).optional(),
  siglaDfe: z.enum(['nfe', 'nfce']).optional(),
  cClassTrib: z.string().min(1).max(10).optional(),
});
