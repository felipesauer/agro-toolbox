import { calcularQuebraFrete as quebraFreteService } from '../services/quebraFrete.js';
import { calcularCustoFrete as custoFreteService } from '../services/custoFrete.js';
import { calcularCapacidadeCarga as capacidadeCargaService } from '../services/capacidadeCarga.js';

export function calcularQuebraFrete(req, res) {
  const data = quebraFreteService(req.validated);
  res.json({ success: true, data });
}

export function calcularCustoFrete(req, res) {
  const data = custoFreteService(req.validated);
  res.json({ success: true, data });
}

export function calcularCapacidadeCarga(req, res) {
  const data = capacidadeCargaService(req.validated);
  res.json({ success: true, data });
}
