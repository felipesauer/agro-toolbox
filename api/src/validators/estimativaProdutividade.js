import { z } from 'zod';

export const estimativaProdutividadeSchema = z.object({
  plantasPorM2: z.number().positive(),
  estruturasPorPlanta: z.number().positive(),
  graosPorEstrutura: z.number().positive(),
  pms: z.number().positive('PMS deve ser positivo (g)'),
});
