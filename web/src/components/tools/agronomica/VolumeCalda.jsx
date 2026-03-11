import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function VolumeCalda() {
  const [vazaoBico, setVazaoBico] = useState('');
  const [numBicos, setNumBicos] = useState('');
  const [espacamentoBicos, setEspacamentoBicos] = useState('50');
  const [velocidade, setVelocidade] = useState('');
  const { data, loading, error, calculate } = useCalculation('/agronomica/volume-calda');

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate({
      vazaoBico: Number(vazaoBico),
      numBicos: Number(numBicos),
      espacamentoBicos: Number(espacamentoBicos),
      velocidade: Number(velocidade),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Vazão do Bico (L/min)" id="vazao" value={vazaoBico} onChange={(e) => setVazaoBico(e.target.value)} placeholder="Ex: 0.8" />
      <Input label="Número de Bicos" id="bicos" value={numBicos} onChange={(e) => setNumBicos(e.target.value)} placeholder="Ex: 24" />
      <Input label="Espaçamento entre Bicos (cm)" id="espac" value={espacamentoBicos} onChange={(e) => setEspacamentoBicos(e.target.value)} />
      <Input label="Velocidade (km/h)" id="vel" value={velocidade} onChange={(e) => setVelocidade(e.target.value)} placeholder="Ex: 7" />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">{data?.volumeHa} L/ha</p>
        <p className="text-sm text-gray-500 mt-2">{data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
