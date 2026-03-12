const BASE_URL = '/api/v1';

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.error || 'Erro de conexão com a API');
  }

  return body;
}

const client = {
  get: (url, params) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`${url}${qs}`);
  },
  post: (url, data) =>
    request(url, { method: 'POST', body: JSON.stringify(data) }),
};

export default client;
