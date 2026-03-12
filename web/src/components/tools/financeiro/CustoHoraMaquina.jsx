import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function CustoHoraMaquina() {
  const [consumoCombustivel, setConsumoCombustivel] = useState('');
  const [precoCombustivel, setPrecoCombustivel] = useState('');
  const [custoManutencaoAnual, setCustoManutencaoAnual] = useState('');
  const [horasAnoUso, setHorasAnoUso] = useState('');
  const [valorMaquina, setValorMaquina] = useState('');
  const [vidaUtilAnos, setVidaUtilAnos] = useState('');
  const [custoOperador, setCustoOperador] = useState('');
  const [seguroAnual, setSeguroAnual] = useState('0');
  const { data, loading, error, calculate } = useCalculation('/financeiro/custo-hora-maquina');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consumoCombustivel && precoCombustivel && horasAnoUso && valorMaquina && vidaUtilAnos) {
      calculate({
        consumoCombustivel: Number(consumoCombustivel),
        precoCombustivel: Number(precoCombustivel),
        custoManutencaoAnual: Number(custoManutencaoAnual) || 0,
        horasAnoUso: Number(horasAnoUso),
        valorMaquina: Number(valorMaquina),
        vidaUtilAnos: Number(vidaUtilAnos),
        custoOperador: Number(custoOperador) || 0,
        seguroAnual: Number(seguroAnual) || 0,
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Consumo combustível (L/h)" id="consumoCombustivel" value={consumoCombustivel} onChange={(e) => setConsumoCombustivel(e.target.value)} placeholder="Ex: 12" />
      <Input label="Preço combustível (R$/L)" id="precoCombustivel" value={precoCombustivel} onChange={(e) => setPrecoCombustivel(e.target.value)} placeholder="Ex: 6.50" />
      <Input label="Valor da máquina (R$)" id="valorMaquina" value={valorMaquina} onChange={(e) => setValorMaquina(e.target.value)} placeholder="Ex: 350000" />
      <Input label="Vida útil (anos)" id="vidaUtilAnos" value={vidaUtilAnos} onChange={(e) => setVidaUtilAnos(e.target.value)} placeholder="Ex: 10" />
      <Input label="Horas de uso/ano" id="horasAnoUso" value={horasAnoUso} onChange={(e) => setHorasAnoUso(e.target.value)} placeholder="Ex: 1000" />
      <Input label="Custo manutenção anual (R$)" id="custoManutencaoAnual" value={custoManutencaoAnual} onChange={(e) => setCustoManutencaoAnual(e.target.value)} placeholder="Ex: 15000" />
      <Input label="Custo operador (R$/h)" id="custoOperador" value={custoOperador} onChange={(e) => setCustoOperador(e.target.value)} placeholder="Ex: 25" />
      <Input label="Seguro anual (R$) — opcional" id="seguroAnual" value={seguroAnual} onChange={(e) => setSeguroAnual(e.target.value)} placeholder="Ex: 5000" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Custo/Hora'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">{fmt(data?.custoHoraTotal)} /hora</p>
        <div className="mt-3 space-y-1 text-sm">
          <p>Combustível: {fmt(data?.detalhamento?.combustivel)}/h</p>
          <p>Depreciação: {fmt(data?.detalhamento?.depreciacao)}/h</p>
          <p>Manutenção: {fmt(data?.detalhamento?.manutencao)}/h</p>
          <p>Operador: {fmt(data?.detalhamento?.operador)}/h</p>
          <p>Seguro: {fmt(data?.detalhamento?.seguro)}/h</p>
        </div>
      </ResultPanel>
    </form>
  );
}
