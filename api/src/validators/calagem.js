import { z } from 'zod';

export const calagemSchema = z.object({
  ctc: z.number().positive('CTC deve ser positiva'),
  saturacaoAtual: z.number().min(0).max(100, 'Saturação atual deve ser entre 0 e 100'),
  saturacaoDesejada: z.number().min(0).max(100, 'Saturação desejada deve ser entre 0 e 100'),
  prnt: z.number().min(1).max(100, 'PRNT deve ser entre 1 e 100'),
});
