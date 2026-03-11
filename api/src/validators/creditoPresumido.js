import { z } from 'zod';

export const creditoPresumidoSchema = z.object({
  receitaBruta: z.number().positive(),
  custos: z.number().min(0),
  tipo: z.string().min(1),
  ncmPrincipal: z.string().min(4).optional(),
});
