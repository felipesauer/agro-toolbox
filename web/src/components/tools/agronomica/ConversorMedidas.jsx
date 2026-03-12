import { useState, useMemo } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useAutoCalculation } from '../../../hooks/useAutoCalculation';

const UNIDADES = [
  { value: 'hectare', label: 'Hectare (ha)' },
  { value: 'alqueire_sp', label: 'Alqueire Paulista' },
  { value: 'alqueire_mg', label: 'Alqueire Mineiro/Goiano' },
  { value: 'alqueire_nordeste', label: 'Alqueire do Nordeste' },
  { value: 'tarefa_ba', label: 'Tarefa Baiana' },
  { value: 'tarefa_se', label: 'Tarefa Sergipana' },
  { value: 'braca_quadrada', label: 'Braça Quadrada' },
  { value: 'metro_quadrado', label: 'Metro Quadrado (m²)' },
  { value: 'quilometro_quadrado', label: 'Quilômetro Quadrado (km²)' },
  { value: 'acre', label: 'Acre' },
];

export default function ConversorMedidas() {
  const [valor, setValor] = useState('');
  const [de, setDe] = useState('');
  const [para, setPara] = useState('');
  const inputs = useMemo(() => ({ valor: Number(valor), de, para }), [valor, de, para]);
  const { data, loading, error, calculate } = useAutoCalculation('/agronomica/conversor-medidas', inputs, {
    isReady: (v) => v.valor && v.de && v.para,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valor && de && para) calculate(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Valor" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ex: 100" />
      <Select label="De" id="de" options={UNIDADES} value={de} onChange={(e) => setDe(e.target.value)} />
      <Select label="Para" id="para" options={UNIDADES} value={para} onChange={(e) => setPara(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Converter'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">
          {data?.resultado?.toLocaleString('pt-BR')} {data?.unidadeDestino}
        </p>
        <p className="text-sm text-gray-500 mt-2">Fórmula: {data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
