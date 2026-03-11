import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { simuladorCbsIbsSchema } from '../validators/simuladorCbsIbs.js';
import { creditoPresumidoSchema } from '../validators/creditoPresumido.js';
import * as reformaController from '../controllers/reforma.controller.js';

const reformaRouter = Router();

/**
 * @openapi
 * /reforma/simulador-cbs-ibs:
 *   post:
 *     summary: Simula CBS/IBS da reforma tributária
 *     tags: [Reforma Tributária]
 */
reformaRouter.post('/simulador-cbs-ibs', validate(simuladorCbsIbsSchema), reformaController.simularCbsIbs);

/**
 * @openapi
 * /reforma/consultor-ncm/{ncm}:
 *   get:
 *     summary: Consulta informações de NCM agro
 *     tags: [Reforma Tributária]
 *     parameters:
 *       - in: path
 *         name: ncm
 *         required: true
 *         schema:
 *           type: string
 */
reformaRouter.get('/consultor-ncm/:ncm', reformaController.consultarNcm);

/**
 * @openapi
 * /reforma/credito-presumido:
 *   post:
 *     summary: Calcula crédito presumido PF
 *     tags: [Reforma Tributária]
 */
reformaRouter.post('/credito-presumido', validate(creditoPresumidoSchema), reformaController.calcularCreditoPresumido);

export { reformaRouter };
