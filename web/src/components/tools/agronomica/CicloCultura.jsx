import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const CULTURAS = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'trigo', label: 'Trigo' },
  { value: 'cafe', label: 'Café' },
  { value: 'arroz', label: 'Arroz' },
  { value: 'feijao', label: 'Feijão' },
];

export default function CicloCultura() {
  const [cultura, setCultura] = useState('');
  const [variedade, setVariedade] = useState('');
  const [dataPlantio, setDataPlantio] = useState('');
  const { data, loading, error, calculate } = useCalculation('/agronomica/ciclo-cultura');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { cultura, dataPlantio };
    if (variedade) payload.variedade = variedade;
    calculate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="Cultura" id="cultura" options={CULTURAS} value={cultura} onChange={(e) => setCultura(e.target.value)} />
      <Input label="Variedade (opcional)" id="variedade" type="text" value={variedade} onChange={(e) => setVariedade(e.target.value)} placeholder="Ex: precoce, medio, tardio" />
      <Input label="Data de Plantio" id="plantio" type="date" value={dataPlantio} onChange={(e) => setDataPlantio(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <p className="text-lg text-gray-700">
          Cultura: <strong>{data?.cultura}</strong> ({data?.variedade}) — Ciclo de <strong>{data?.cicloDias} dias</strong>
        </p>
        <p className="text-2xl font-bold text-green-800 mt-2">
          Colheita estimada: {data?.dataEstimadaColheita && new Date(data.dataEstimadaColheita + 'T12:00:00').toLocaleDateString('pt-BR')}
        </p>
        <p className="text-sm text-gray-500 mt-1">{data?.diasRestantes} dias restantes</p>
      </ResultPanel>
    </form>
  );
}
