import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function NecessidadeSementes() {
  const [populacaoDesejada, setPopulacaoDesejada] = useState('');
  const [pms, setPms] = useState('');
  const [germinacao, setGerminacao] = useState('');
  const [pureza, setPureza] = useState('100');
  const { data, loading, error, calculate } = useCalculation('/agronomica/necessidade-sementes');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (populacaoDesejada && pms && germinacao) {
      calculate({
        populacaoDesejada: Number(populacaoDesejada),
        pms: Number(pms),
        germinacao: Number(germinacao),
        pureza: Number(pureza),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="População desejada (plantas/ha)" id="populacaoDesejada" value={populacaoDesejada} onChange={(e) => setPopulacaoDesejada(e.target.value)} placeholder="Ex: 300000" />
      <Input label="Peso de mil sementes — PMS (g)" id="pms" value={pms} onChange={(e) => setPms(e.target.value)} placeholder="Ex: 180" />
      <Input label="Germinação (%)" id="germinacao" value={germinacao} onChange={(e) => setGerminacao(e.target.value)} placeholder="Ex: 85" />
      <Input label="Pureza (%) — opcional" id="pureza" value={pureza} onChange={(e) => setPureza(e.target.value)} placeholder="Ex: 98" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Necessidade'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">{data?.kgPorHa} kg/ha</p>
        <p className="text-sm text-gray-500 mt-1">≈ {data?.sementesPorMetro} sementes/metro linear</p>
        <p className="text-sm text-gray-500 mt-2">Fórmula: {data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
