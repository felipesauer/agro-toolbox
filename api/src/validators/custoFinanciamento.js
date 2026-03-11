import { z } from 'zod';

export const custoFinanciamentoSchema = z.object({
  valorFinanciamento: z.number().positive(),
  taxaAnual: z.number().positive(),
  prazoMeses: z.number().int().positive(),
  carenciaMeses: z.number().int().min(0).optional(),
  sistemaAmortizacao: z.enum(['SAC', 'PRICE']),
  tarifaBancaria: z.number().min(0).optional(),
});
