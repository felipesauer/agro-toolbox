import { Router } from 'express';
import { agronomicaRouter } from './agronomica.routes.js';
import { financeiroRouter } from './financeiro.routes.js';
import { pecuariaRouter } from './pecuaria.routes.js';
import { fiscalRouter } from './fiscal.routes.js';
import { reformaRouter } from './reforma.routes.js';
import { logisticaRouter } from './logistica.routes.js';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/agronomica', agronomicaRouter);
router.use('/financeiro', financeiroRouter);
router.use('/pecuaria', pecuariaRouter);
router.use('/fiscal', fiscalRouter);
router.use('/reforma', reformaRouter);
router.use('/logistica', logisticaRouter);

export { router };
