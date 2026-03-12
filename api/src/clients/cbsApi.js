// CBS API Client — Dados Abertos (public GET endpoints, no auth required)
// Base: https://piloto-cbs.tributos.gov.br/servico/calculadora-consumo/api

const BASE_URL = 'https://piloto-cbs.tributos.gov.br/servico/calculadora-consumo/api/calculadora/dados-abertos';
const TIMEOUT_MS = 5000;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

// In-memory cache with TTL
const cache = new Map();

function cacheKey(path, params) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return `${path}${qs}`;
}

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

async function fetchCbs(path, params = {}) {
  const key = cacheKey(path, Object.keys(params).length ? params : null);
  const cached = getCached(key);
  if (cached) return cached;

  const url = new URL(`${BASE_URL}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  }

  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      const res = await fetch(url.toString(), {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timer);

      if (res.ok) {
        const data = await res.json();
        setCache(key, data);
        return data;
      }
      if (res.status >= 500 && attempt === 0) {
        lastError = new Error(`CBS API ${res.status}`);
        continue; // retry once on 5xx
      }
      throw new Error(`CBS API ${res.status}: ${res.statusText}`);
    } catch (err) {
      lastError = err;
      if (attempt === 0 && err.name !== 'AbortError') continue;
    }
  }
  throw lastError;
}

// Utility: today as YYYY-MM-DD
function hoje() {
  return new Date().toISOString().split('T')[0];
}

// --- Public API methods ---

export async function getAliquotaUniao(data) {
  return fetchCbs('/aliquota-uniao', { data: data || hoje() });
}

export async function getAliquotaUf(codigoUf, data) {
  return fetchCbs('/aliquota-uf', { codigoUf, data: data || hoje() });
}

export async function getAliquotaMunicipio(codigoMunicipio, data) {
  return fetchCbs('/aliquota-municipio', { codigoMunicipio, data: data || hoje() });
}

export async function getNcm(ncm, data) {
  return fetchCbs('/ncm', { ncm, data: data || hoje() });
}

export async function getClassificacoesTributarias(data) {
  return fetchCbs('/classificacoes-tributarias/cbs-ibs', { data: data || hoje() });
}

export async function getClassificacaoPorCst(idSituacaoTributaria, data) {
  return fetchCbs(`/classificacoes-tributarias/${encodeURIComponent(idSituacaoTributaria)}`, { data: data || hoje() });
}

export async function validarClassificacaoDfe(siglaDfe, cClassTrib, data) {
  return fetchCbs(`/classificacoes-tributarias/cbs-ibs/${encodeURIComponent(siglaDfe)}/${encodeURIComponent(cClassTrib)}`, { data: data || hoje() });
}

export async function getSituacoesTributariasCbsIbs(data) {
  return fetchCbs('/situacoes-tributarias/cbs-ibs', { data: data || hoje() });
}

export async function getSituacoesTributariasIs(data) {
  return fetchCbs('/situacoes-tributarias/imposto-seletivo', { data: data || hoje() });
}

export async function getFundamentacoesLegais(data) {
  return fetchCbs('/fundamentacoes-legais', { data: data || hoje() });
}

export async function getVersao() {
  return fetchCbs('/versao');
}

export async function getUfs() {
  return fetchCbs('/ufs');
}

export async function getMunicipios(siglaUf) {
  return fetchCbs('/ufs/municipios', { siglaUf });
}

// Graceful wrapper — returns null on failure (for fallback to local constants)
export async function fetchSafe(fn, ...args) {
  try {
    return await fn(...args);
  } catch {
    return null;
  }
}

export function clearCache() {
  cache.clear();
}
