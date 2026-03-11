import { z } from 'zod';
import { CULTURAS } from '../constants/culturas.js';

const culturas = Object.keys(CULTURAS);

export const quebraUmidadeSchema = z.object({
  pesoBruto: z.number().positive('Peso bruto deve ser positivo'),
  umidadeRecebida: z.number().min(0).max(100),
  impurezaRecebida: z.number().min(0).max(100),
  cultura: z.enum(culturas, { message: `Cultura inválida` }),
});
