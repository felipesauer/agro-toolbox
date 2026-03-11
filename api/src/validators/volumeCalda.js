import { z } from 'zod';

export const volumeCaldaSchema = z.object({
  vazaoBico: z.number().positive('Vazão do bico deve ser positiva (L/min)'),
  numBicos: z.number().int().positive('Número de bicos deve ser positivo'),
  espacamentoBicos: z.number().positive('Espaçamento entre bicos deve ser positivo (cm)'),
  velocidade: z.number().positive('Velocidade deve ser positiva (km/h)'),
});
