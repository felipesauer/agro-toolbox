import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { quebraFreteSchema } from '../validators/quebraFrete.js';
import { custoFreteSchema } from '../validators/custoFrete.js';
import { capacidadeCargaSchema } from '../validators/capacidadeCarga.js';
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

/**
 * @openapi
 * /logistica/custo-frete:
 *   post:
 *     summary: Calcula custo de frete por tonelada e por saca
 *     tags: [Logística]
 */
logisticaRouter.post('/custo-frete', validate(custoFreteSchema), logisticaController.calcularCustoFrete);

/**
 * @openapi
 * /logistica/capacidade-carga:
 *   post:
 *     summary: Calcula número de viagens e capacidade de carga
 *     tags: [Logística]
 */
logisticaRouter.post('/capacidade-carga', validate(capacidadeCargaSchema), logisticaController.calcularCapacidadeCarga);

export { logisticaRouter };
