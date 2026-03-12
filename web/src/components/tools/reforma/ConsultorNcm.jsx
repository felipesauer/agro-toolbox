import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function ConsultorNcm() {
  const [ncm, setNcm] = useState('');
  const { data, loading, error, calculate } = useCalculation('/reforma/consultor-ncm', { method: 'get' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ncm) {
      calculate(null, `/reforma/consultor-ncm/${encodeURIComponent(ncm)}`);
    }
  };

  const cestaCores = {
    zero: 'bg-green-100 text-green-800',
    reduzida: 'bg-yellow-100 text-yellow-800',
    normal: 'bg-red-100 text-red-800',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Código NCM" id="ncm" type="text" value={ncm} onChange={(e) => setNcm(e.target.value)} placeholder="Ex: 1201 (soja), 0901 (café)" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Consultando...' : 'Consultar NCM'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        {data?.encontrado ? (
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-800">NCM {data?.ncmBase}</p>
            <p className="text-sm text-gray-700">{data?.descricao}</p>
            <p className="text-sm text-gray-500">Capítulo: {data?.capitulo}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${cestaCores[data?.cestaTributaria] || ''}`}>
                {data?.cestaTributaria === 'zero' ? 'Alíquota Zero' : data?.cestaTributaria === 'reduzida' ? 'Redução 60%' : 'Alíquota Cheia'}
              </span>
              <span className="text-sm text-gray-600">Redução: {data?.reducaoAliquota}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{data?.observacao}</p>
          </div>
        ) : (
          <p className="text-yellow-700">{data?.mensagem}</p>
        )}
      </ResultPanel>
    </form>
  );
}
