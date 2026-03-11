import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const UNIDADES_DE = [
  { value: 'kg', label: 'Quilograma (kg)' },
  { value: 'ton', label: 'Tonelada (t)' },
  { value: 'saca', label: 'Saca' },
  { value: 'arroba', label: 'Arroba (@)' },
  { value: 'litro', label: 'Litro (L)' },
  { value: 'unidade', label: 'Unidade (un)' },
];

const CULTURAS = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'trigo', label: 'Trigo' },
  { value: 'cafe', label: 'Café' },
  { value: 'algodao', label: 'Algodão' },
  { value: 'arroz', label: 'Arroz' },
  { value: 'feijao', label: 'Feijão' },
  { value: 'sorgo', label: 'Sorgo' },
];

export default function ConversorUnidadesNfe() {
  const [valor, setValor] = useState('');
  const [de, setDe] = useState('');
  const [para, setPara] = useState('');
  const [cultura, setCultura] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/conversor-unidades-nfe');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { valor: Number(valor), de, para };
    if (cultura) payload.cultura = cultura;
    calculate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Valor" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ex: 1000" />
      <Select label="De" id="de" options={UNIDADES_DE} value={de} onChange={(e) => setDe(e.target.value)} />
      <Select label="Para" id="para" options={UNIDADES_DE} value={para} onChange={(e) => setPara(e.target.value)} />
      <Select label="Cultura (quando necessário)" id="cultura" options={[{ value: '', label: 'Nenhuma' }, ...CULTURAS]} value={cultura} onChange={(e) => setCultura(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Converter'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">
          {data?.resultado?.toLocaleString('pt-BR')} {data?.unidadeDestino}
        </p>
        <p className="text-sm text-gray-500 mt-2">{data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
