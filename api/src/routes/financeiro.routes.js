import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { depreciacaoSchema } from '../validators/depreciacao.js';
import { custoHoraMaquinaSchema } from '../validators/custoHoraMaquina.js';
import { venderVsArmazenarSchema } from '../validators/venderVsArmazenar.js';
import { custoFinanciamentoSchema } from '../validators/custoFinanciamento.js';
import { acertoSafristaSchema } from '../validators/acertoSafrista.js';
import * as financeiroController from '../controllers/financeiro.controller.js';

const financeiroRouter = Router();

/**
 * @openapi
 * /financeiro/depreciacao:
 *   post:
 *     summary: Calcula depreciação de maquinário
 *     tags: [Financeiro]
 */
financeiroRouter.post('/depreciacao', validate(depreciacaoSchema), financeiroController.calcularDepreciacao);

/**
 * @openapi
 * /financeiro/custo-hora-maquina:
 *   post:
 *     summary: Calcula custo de hora-máquina
 *     tags: [Financeiro]
 */
financeiroRouter.post('/custo-hora-maquina', validate(custoHoraMaquinaSchema), financeiroController.calcularCustoHoraMaquina);

/**
 * @openapi
 * /financeiro/vender-vs-armazenar:
 *   post:
 *     summary: Compara vender na colheita vs armazenar
 *     tags: [Financeiro]
 */
financeiroRouter.post('/vender-vs-armazenar', validate(venderVsArmazenarSchema), financeiroController.calcularVenderVsArmazenar);

/**
 * @openapi
 * /financeiro/custo-financiamento:
 *   post:
 *     summary: Simula custos de financiamento rural
 *     tags: [Financeiro]
 */
financeiroRouter.post('/custo-financiamento', validate(custoFinanciamentoSchema), financeiroController.calcularCustoFinanciamento);

/**
 * @openapi
 * /financeiro/acerto-safrista:
 *   post:
 *     summary: Calcula acerto de trabalhador safrista
 *     tags: [Financeiro]
 */
financeiroRouter.post('/acerto-safrista', validate(acertoSafristaSchema), financeiroController.calcularAcertoSafrista);

export { financeiroRouter };
