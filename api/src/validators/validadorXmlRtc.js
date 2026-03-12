import { z } from 'zod';

export const validadorXmlRtcSchema = z.object({
  xml: z.string().min(10, 'XML obrigatório'),
  tipoDfe: z.enum(['nfe', 'nfce']).optional().default('nfe'),
});
