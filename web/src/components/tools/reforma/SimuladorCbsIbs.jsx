import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const TIPOS = [
  { value: 'venda', label: 'Venda' },
  { value: 'compra', label: 'Compra' },
];

const UFS = [
  { value: 'MT', label: 'MT' }, { value: 'GO', label: 'GO' }, { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' }, { value: 'SP', label: 'SP' }, { value: 'PR', label: 'PR' },
  { value: 'BA', label: 'BA' }, { value: 'RS', label: 'RS' }, { value: 'SC', label: 'SC' },
  { value: 'MA', label: 'MA' }, { value: 'TO', label: 'TO' }, { value: 'PI', label: 'PI' },
];

export default function SimuladorCbsIbs() {
  const [ncm, setNcm] = useState('');
  const [valorOperacao, setValorOperacao] = useState('');
  const [tipo, setTipo] = useState('');
  const [uf, setUf] = useState('');
  const [creditosEntrada, setCreditosEntrada] = useState('0');
  const { data, loading, error, calculate } = useCalculation('/reforma/simulador-cbs-ibs');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ncm && valorOperacao && tipo && uf) {
      calculate({
        ncm,
        valorOperacao: Number(valorOperacao),
        tipo,
        uf,
        creditosEntrada: Number(creditosEntrada),
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="NCM do produto" id="ncm" type="text" value={ncm} onChange={(e) => setNcm(e.target.value)} placeholder="Ex: 1201 (soja)" />
      <Input label="Valor da operação (R$)" id="valorOperacao" value={valorOperacao} onChange={(e) => setValorOperacao(e.target.value)} placeholder="Ex: 100000" />
      <Select label="Tipo" id="tipo" options={TIPOS} value={tipo} onChange={(e) => setTipo(e.target.value)} />
      <Select label="UF" id="uf" options={UFS} value={uf} onChange={(e) => setUf(e.target.value)} />
      <Input label="Créditos de entrada (R$) — opcional" id="creditosEntrada" value={creditosEntrada} onChange={(e) => setCreditosEntrada(e.target.value)} placeholder="Ex: 5000" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Simulando...' : 'Simular CBS/IBS'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Redução: <span className="font-medium">{data?.reducao}</span></p>
          <div className="grid grid-cols-3 gap-2 text-center mt-2">
            <div className="bg-blue-50 rounded p-2">
              <p className="text-xs text-gray-500">CBS</p>
              <p className="font-bold text-blue-700">{data?.aliquotas?.cbs}%</p>
              <p className="text-sm">{fmt(data?.valores?.cbs)}</p>
            </div>
            <div className="bg-purple-50 rounded p-2">
              <p className="text-xs text-gray-500">IBS</p>
              <p className="font-bold text-purple-700">{data?.aliquotas?.ibs}%</p>
              <p className="text-sm">{fmt(data?.valores?.ibs)}</p>
            </div>
            <div className="bg-green-50 rounded p-2">
              <p className="text-xs text-gray-500">Total Líquido</p>
              <p className="font-bold text-green-700">{data?.aliquotas?.total}%</p>
              <p className="text-sm">{fmt(data?.valores?.totalLiquido)}</p>
            </div>
          </div>
          {data?.valores?.cbs > 0 && (
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'CBS', value: data.valores.cbs },
                      { name: 'IBS', value: data.valores.ibs },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#8b5cf6" />
                  </Pie>
                  <Tooltip formatter={(v) => fmt(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          {data?.valores?.creditosEntrada > 0 && (
            <p className="text-sm text-gray-500">Créditos utilizados: {fmt(data?.valores?.creditosEntrada)}</p>
          )}
          <p className="text-xs text-yellow-600 mt-2">{data?.aviso}</p>
        </div>
      </ResultPanel>
    </form>
  );
}
