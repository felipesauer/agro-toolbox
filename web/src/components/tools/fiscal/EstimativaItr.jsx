import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function EstimativaItr() {
  const [areaTotal, setAreaTotal] = useState('');
  const [areaUtilizada, setAreaUtilizada] = useState('');
  const [areaPreservacao, setAreaPreservacao] = useState('');
  const [vtn, setVtn] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/estimativa-itr');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (areaTotal && areaUtilizada && areaPreservacao && vtn) {
      calculate({
        areaTotal: Number(areaTotal),
        areaUtilizada: Number(areaUtilizada),
        areaPreservacao: Number(areaPreservacao),
        vtn: Number(vtn),
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Área total (ha)" id="areaTotal" value={areaTotal} onChange={(e) => setAreaTotal(e.target.value)} placeholder="Ex: 500" />
      <Input label="Área utilizada (ha)" id="areaUtilizada" value={areaUtilizada} onChange={(e) => setAreaUtilizada(e.target.value)} placeholder="Ex: 350" />
      <Input label="Área de preservação (ha)" id="areaPreservacao" value={areaPreservacao} onChange={(e) => setAreaPreservacao(e.target.value)} placeholder="Ex: 100" />
      <Input label="Valor da Terra Nua — VTN (R$)" id="vtn" value={vtn} onChange={(e) => setVtn(e.target.value)} placeholder="Ex: 5000000" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular ITR'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-green-800">ITR estimado: {fmt(data?.itrEstimado)}</p>
          <div className="text-sm mt-2 space-y-1">
            <p>Grau de utilização: <span className="font-semibold">{data?.grauUtilizacao}%</span></p>
            <p>Faixa de área: {data?.faixaArea}</p>
            <p>Faixa de GU: {data?.faixaGU}</p>
            <p>Alíquota: <span className="font-semibold">{data?.aliquota}%</span></p>
            <p>VTN tributável: {fmt(data?.vtnTributavel)}</p>
          </div>
          {data?.grauUtilizacao != null && (
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Utilizada', value: Number(areaUtilizada) || 0 },
                      { name: 'Preservação', value: Number(areaPreservacao) || 0 },
                      { name: 'Ociosa', value: Math.max(0, (Number(areaTotal) || 0) - (Number(areaUtilizada) || 0) - (Number(areaPreservacao) || 0)) },
                    ].filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#3b82f6" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Tooltip formatter={(v) => `${v} ha`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </ResultPanel>
    </form>
  );
}
