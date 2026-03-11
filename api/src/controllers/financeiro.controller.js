import { calcularDepreciacao as depreciacaoService } from '../services/depreciacao.js';
import { calcularCustoHoraMaquina as custoHoraMaquinaService } from '../services/custoHoraMaquina.js';
import { calcularVenderVsArmazenar as venderVsArmazenarService } from '../services/venderVsArmazenar.js';
import { calcularCustoFinanciamento as custoFinanciamentoService } from '../services/custoFinanciamento.js';
import { calcularAcertoSafrista as acertoSafristaService } from '../services/acertoSafrista.js';

export function calcularDepreciacao(req, res) {
  const data = depreciacaoService(req.validated);
  res.json({ success: true, data });
}

export function calcularCustoHoraMaquina(req, res) {
  const data = custoHoraMaquinaService(req.validated);
  res.json({ success: true, data });
}

export function calcularVenderVsArmazenar(req, res) {
  const data = venderVsArmazenarService(req.validated);
  res.json({ success: true, data });
}

export function calcularCustoFinanciamento(req, res) {
  const data = custoFinanciamentoService(req.validated);
  res.json({ success: true, data });
}

export function calcularAcertoSafrista(req, res) {
  const data = acertoSafristaService(req.validated);
  res.json({ success: true, data });
}
