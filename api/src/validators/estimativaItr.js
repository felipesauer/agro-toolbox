import { z } from 'zod';

export const estimativaItrSchema = z.object({
  areaTotal: z.number().positive(),
  areaUtilizada: z.number().min(0),
  areaPreservacao: z.number().min(0),
  vtn: z.number().positive('VTN (Valor da Terra Nua) deve ser positivo'),
});
