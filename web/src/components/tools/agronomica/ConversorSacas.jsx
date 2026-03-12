import { useState, useMemo } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useAutoCalculation } from '../../../hooks/useAutoCalculation';

const UNIDADES = [
  { value: 'sacas', label: 'Sacas' },
  { value: 'kg', label: 'Quilogramas (kg)' },
  { value: 'toneladas', label: 'Toneladas (t)' },
];

const CULTURAS = [
  { value: 'soja', label: 'Soja (60kg)' },
  { value: 'milho', label: 'Milho (60kg)' },
  { value: 'trigo', label: 'Trigo (60kg)' },
  { value: 'cafe', label: 'Café (60kg)' },
  { value: 'algodao', label: 'Algodão (20,42kg)' },
  { value: 'arroz', label: 'Arroz (60kg)' },
  { value: 'feijao', label: 'Feijão (60kg)' },
  { value: 'sorgo', label: 'Sorgo (60kg)' },
];

export default function ConversorSacas() {
  const [valor, setValor] = useState('');
  const [de, setDe] = useState('');
  const [para, setPara] = useState('');
  const [cultura, setCultura] = useState('');
  const inputs = useMemo(() => ({ valor: Number(valor), de, para, cultura }), [valor, de, para, cultura]);
  const { data, loading, error, calculate } = useAutoCalculation('/agronomica/conversor-sacas', inputs, {
    isReady: (v) => v.valor && v.de && v.para && v.cultura,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valor && de && para && cultura) calculate(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="Cultura" id="cultura" options={CULTURAS} value={cultura} onChange={(e) => setCultura(e.target.value)} />
      <Input label="Valor" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ex: 60" />
      <Select label="De" id="de" options={UNIDADES} value={de} onChange={(e) => setDe(e.target.value)} />
      <Select label="Para" id="para" options={UNIDADES} value={para} onChange={(e) => setPara(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Converter'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">
          {data?.resultado?.toLocaleString('pt-BR')} {data?.para}
        </p>
        <p className="text-sm text-gray-500 mt-1">Cultura: {data?.cultura} (saca de {data?.pesoSaca}kg)</p>
        <p className="text-sm text-gray-500">{data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
