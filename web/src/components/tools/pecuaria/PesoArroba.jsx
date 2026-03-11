import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function PesoArroba() {
  const [pesoVivo, setPesoVivo] = useState('');
  const [rendimento, setRendimento] = useState('50');
  const { data, loading, error, calculate } = useCalculation('/pecuaria/peso-arroba');

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate({ pesoVivo: Number(pesoVivo), rendimentoCarcaca: Number(rendimento) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Peso Vivo (kg)" id="peso" value={pesoVivo} onChange={(e) => setPesoVivo(e.target.value)} placeholder="Ex: 450" />
      <Input label="Rendimento de Carcaça (%)" id="rend" value={rendimento} onChange={(e) => setRendimento(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calcular...' : 'Calcular'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">{data?.arrobas} arrobas (@)</p>
        <p className="text-sm text-gray-500 mt-1">Peso carcaça: {data?.pesoCarcaca} kg</p>
        <p className="text-sm text-gray-500">{data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
