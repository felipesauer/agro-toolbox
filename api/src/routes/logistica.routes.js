import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { quebraFreteSchema } from '../validators/quebraFrete.js';
import * as logisticaController from '../controllers/logistica.controller.js';

const logisticaRouter = Router();

/**
 * @openapi
 * /logistica/quebra-frete:
 *   post:
 *     summary: Calcula tolerância de quebra de frete
 *     tags: [Logística]
 */
logisticaRouter.post('/quebra-frete', validate(quebraFreteSchema), logisticaController.calcularQuebraFrete);

export { logisticaRouter };
