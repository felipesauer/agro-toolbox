import { calcularPesoArroba as pesoArrobaService } from '../services/pesoArroba.js';
import { calcularLotacaoPastagem as lotacaoPastagemService } from '../services/lotacaoPastagem.js';

export function calcularPesoArroba(req, res) {
  const data = pesoArrobaService(req.validated);
  res.json({ success: true, data });
}

export function calcularLotacaoPastagem(req, res) {
  const data = lotacaoPastagemService(req.validated);
  res.json({ success: true, data });
}
