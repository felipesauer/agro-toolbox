import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const TIPOS = [
  { value: 'PF', label: 'Pessoa Física' },
  { value: 'PJ', label: 'Pessoa Jurídica' },
];

export default function RetencaoFunrural() {
  const [valorBruto, setValorBruto] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('');
  const [optanteFolha, setOptanteFolha] = useState(false);
  const { data, loading, error, calculate } = useCalculation('/fiscal/retencao-funrural');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valorBruto && tipoPessoa) {
      calculate({ valorBruto: Number(valorBruto), tipoPessoa, optanteFolha });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Valor bruto da operação (R$)" id="valorBruto" value={valorBruto} onChange={(e) => setValorBruto(e.target.value)} placeholder="Ex: 100000" />
      <Select label="Tipo de pessoa" id="tipoPessoa" options={TIPOS} value={tipoPessoa} onChange={(e) => setTipoPessoa(e.target.value)} />
      <div className="flex items-center gap-2">
        <input type="checkbox" id="optanteFolha" checked={optanteFolha} onChange={(e) => setOptanteFolha(e.target.checked)} className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
        <label htmlFor="optanteFolha" className="text-sm text-gray-700">Optante por recolhimento sobre folha</label>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Retenção'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        {data?.optanteFolha ? (
          <p className="text-green-700 font-semibold">{data?.mensagem}</p>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl font-bold text-red-600">Retenção: {fmt(data?.totalRetido)}</p>
            <p className="text-lg text-green-800">Valor líquido: {fmt(data?.valorLiquido)}</p>
            <div className="text-sm mt-2 space-y-1">
              <p>Funrural ({data?.detalhamento?.funrural}): {fmt(data?.funrural)}</p>
              <p>RAT ({data?.detalhamento?.rat}): {fmt(data?.rat)}</p>
              <p>Senar ({data?.detalhamento?.senar}): {fmt(data?.senar)}</p>
            </div>
          </div>
        )}
      </ResultPanel>
    </form>
  );
}
