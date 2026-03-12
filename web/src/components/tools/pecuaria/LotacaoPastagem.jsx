import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function LotacaoPastagem() {
  const [numAnimais, setNumAnimais] = useState('');
  const [pesoMedio, setPesoMedio] = useState('');
  const [areaPastagem, setAreaPastagem] = useState('');
  const { data, loading, error, calculate } = useCalculation('/pecuaria/lotacao-pastagem');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numAnimais && pesoMedio && areaPastagem) {
      calculate({
        numAnimais: Number(numAnimais),
        pesoMedio: Number(pesoMedio),
        areaPastagem: Number(areaPastagem),
      });
    }
  };

  const corClassificacao = {
    Sublotação: 'text-blue-600',
    Adequada: 'text-green-600',
    'Lotação alta': 'text-orange-600',
    Superlotação: 'text-red-600',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Número de animais" id="numAnimais" value={numAnimais} onChange={(e) => setNumAnimais(e.target.value)} placeholder="Ex: 120" />
      <Input label="Peso médio por animal (kg)" id="pesoMedio" value={pesoMedio} onChange={(e) => setPesoMedio(e.target.value)} placeholder="Ex: 450" />
      <Input label="Área de pastagem (ha)" id="areaPastagem" value={areaPastagem} onChange={(e) => setAreaPastagem(e.target.value)} placeholder="Ex: 100" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Lotação'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">{data?.uaPorHa} UA/ha</p>
        <p className={`text-lg font-semibold mt-1 ${corClassificacao[data?.classificacao] || ''}`}>
          {data?.classificacao}
        </p>
        <p className="text-sm text-gray-600 mt-1">Total: {data?.totalUA} UA em {data?.areaPastagem} ha</p>
        <p className="text-sm text-gray-500 mt-2">Fórmula: {data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
