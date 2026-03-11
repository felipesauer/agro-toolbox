import { calcularQuebraFrete as quebraFreteService } from '../services/quebraFrete.js';

export function calcularQuebraFrete(req, res) {
  const data = quebraFreteService(req.validated);
  res.json({ success: true, data });
}
