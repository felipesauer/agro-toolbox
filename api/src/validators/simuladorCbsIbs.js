import { z } from 'zod';

const itemSchema = z.object({
  ncm: z.string().min(4),
  valorOperacao: z.number().positive(),
  creditosEntrada: z.number().min(0).optional(),
  cClassTrib: z.string().min(1).optional(),
});

export const simuladorCbsIbsSchema = z.object({
  ncm: z.string().min(4).optional(),
  valorOperacao: z.number().positive().optional(),
  tipo: z.enum(['venda', 'compra']),
  uf: z.string().length(2),
  creditosEntrada: z.number().min(0).optional(),
  municipio: z.string().optional(),
  cClassTrib: z.string().min(1).optional(),
  itens: z.array(itemSchema).optional(),
}).refine(
  (data) => data.ncm || (data.itens && data.itens.length > 0),
  { message: 'Informe ncm ou itens[]' },
);
