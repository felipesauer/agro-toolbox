import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import ComparisonCard from '../../ui/ComparisonCard';
import { useCalculation } from '../../../hooks/useCalculation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function VenderVsArmazenar() {
  const [quantidade, setQuantidade] = useState('');
  const [precoAtual, setPrecoAtual] = useState('');
  const [precoFuturo, setPrecoFuturo] = useState('');
  const [mesesArmazenagem, setMesesArmazenagem] = useState('');
  const [custoArmazenagemMes, setCustoArmazenagemMes] = useState('');
  const [taxaOportunidade, setTaxaOportunidade] = useState('0');
  const [quebraTecnica, setQuebraTecnica] = useState('0');
  const { data, loading, error, calculate } = useCalculation('/financeiro/vender-vs-armazenar');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantidade && precoAtual && precoFuturo && mesesArmazenagem && custoArmazenagemMes) {
      calculate({
        quantidade: Number(quantidade),
        precoAtual: Number(precoAtual),
        precoFuturo: Number(precoFuturo),
        mesesArmazenagem: Number(mesesArmazenagem),
        custoArmazenagemMes: Number(custoArmazenagemMes),
        taxaOportunidade: Number(taxaOportunidade),
        quebraTecnica: Number(quebraTecnica),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Quantidade (sacas ou ton)" id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Ex: 1000" />
      <Input label="Preço atual (R$/unidade)" id="precoAtual" value={precoAtual} onChange={(e) => setPrecoAtual(e.target.value)} placeholder="Ex: 120" />
      <Input label="Preço futuro esperado (R$/unidade)" id="precoFuturo" value={precoFuturo} onChange={(e) => setPrecoFuturo(e.target.value)} placeholder="Ex: 135" />
      <Input label="Meses de armazenagem" id="mesesArmazenagem" value={mesesArmazenagem} onChange={(e) => setMesesArmazenagem(e.target.value)} placeholder="Ex: 4" />
      <Input label="Custo armazenagem (R$/mês)" id="custoArmazenagemMes" value={custoArmazenagemMes} onChange={(e) => setCustoArmazenagemMes(e.target.value)} placeholder="Ex: 1500" />
      <Input label="Taxa de oportunidade (% a.a.) — opcional" id="taxaOportunidade" value={taxaOportunidade} onChange={(e) => setTaxaOportunidade(e.target.value)} placeholder="Ex: 12" />
      <Input label="Quebra técnica (%) — opcional" id="quebraTecnica" value={quebraTecnica} onChange={(e) => setQuebraTecnica(e.target.value)} placeholder="Ex: 0.5" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Comparar'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <ComparisonCard
            titulo="Vender Agora"
            valor={data?.receitaVendaImediata}
            recomendado={data?.recomendacao?.includes('Vender')}
          />
          <ComparisonCard
            titulo="Armazenar e Vender"
            valor={data?.lucroLiquidoArmazenagem}
            recomendado={data?.recomendacao?.includes('Armazenar')}
          />
        </div>
        <p className="text-sm font-semibold text-green-700">Recomendação: {data?.recomendacao}</p>
        <p className="text-sm text-gray-500 mt-1">Diferença líquida: {data?.diferencaLiquida?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        {data?.receitaVendaImediata != null && (
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={[
                { name: 'Vender Agora', valor: data.receitaVendaImediata },
                { name: 'Armazenar', valor: data.lucroLiquidoArmazenagem },
              ]} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                <Tooltip formatter={(v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                  <Cell fill={data.recomendacao?.includes('Vender') ? '#16a34a' : '#94a3b8'} />
                  <Cell fill={data.recomendacao?.includes('Armazenar') ? '#16a34a' : '#94a3b8'} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </ResultPanel>
    </form>
  );
}
