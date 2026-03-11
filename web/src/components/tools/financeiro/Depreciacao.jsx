import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function Depreciacao() {
  const [valorAquisicao, setValorAquisicao] = useState('');
  const [valorResidual, setValorResidual] = useState('0');
  const [vidaUtilAnos, setVidaUtilAnos] = useState('');
  const [anosUso, setAnosUso] = useState('');
  const { data, loading, error, calculate } = useCalculation('/financeiro/depreciacao');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      valorAquisicao: Number(valorAquisicao),
      valorResidual: Number(valorResidual),
      vidaUtilAnos: Number(vidaUtilAnos),
    };
    if (anosUso) payload.anosUso = Number(anosUso);
    calculate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Valor de Aquisição (R$)" id="aquisicao" value={valorAquisicao} onChange={(e) => setValorAquisicao(e.target.value)} placeholder="Ex: 500000" />
      <Input label="Valor Residual (R$)" id="residual" value={valorResidual} onChange={(e) => setValorResidual(e.target.value)} />
      <Input label="Vida Útil (anos)" id="vida" value={vidaUtilAnos} onChange={(e) => setVidaUtilAnos(e.target.value)} placeholder="Ex: 10" />
      <Input label="Anos de Uso (opcional)" id="uso" value={anosUso} onChange={(e) => setAnosUso(e.target.value)} placeholder="Ex: 5" />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ResultPanel visible={!!data}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Depreciação Anual</p>
            <p className="text-xl font-bold text-green-800">
              {data?.depreciacaoAnual?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Depreciação Mensal</p>
            <p className="text-xl font-bold text-green-800">
              {data?.depreciacaoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Acumulada</p>
            <p className="text-lg font-semibold text-gray-700">
              {data?.acumulada?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Valor Atual</p>
            <p className="text-lg font-semibold text-gray-700">
              {data?.valorAtual?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-3">{data?.formula}</p>
      </ResultPanel>
    </form>
  );
}
