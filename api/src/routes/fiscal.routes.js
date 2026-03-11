import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { conversorUnidadesNfeSchema } from '../validators/conversorUnidadesNfe.js';
import { retencaoFunruralSchema } from '../validators/retencaoFunrural.js';
import { quebraPesoNotaSchema } from '../validators/quebraPesoNota.js';
import { funruralComparativoSchema } from '../validators/funruralComparativo.js';
import { irpfRuralSchema } from '../validators/irpfRural.js';
import { estimativaItrSchema } from '../validators/estimativaItr.js';
import { termometroLcdprSchema } from '../validators/termometroLcdpr.js';
import { fundosEstaduaisSchema } from '../validators/fundosEstaduais.js';
import { assistenteCfopSchema } from '../validators/assistenteCfop.js';
import { pautaFiscalSchema } from '../validators/pautaFiscal.js';
import * as fiscalController from '../controllers/fiscal.controller.js';

const fiscalRouter = Router();

/**
 * @openapi
 * /fiscal/conversor-unidades-nfe:
 *   post:
 *     summary: Converte unidades para NFe
 *     tags: [Fiscal]
 */
fiscalRouter.post('/conversor-unidades-nfe', validate(conversorUnidadesNfeSchema), fiscalController.converterUnidadesNfe);

/**
 * @openapi
 * /fiscal/retencao-funrural:
 *   post:
 *     summary: Calcula retenção de Funrural e Senar
 *     tags: [Fiscal]
 */
fiscalRouter.post('/retencao-funrural', validate(retencaoFunruralSchema), fiscalController.calcularRetencaoFunrural);

/**
 * @openapi
 * /fiscal/quebra-peso-nota:
 *   post:
 *     summary: Calcula nota complementar por quebra de peso
 *     tags: [Fiscal]
 */
fiscalRouter.post('/quebra-peso-nota', validate(quebraPesoNotaSchema), fiscalController.calcularQuebraPesoNota);

/**
 * @openapi
 * /fiscal/funrural-comparativo:
 *   post:
 *     summary: Compara Funrural comercialização vs folha
 *     tags: [Fiscal]
 */
fiscalRouter.post('/funrural-comparativo', validate(funruralComparativoSchema), fiscalController.calcularFunruralComparativo);

/**
 * @openapi
 * /fiscal/irpf-rural:
 *   post:
 *     summary: Compara IRPF Rural real vs presumido
 *     tags: [Fiscal]
 */
fiscalRouter.post('/irpf-rural', validate(irpfRuralSchema), fiscalController.calcularIrpfRural);

/**
 * @openapi
 * /fiscal/estimativa-itr:
 *   post:
 *     summary: Calcula estimativa de ITR
 *     tags: [Fiscal]
 */
fiscalRouter.post('/estimativa-itr', validate(estimativaItrSchema), fiscalController.calcularEstimativaItr);

/**
 * @openapi
 * /fiscal/termometro-lcdpr:
 *   post:
 *     summary: Termômetro de obrigatoriedade do LCDPR
 *     tags: [Fiscal]
 */
fiscalRouter.post('/termometro-lcdpr', validate(termometroLcdprSchema), fiscalController.calcularTermometroLcdpr);

/**
 * @openapi
 * /fiscal/fundos-estaduais:
 *   post:
 *     summary: Calcula fundos estaduais (FETHAB, FUNDEINFRA)
 *     tags: [Fiscal]
 */
fiscalRouter.post('/fundos-estaduais', validate(fundosEstaduaisSchema), fiscalController.calcularFundosEstaduais);

/**
 * @openapi
 * /fiscal/assistente-cfop:
 *   post:
 *     summary: Assistente de CFOP
 *     tags: [Fiscal]
 */
fiscalRouter.post('/assistente-cfop', validate(assistenteCfopSchema), fiscalController.consultarCfop);

/**
 * @openapi
 * /fiscal/pauta-fiscal:
 *   post:
 *     summary: Base de cálculo por pauta fiscal
 *     tags: [Fiscal]
 */
fiscalRouter.post('/pauta-fiscal', validate(pautaFiscalSchema), fiscalController.calcularPautaFiscal);

export { fiscalRouter };
