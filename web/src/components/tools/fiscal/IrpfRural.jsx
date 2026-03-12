import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import ComparisonCard from '../../ui/ComparisonCard';
import { useCalculation } from '../../../hooks/useCalculation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function IrpfRural() {
  const [receitaBruta, setReceitaBruta] = useState('');
  const [despesasDedutiveis, setDespesasDedutiveis] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/irpf-rural');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receitaBruta && despesasDedutiveis) {
      calculate({
        receitaBruta: Number(receitaBruta),
        despesasDedutiveis: Number(despesasDedutiveis),
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Receita bruta anual (R$)" id="receitaBruta" value={receitaBruta} onChange={(e) => setReceitaBruta(e.target.value)} placeholder="Ex: 800000" />
      <Input label="Despesas dedutíveis (R$)" id="despesasDedutiveis" value={despesasDedutiveis} onChange={(e) => setDespesasDedutiveis(e.target.value)} placeholder="Ex: 600000" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Comparar IRPF'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <ComparisonCard
            titulo="Resultado Real"
            valor={data?.irpfReal}
            recomendado={data?.melhorOpcao === 'Resultado Real'}
          />
          <ComparisonCard
            titulo="Resultado Presumido (20%)"
            valor={data?.irpfPresumido}
            recomendado={data?.melhorOpcao === 'Resultado Presumido'}
          />
        </div>
        <p className="text-sm font-semibold text-green-700">Melhor opção: {data?.melhorOpcao}</p>
        <p className="text-sm text-gray-500">Economia: {fmt(data?.economia)}</p>
        {data?.irpfReal != null && (
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={[
                { name: 'Real', valor: data.irpfReal },
                { name: 'Presumido', valor: data.irpfPresumido },
              ]} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => fmt(v)} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                <Tooltip formatter={(v) => fmt(v)} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                  <Cell fill={data.melhorOpcao === 'Resultado Real' ? '#16a34a' : '#94a3b8'} />
                  <Cell fill={data.melhorOpcao === 'Resultado Presumido' ? '#16a34a' : '#94a3b8'} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="text-xs text-gray-400 mt-2">
          <p>Base real: {fmt(data?.baseReal)} | Base presumida: {fmt(data?.basePresumida)}</p>
        </div>
      </ResultPanel>
    </form>
  );
}
