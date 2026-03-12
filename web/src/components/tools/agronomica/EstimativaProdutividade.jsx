import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function EstimativaProdutividade() {
  const [plantasPorM2, setPlantasPorM2] = useState('');
  const [estruturasPorPlanta, setEstruturasPorPlanta] = useState('');
  const [graosPorEstrutura, setGraosPorEstrutura] = useState('');
  const [pms, setPms] = useState('');
  const { data, loading, error, calculate } = useCalculation('/agronomica/estimativa-produtividade');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (plantasPorM2 && estruturasPorPlanta && graosPorEstrutura && pms) {
      calculate({
        plantasPorM2: Number(plantasPorM2),
        estruturasPorPlanta: Number(estruturasPorPlanta),
        graosPorEstrutura: Number(graosPorEstrutura),
        pms: Number(pms),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Plantas por m²" id="plantasPorM2" value={plantasPorM2} onChange={(e) => setPlantasPorM2(e.target.value)} placeholder="Ex: 30" />
      <Input label="Estruturas por planta (vagens, espigas)" id="estruturasPorPlanta" value={estruturasPorPlanta} onChange={(e) => setEstruturasPorPlanta(e.target.value)} placeholder="Ex: 40" />
      <Input label="Grãos por estrutura" id="graosPorEstrutura" value={graosPorEstrutura} onChange={(e) => setGraosPorEstrutura(e.target.value)} placeholder="Ex: 2.5" />
      <Input label="Peso de mil sementes — PMS (g)" id="pms" value={pms} onChange={(e) => setPms(e.target.value)} placeholder="Ex: 180" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Estimar Produtividade'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">{data?.sacasPorHa} sc/ha</p>
        <p className="text-sm text-gray-600 mt-1">{data?.kgPorHa?.toLocaleString('pt-BR')} kg/ha</p>
        <p className="text-sm text-gray-500 mt-2">Fórmula: {data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
