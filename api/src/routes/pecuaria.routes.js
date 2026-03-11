import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { pesoArrobaSchema } from '../validators/pesoArroba.js';
import { lotacaoPastagemSchema } from '../validators/lotacaoPastagem.js';
import * as pecuariaController from '../controllers/pecuaria.controller.js';

const pecuariaRouter = Router();

/**
 * @openapi
 * /pecuaria/peso-arroba:
 *   post:
 *     summary: Converte peso vivo para arroba
 *     tags: [Pecuária]
 */
pecuariaRouter.post('/peso-arroba', validate(pesoArrobaSchema), pecuariaController.calcularPesoArroba);

/**
 * @openapi
 * /pecuaria/lotacao-pastagem:
 *   post:
 *     summary: Calcula taxa de lotação UA/ha
 *     tags: [Pecuária]
 */
pecuariaRouter.post('/lotacao-pastagem', validate(lotacaoPastagemSchema), pecuariaController.calcularLotacaoPastagem);

export { pecuariaRouter };
