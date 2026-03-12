import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const CARGAS = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'trigo', label: 'Trigo' },
  { value: 'arroz', label: 'Arroz' },
  { value: 'algodao', label: 'Algodão' },
  { value: 'fertilizante', label: 'Fertilizante' },
  { value: 'calcario', label: 'Calcário' },
];

export default function QuebraFrete() {
  const [pesoOrigem, setPesoOrigem] = useState('');
  const [pesoDestino, setPesoDestino] = useState('');
  const [tolerancia, setTolerancia] = useState('0.25');
  const [tipoCarga, setTipoCarga] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const { data, loading, error, calculate } = useCalculation('/logistica/quebra-frete');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pesoOrigem && pesoDestino && tipoCarga) {
      calculate({
        pesoOrigem: Number(pesoOrigem),
        pesoDestino: Number(pesoDestino),
        tolerancia: Number(tolerancia),
        tipoCarga,
        precoUnitario: precoUnitario ? Number(precoUnitario) : undefined,
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Peso na origem (kg)" id="pesoOrigem" value={pesoOrigem} onChange={(e) => setPesoOrigem(e.target.value)} placeholder="Ex: 30000" />
      <Input label="Peso no destino (kg)" id="pesoDestino" value={pesoDestino} onChange={(e) => setPesoDestino(e.target.value)} placeholder="Ex: 29900" />
      <Select label="Tipo de carga" id="tipoCarga" options={CARGAS} value={tipoCarga} onChange={(e) => setTipoCarga(e.target.value)} />
      <Input label="Tolerância (%)" id="tolerancia" value={tolerancia} onChange={(e) => setTolerancia(e.target.value)} placeholder="Ex: 0.25" />
      <Input label="Preço unitário (R$/kg) — opcional" id="precoUnitario" value={precoUnitario} onChange={(e) => setPrecoUnitario(e.target.value)} placeholder="Ex: 2.50" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Quebra'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className={`text-lg font-semibold ${data?.dentroTolerancia ? 'text-green-600' : 'text-red-600'}`}>
            {data?.dentroTolerancia ? '✅ Dentro da tolerância' : '⚠️ Fora da tolerância'}
          </p>
          <div className="text-sm space-y-1">
            <p>Quebra real: {data?.quebraReal?.toLocaleString('pt-BR')} kg ({data?.quebraPercentual}%)</p>
            <p>Tolerância: {data?.tolerancia}%</p>
            <p>Peso mínimo esperado: {data?.pesoMinimoEsperado?.toLocaleString('pt-BR')} kg</p>
            {data?.quebraExcedente > 0 && (
              <p className="text-red-600">Excedente: {data?.quebraExcedente?.toLocaleString('pt-BR')} kg</p>
            )}
            {data?.valorPrejuizo && (
              <p className="text-red-600 font-semibold">Prejuízo: {fmt(data?.valorPrejuizo)}</p>
            )}
          </div>
        </div>
      </ResultPanel>
    </form>
  );
}
