import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { simuladorCbsIbsSchema } from '../validators/simuladorCbsIbs.js';
import { creditoPresumidoSchema } from '../validators/creditoPresumido.js';
import { classificacaoTributariaSchema } from '../validators/classificacaoTributaria.js';
import { validadorXmlRtcSchema } from '../validators/validadorXmlRtc.js';
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

/**
 * @openapi
 * /reforma/classificacao-tributaria:
 *   post:
 *     summary: Consulta classificação tributária CBS/IBS por cClassTrib
 *     tags: [Reforma Tributária]
 */
reformaRouter.post('/classificacao-tributaria', validate(classificacaoTributariaSchema), reformaController.classificacaoTributaria);

/**
 * @openapi
 * /reforma/validador-xml-rtc:
 *   post:
 *     summary: Valida campos RTC (CBS/IBS) em XML de NF-e
 *     tags: [Reforma Tributária]
 */
reformaRouter.post('/validador-xml-rtc', validate(validadorXmlRtcSchema), reformaController.validarXmlRtc);

/**
 * @openapi
 * /reforma/situacoes-tributarias:
 *   get:
 *     summary: Lista situações tributárias CBS/IBS e Imposto Seletivo
 *     tags: [Reforma Tributária]
 */
reformaRouter.get('/situacoes-tributarias', reformaController.situacoesTributarias);

/**
 * @openapi
 * /reforma/aliquotas/{uf}:
 *   get:
 *     summary: Consulta alíquotas CBS + IBS por UF (tempo real)
 *     tags: [Reforma Tributária]
 *     parameters:
 *       - in: path
 *         name: uf
 *         required: true
 *         schema:
 *           type: string
 */
reformaRouter.get('/aliquotas/:uf', reformaController.aliquotasUf);

export { reformaRouter };
