import { converterUnidadesNfe as converterUnidadesNfeService } from '../services/conversorUnidadesNfe.js';
import { calcularRetencaoFunrural as retencaoFunruralService } from '../services/retencaoFunrural.js';
import { calcularQuebraPesoNota as quebraPesoNotaService } from '../services/quebraPesoNota.js';
import { calcularFunruralComparativo as funruralComparativoService } from '../services/funruralComparativo.js';
import { calcularIrpfRural as irpfRuralService } from '../services/irpfRural.js';
import { calcularEstimativaItr as estimativaItrService } from '../services/estimativaItr.js';
import { calcularTermometroLcdpr as termometroLcdprService } from '../services/termometroLcdpr.js';
import { calcularFundosEstaduais as fundosEstaduaisService } from '../services/fundosEstaduais.js';
import { consultarCfop as assistenteCfopService } from '../services/assistenteCfop.js';
import { calcularPautaFiscal as pautaFiscalService } from '../services/pautaFiscal.js';

export function converterUnidadesNfe(req, res) {
  const data = converterUnidadesNfeService(req.validated);
  res.json({ success: true, data });
}

export function calcularRetencaoFunrural(req, res) {
  const data = retencaoFunruralService(req.validated);
  res.json({ success: true, data });
}

export function calcularQuebraPesoNota(req, res) {
  const data = quebraPesoNotaService(req.validated);
  res.json({ success: true, data });
}

export function calcularFunruralComparativo(req, res) {
  const data = funruralComparativoService(req.validated);
  res.json({ success: true, data });
}

export function calcularIrpfRural(req, res) {
  const data = irpfRuralService(req.validated);
  res.json({ success: true, data });
}

export function calcularEstimativaItr(req, res) {
  const data = estimativaItrService(req.validated);
  res.json({ success: true, data });
}

export function calcularTermometroLcdpr(req, res) {
  const data = termometroLcdprService(req.validated);
  res.json({ success: true, data });
}

export function calcularFundosEstaduais(req, res) {
  const data = fundosEstaduaisService(req.validated);
  res.json({ success: true, data });
}

export function consultarCfop(req, res) {
  const data = assistenteCfopService(req.validated);
  res.json({ success: true, data });
}

export function calcularPautaFiscal(req, res) {
  const data = pautaFiscalService(req.validated);
  res.json({ success: true, data });
}
