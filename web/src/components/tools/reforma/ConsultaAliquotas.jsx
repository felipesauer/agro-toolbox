import { useState } from 'react';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const UF_OPTIONS = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA',
  'PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO',
].map((uf) => ({ value: uf, label: uf }));

const fmt = (v) => typeof v === 'number' ? v.toFixed(2) + '%' : v;

export default function ConsultaAliquotas() {
  const [uf, setUf] = useState('');
  const { data, loading, error, calculate } = useCalculation(`/reforma/aliquotas/${uf}`, { method: 'get' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uf) calculate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="UF" id="uf" options={UF_OPTIONS} value={uf} onChange={(e) => setUf(e.target.value)} />

      <button type="submit" disabled={loading || !uf} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Consultando...' : 'Consultar Alíquotas'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">{data?.uf} — Alíquotas CBS/IBS</h4>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-600 mb-1">CBS (União)</p>
              <p className="text-xl font-bold text-blue-800">{fmt(data?.cbs)}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-600 mb-1">IBS (Estado)</p>
              <p className="text-xl font-bold text-green-800">{fmt(data?.ibsUf)}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-purple-600 mb-1">IBS (Município)</p>
              <p className="text-xl font-bold text-purple-800">{fmt(data?.ibsMunicipio)}</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Total CBS + IBS</p>
            <p className="text-2xl font-bold text-gray-900">{fmt(data?.total)}</p>
          </div>

          {data?.anoReferencia && (
            <p className="text-xs text-gray-500 text-center">
              Ano: {data.anoReferencia} | Fase: {data.faseTransicao || 'teste'} | Fonte: {data.fonte}
            </p>
          )}
        </div>
      </ResultPanel>
    </form>
  );
}
