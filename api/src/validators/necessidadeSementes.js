import { z } from 'zod';

export const necessidadeSementesSchema = z.object({
  populacaoDesejada: z.number().positive('População desejada deve ser positiva (plantas/ha)'),
  pms: z.number().positive('PMS deve ser positivo (g)'),
  germinacao: z.number().min(1).max(100, 'Germinação deve ser entre 1 e 100 (%)'),
  pureza: z.number().min(1).max(100).optional(),
});
