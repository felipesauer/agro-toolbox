import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function CustoFrete() {
  const [distanciaKm, setDistanciaKm] = useState('');
  const [valorFretePorKm, setValorFretePorKm] = useState('');
  const [pesoTotalKg, setPesoTotalKg] = useState('');
  const [pedagios, setPedagios] = useState('0');
  const [custoSeguro, setCustoSeguro] = useState('0');
  const { data, loading, error, calculate } = useCalculation('/logistica/custo-frete');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (distanciaKm && valorFretePorKm && pesoTotalKg) {
      calculate({
        distanciaKm: Number(distanciaKm),
        valorFretePorKm: Number(valorFretePorKm),
        pesoTotalKg: Number(pesoTotalKg),
        pedagios: Number(pedagios) || undefined,
        custoSeguro: Number(custoSeguro) || undefined,
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Distância (km)" id="distanciaKm" value={distanciaKm} onChange={(e) => setDistanciaKm(e.target.value)} placeholder="Ex: 500" />
      <Input label="Valor do frete (R$/km)" id="valorFretePorKm" value={valorFretePorKm} onChange={(e) => setValorFretePorKm(e.target.value)} placeholder="Ex: 5.00" />
      <Input label="Peso total da carga (kg)" id="pesoTotalKg" value={pesoTotalKg} onChange={(e) => setPesoTotalKg(e.target.value)} placeholder="Ex: 30000" />
      <Input label="Pedágios (R$) — opcional" id="pedagios" value={pedagios} onChange={(e) => setPedagios(e.target.value)} placeholder="Ex: 200" />
      <Input label="Custo do seguro (R$) — opcional" id="custoSeguro" value={custoSeguro} onChange={(e) => setCustoSeguro(e.target.value)} placeholder="Ex: 150" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Custo'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-green-800 dark:text-green-400">Custo total: {fmt(data?.custoTotal)}</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Por tonelada</p>
              <p className="font-bold text-blue-700 dark:text-blue-400">{fmt(data?.custoPorTonelada)}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Por saca (60kg)</p>
              <p className="font-bold text-purple-700 dark:text-purple-400">{fmt(data?.custoPorSaca60kg)}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-1">
            <p>Frete: {fmt(data?.composicao?.frete)}</p>
            {data?.composicao?.pedagios > 0 && <p>Pedágios: {fmt(data?.composicao?.pedagios)}</p>}
            {data?.composicao?.seguro > 0 && <p>Seguro: {fmt(data?.composicao?.seguro)}</p>}
          </div>
        </div>
      </ResultPanel>
    </form>
  );
}
