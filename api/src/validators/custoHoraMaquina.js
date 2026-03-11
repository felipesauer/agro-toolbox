import { z } from 'zod';

export const custoHoraMaquinaSchema = z.object({
  consumoCombustivel: z.number().positive('Consumo de combustível (L/h) deve ser positivo'),
  precoCombustivel: z.number().positive('Preço do combustível deve ser positivo'),
  custoManutencaoAnual: z.number().min(0),
  horasAnoUso: z.number().positive(),
  valorMaquina: z.number().positive(),
  vidaUtilAnos: z.number().int().positive(),
  custoOperador: z.number().min(0),
  seguroAnual: z.number().min(0).optional(),
});
