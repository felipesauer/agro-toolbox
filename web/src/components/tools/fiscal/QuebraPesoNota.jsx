import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function QuebraPesoNota() {
  const [pesoNota, setPesoNota] = useState('');
  const [pesoReal, setPesoReal] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [aliquotaICMS, setAliquotaICMS] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/quebra-peso-nota');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pesoNota && pesoReal && valorUnitario && aliquotaICMS) {
      calculate({
        pesoNota: Number(pesoNota),
        pesoReal: Number(pesoReal),
        valorUnitario: Number(valorUnitario),
        aliquotaICMS: Number(aliquotaICMS),
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Peso da nota (kg)" id="pesoNota" value={pesoNota} onChange={(e) => setPesoNota(e.target.value)} placeholder="Ex: 30000" />
      <Input label="Peso real aferido (kg)" id="pesoReal" value={pesoReal} onChange={(e) => setPesoReal(e.target.value)} placeholder="Ex: 30500" />
      <Input label="Valor unitário (R$/kg)" id="valorUnitario" value={valorUnitario} onChange={(e) => setValorUnitario(e.target.value)} placeholder="Ex: 2.50" />
      <Input label="Alíquota ICMS (%)" id="aliquotaICMS" value={aliquotaICMS} onChange={(e) => setAliquotaICMS(e.target.value)} placeholder="Ex: 12" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Complemento'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-sm">Diferença de peso: <span className="font-semibold">{data?.diferenca?.toLocaleString('pt-BR')} kg</span></p>
          <p className="text-2xl font-bold text-green-800">Valor complementar: {fmt(data?.valorComplementar)}</p>
          <p className="text-sm text-gray-600">ICMS complementar ({data?.aliquotaICMS}%): {fmt(data?.icmsComplementar)}</p>
        </div>
      </ResultPanel>
    </form>
  );
}
