import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function Calagem() {
  const [ctc, setCtc] = useState('');
  const [saturacaoAtual, setSaturacaoAtual] = useState('');
  const [saturacaoDesejada, setSaturacaoDesejada] = useState('60');
  const [prnt, setPrnt] = useState('80');
  const { data, loading, error, calculate } = useCalculation('/agronomica/calagem');

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate({
      ctc: Number(ctc),
      saturacaoAtual: Number(saturacaoAtual),
      saturacaoDesejada: Number(saturacaoDesejada),
      prnt: Number(prnt),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="CTC (cmolc/dm³)" id="ctc" value={ctc} onChange={(e) => setCtc(e.target.value)} placeholder="Ex: 10" />
      <Input label="Saturação Atual V1 (%)" id="v1" value={saturacaoAtual} onChange={(e) => setSaturacaoAtual(e.target.value)} placeholder="Ex: 30" />
      <Input label="Saturação Desejada V2 (%)" id="v2" value={saturacaoDesejada} onChange={(e) => setSaturacaoDesejada(e.target.value)} />
      <Input label="PRNT do Calcário (%)" id="prnt" value={prnt} onChange={(e) => setPrnt(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">{data?.necessidadeCalcario} t/ha</p>
        <p className="text-sm text-gray-500 mt-2">Fórmula: {data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
