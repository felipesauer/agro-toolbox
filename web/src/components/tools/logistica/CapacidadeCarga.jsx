import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function CapacidadeCarga() {
  const [pesoTotalKg, setPesoTotalKg] = useState('');
  const [capacidadeCaminhaoKg, setCapacidadeCaminhaoKg] = useState('37000');
  const [distanciaKm, setDistanciaKm] = useState('');
  const [velocidadeMedia, setVelocidadeMedia] = useState('60');
  const { data, loading, error, calculate } = useCalculation('/logistica/capacidade-carga');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pesoTotalKg) {
      calculate({
        pesoTotalKg: Number(pesoTotalKg),
        capacidadeCaminhaoKg: Number(capacidadeCaminhaoKg) || undefined,
        distanciaKm: distanciaKm ? Number(distanciaKm) : undefined,
        velocidadeMedia: Number(velocidadeMedia) || undefined,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Peso total da carga (kg)" id="pesoTotalKg" value={pesoTotalKg} onChange={(e) => setPesoTotalKg(e.target.value)} placeholder="Ex: 100000" />
      <Input label="Capacidade do caminhão (kg)" id="capacidadeCaminhaoKg" value={capacidadeCaminhaoKg} onChange={(e) => setCapacidadeCaminhaoKg(e.target.value)} placeholder="Ex: 37000" />
      <Input label="Distância (km) — opcional" id="distanciaKm" value={distanciaKm} onChange={(e) => setDistanciaKm(e.target.value)} placeholder="Ex: 300" />
      <Input label="Velocidade média (km/h) — opcional" id="velocidadeMedia" value={velocidadeMedia} onChange={(e) => setVelocidadeMedia(e.target.value)} placeholder="Ex: 60" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-green-800 dark:text-green-400">
            {data?.numeroViagens} {data?.numeroViagens === 1 ? 'viagem' : 'viagens'}
          </p>
          <div className="text-sm space-y-1">
            <p>Capacidade por caminhão: {data?.capacidadeCaminhaoKg?.toLocaleString('pt-BR')} kg</p>
            <p>Carga na última viagem: {data?.cargaUltimaViagem?.toLocaleString('pt-BR')} kg</p>
            <p>
              Aproveitamento última viagem:{' '}
              <span className={data?.aproveitamentoUltimaViagem < 50 ? 'text-amber-600 font-semibold' : 'font-semibold'}>
                {data?.aproveitamentoUltimaViagem}%
              </span>
            </p>
            {data?.tempoEstimadoTotal && (
              <p className="mt-2">
                ⏱ Tempo estimado total: <span className="font-semibold">{data?.tempoEstimadoTotal}h</span>
                <span className="text-xs text-gray-400 ml-1">({data?.distanciaKm}km × {data?.numeroViagens} viagens ida/volta a {data?.velocidadeMedia}km/h)</span>
              </p>
            )}
          </div>
        </div>
      </ResultPanel>
    </form>
  );
}
