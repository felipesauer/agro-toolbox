import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { conversorMedidasSchema } from '../validators/conversorMedidas.js';
import { conversorSacasSchema } from '../validators/conversorSacas.js';
import { quebraUmidadeSchema } from '../validators/quebraUmidade.js';
import { cicloCulturaSchema } from '../validators/cicloCultura.js';
import { necessidadeSementesSchema } from '../validators/necessidadeSementes.js';
import { estimativaProdutividadeSchema } from '../validators/estimativaProdutividade.js';
import { volumeCaldaSchema } from '../validators/volumeCalda.js';
import { calagemSchema } from '../validators/calagem.js';
import * as agronomicaController from '../controllers/agronomica.controller.js';

const agronomicaRouter = Router();

/**
 * @openapi
 * /agronomica/conversor-medidas:
 *   post:
 *     summary: Converte entre medidas agrárias
 *     tags: [Agronômica]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [valor, de, para]
 *             properties:
 *               valor: { type: number }
 *               de: { type: string }
 *               para: { type: string }
 *     responses:
 *       200:
 *         description: Conversão realizada
 */
agronomicaRouter.post('/conversor-medidas', validate(conversorMedidasSchema), agronomicaController.converterMedidas);

/**
 * @openapi
 * /agronomica/conversor-sacas:
 *   post:
 *     summary: Converte sacas para kg/toneladas e vice-versa
 *     tags: [Agronômica]
 */
agronomicaRouter.post('/conversor-sacas', validate(conversorSacasSchema), agronomicaController.converterSacas);

/**
 * @openapi
 * /agronomica/quebra-umidade:
 *   post:
 *     summary: Calcula desconto por umidade e impureza
 *     tags: [Agronômica]
 */
agronomicaRouter.post('/quebra-umidade', validate(quebraUmidadeSchema), agronomicaController.calcularQuebraUmidade);

/**
 * @openapi
 * /agronomica/ciclo-cultura:
 *   post:
 *     summary: Calcula data estimada de colheita
 *     tags: [Agronômica]
 */
agronomicaRouter.post('/ciclo-cultura', validate(cicloCulturaSchema), agronomicaController.calcularCicloCultura);

/**
 * @openapi
 * /agronomica/necessidade-sementes:
 *   post:
 *     summary: Calcula necessidade de sementes por hectare
 *     tags: [Agronômica]
 */
agronomicaRouter.post('/necessidade-sementes', validate(necessidadeSementesSchema), agronomicaController.calcularNecessidadeSementes);

/**
 * @openapi
 * /agronomica/estimativa-produtividade:
 *   post:
 *     summary: Estima produtividade da lavoura
 *     tags: [Agronômica]
 */
agronomicaRouter.post('/estimativa-produtividade', validate(estimativaProdutividadeSchema), agronomicaController.calcularEstimativaProdutividade);

/**
 * @openapi
 * /agronomica/volume-calda:
 *   post:
 *     summary: Calcula volume de calda por hectare
 *     tags: [Agronômica]
 */
agronomicaRouter.post('/volume-calda', validate(volumeCaldaSchema), agronomicaController.calcularVolumeCalda);

/**
 * @openapi
 * /agronomica/calagem:
 *   post:
 *     summary: Calcula necessidade de calcário
 *     tags: [Agronômica]
 */
agronomicaRouter.post('/calagem', validate(calagemSchema), agronomicaController.calcularCalagem);

export { agronomicaRouter };
