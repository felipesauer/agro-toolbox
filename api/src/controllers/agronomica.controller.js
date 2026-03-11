import { converterMedidas } from '../services/conversorMedidas.js';
import { converterSacas } from '../services/conversorSacas.js';
import { calcularQuebraUmidade as quebraUmidadeService } from '../services/quebraUmidade.js';
import { calcularCicloCultura as cicloCulturaService } from '../services/cicloCultura.js';
import { calcularNecessidadeSementes as necessidadeSementesService } from '../services/necessidadeSementes.js';
import { calcularEstimativaProdutividade as estimativaProdutividadeService } from '../services/estimativaProdutividade.js';
import { calcularVolumeCalda as volumeCaldaService } from '../services/volumeCalda.js';
import { calcularCalagem as calagemService } from '../services/calagem.js';

export function converterMedidasCtrl(req, res) {
  const data = converterMedidas(req.validated);
  res.json({ success: true, data });
}
export { converterMedidasCtrl as converterMedidas };

export function converterSacasCtrl(req, res) {
  const data = converterSacas(req.validated);
  res.json({ success: true, data });
}
export { converterSacasCtrl as converterSacas };

export function calcularQuebraUmidade(req, res) {
  const data = quebraUmidadeService(req.validated);
  res.json({ success: true, data });
}

export function calcularCicloCultura(req, res) {
  const data = cicloCulturaService(req.validated);
  res.json({ success: true, data });
}

export function calcularNecessidadeSementes(req, res) {
  const data = necessidadeSementesService(req.validated);
  res.json({ success: true, data });
}

export function calcularEstimativaProdutividade(req, res) {
  const data = estimativaProdutividadeService(req.validated);
  res.json({ success: true, data });
}

export function calcularVolumeCalda(req, res) {
  const data = volumeCaldaService(req.validated);
  res.json({ success: true, data });
}

export function calcularCalagem(req, res) {
  const data = calagemService(req.validated);
  res.json({ success: true, data });
}
