import { z } from 'zod';

export const capacidadeCargaSchema = z.object({
  pesoTotalKg: z.number().positive(),
  capacidadeCaminhaoKg: z.number().positive().optional(),
  distanciaKm: z.number().positive().optional(),
  velocidadeMedia: z.number().positive().optional(),
});
