import { z } from 'zod';

export const termometroLcdprSchema = z.object({
  receitaBrutaTotal: z.number().min(0),
});
