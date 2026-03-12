import { simularCbsIbs as simularCbsIbsService } from '../services/simuladorCbsIbs.js';
import { consultarNcm as consultarNcmService } from '../services/consultorNcm.js';
import { calcularCreditoPresumido as creditoPresumidoService } from '../services/creditoPresumido.js';
import { consultarClassificacaoTributaria } from '../services/classificacaoTributaria.js';
import { validarXmlRtc as validarXmlRtcService } from '../services/validadorXmlRtc.js';
import { consultarSituacoesTributarias, consultarAliquotasUf } from '../services/consultaAliquotas.js';

export function simularCbsIbs(req, res) {
  const data = simularCbsIbsService(req.validated);
  res.json({ success: true, data });
}

export function consultarNcm(req, res) {
  const data = consultarNcmService(req.params.ncm);
  res.json({ success: true, data });
}

export function calcularCreditoPresumido(req, res) {
  const data = creditoPresumidoService(req.validated);
  res.json({ success: true, data });
}

export async function classificacaoTributaria(req, res) {
  try {
    const data = await consultarClassificacaoTributaria(req.validated);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function validarXmlRtc(req, res) {
  try {
    const data = await validarXmlRtcService(req.validated);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function situacoesTributarias(_req, res) {
  try {
    const data = await consultarSituacoesTributarias();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function aliquotasUf(req, res) {
  try {
    const data = await consultarAliquotasUf(req.params.uf);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
