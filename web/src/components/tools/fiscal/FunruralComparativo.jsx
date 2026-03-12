import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import ComparisonCard from '../../ui/ComparisonCard';
import { useCalculation } from '../../../hooks/useCalculation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function FunruralComparativo() {
  const [receitaBrutaAnual, setReceitaBrutaAnual] = useState('');
  const [folhaPagamentoMensal, setFolhaPagamentoMensal] = useState('');
  const [numEmpregados, setNumEmpregados] = useState('');
  const [rat, setRat] = useState('2');
  const { data, loading, error, calculate } = useCalculation('/fiscal/funrural-comparativo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receitaBrutaAnual && folhaPagamentoMensal && numEmpregados) {
      calculate({
        receitaBrutaAnual: Number(receitaBrutaAnual),
        folhaPagamentoMensal: Number(folhaPagamentoMensal),
        numEmpregados: Number(numEmpregados),
        rat: Number(rat) / 100,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Receita bruta anual (R$)" id="receitaBrutaAnual" value={receitaBrutaAnual} onChange={(e) => setReceitaBrutaAnual(e.target.value)} placeholder="Ex: 2000000" />
      <Input label="Folha de pagamento mensal (R$)" id="folhaPagamentoMensal" value={folhaPagamentoMensal} onChange={(e) => setFolhaPagamentoMensal(e.target.value)} placeholder="Ex: 25000" />
      <Input label="Número de empregados" id="numEmpregados" value={numEmpregados} onChange={(e) => setNumEmpregados(e.target.value)} placeholder="Ex: 10" />
      <Input label="RAT (%)" id="rat" value={rat} onChange={(e) => setRat(e.target.value)} placeholder="Ex: 2" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Comparar Modalidades'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <ComparisonCard
            titulo="Sobre Comercialização"
            valor={data?.custoComercializacao}
            recomendado={data?.recomendacao?.includes('comercialização')}
          />
          <ComparisonCard
            titulo="Sobre Folha"
            valor={data?.custoFolha}
            recomendado={data?.recomendacao?.includes('folha')}
          />
        </div>
        <p className="text-sm font-semibold text-green-700">{data?.recomendacao}</p>
        <p className="text-sm text-gray-500">Economia anual: {data?.economiaAnual?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        {data?.custoComercializacao != null && (
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={[
                { name: 'Comercialização', valor: data.custoComercializacao },
                { name: 'Folha', valor: data.custoFolha },
              ]} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                <Tooltip formatter={(v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                  <Cell fill={data.recomendacao?.includes('comercialização') ? '#16a34a' : '#94a3b8'} />
                  <Cell fill={data.recomendacao?.includes('folha') ? '#16a34a' : '#94a3b8'} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </ResultPanel>
    </form>
  );
}
