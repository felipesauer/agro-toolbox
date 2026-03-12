import { z } from 'zod';

export const consultaAliquotasSchema = z.object({
  uf: z.string().length(2),
});
