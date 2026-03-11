import { z } from 'zod';

export const pesoArrobaSchema = z.object({
  pesoVivo: z.number().positive('Peso vivo deve ser positivo'),
  rendimentoCarcaca: z.number().min(1).max(100).optional(),
});
