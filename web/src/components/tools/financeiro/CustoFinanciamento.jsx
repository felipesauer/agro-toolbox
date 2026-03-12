import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const SISTEMAS = [
  { value: 'SAC', label: 'SAC (parcelas decrescentes)' },
  { value: 'PRICE', label: 'PRICE (parcelas fixas)' },
];

export default function CustoFinanciamento() {
  const [valorFinanciamento, setValorFinanciamento] = useState('');
  const [taxaAnual, setTaxaAnual] = useState('');
  const [prazoMeses, setPrazoMeses] = useState('');
  const [carenciaMeses, setCarenciaMeses] = useState('0');
  const [sistemaAmortizacao, setSistemaAmortizacao] = useState('');
  const [tarifaBancaria, setTarifaBancaria] = useState('0');
  const { data, loading, error, calculate } = useCalculation('/financeiro/custo-financiamento');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valorFinanciamento && taxaAnual && prazoMeses && sistemaAmortizacao) {
      calculate({
        valorFinanciamento: Number(valorFinanciamento),
        taxaAnual: Number(taxaAnual),
        prazoMeses: Number(prazoMeses),
        carenciaMeses: Number(carenciaMeses),
        sistemaAmortizacao,
        tarifaBancaria: Number(tarifaBancaria),
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Valor do financiamento (R$)" id="valorFinanciamento" value={valorFinanciamento} onChange={(e) => setValorFinanciamento(e.target.value)} placeholder="Ex: 500000" />
      <Input label="Taxa de juros anual (%)" id="taxaAnual" value={taxaAnual} onChange={(e) => setTaxaAnual(e.target.value)} placeholder="Ex: 8" />
      <Input label="Prazo total (meses)" id="prazoMeses" value={prazoMeses} onChange={(e) => setPrazoMeses(e.target.value)} placeholder="Ex: 60" />
      <Input label="Carência (meses) — opcional" id="carenciaMeses" value={carenciaMeses} onChange={(e) => setCarenciaMeses(e.target.value)} placeholder="Ex: 6" />
      <Select label="Sistema de amortização" id="sistemaAmortizacao" options={SISTEMAS} value={sistemaAmortizacao} onChange={(e) => setSistemaAmortizacao(e.target.value)} />
      <Input label="Tarifa bancária (R$) — opcional" id="tarifaBancaria" value={tarifaBancaria} onChange={(e) => setTarifaBancaria(e.target.value)} placeholder="Ex: 500" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Simular Financiamento'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-sm">Sistema: <span className="font-semibold">{data?.sistemaAmortizacao}</span></p>
          <p className="text-sm">Taxa mensal: <span className="font-semibold">{data?.taxaMensal}%</span></p>
          <p className="text-sm">Total de juros: <span className="font-semibold text-red-600">{fmt(data?.totalJuros)}</span></p>
          <p className="text-sm">Custo efetivo: <span className="font-semibold text-red-600">{fmt(data?.custoEfetivo)}</span></p>
          <p className="text-2xl font-bold text-green-800 mt-2">Total pago: {fmt(data?.totalPago)}</p>

          {data?.parcelas?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Evolução do saldo devedor</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data.parcelas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => fmt(v)} />
                  <Area type="monotone" dataKey="saldoDevedor" stroke="#16a34a" fill="#bbf7d0" name="Saldo" />
                  <Area type="monotone" dataKey="juros" stroke="#dc2626" fill="#fecaca" name="Juros" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {data?.parcelas?.length > 0 && (
            <details className="mt-3">
              <summary className="text-sm text-green-700 cursor-pointer hover:underline">
                Ver tabela de parcelas ({data.parcelas.length} meses)
              </summary>
              <div className="mt-2 max-h-64 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-2 py-1 text-left">Mês</th>
                      <th className="px-2 py-1 text-right">Parcela</th>
                      <th className="px-2 py-1 text-right">Juros</th>
                      <th className="px-2 py-1 text-right">Amortização</th>
                      <th className="px-2 py-1 text-right">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.parcelas.map((p) => (
                      <tr key={p.mes} className="border-t">
                        <td className="px-2 py-1">{p.mes}</td>
                        <td className="px-2 py-1 text-right">{fmt(p.parcela)}</td>
                        <td className="px-2 py-1 text-right">{fmt(p.juros)}</td>
                        <td className="px-2 py-1 text-right">{fmt(p.amortizacao)}</td>
                        <td className="px-2 py-1 text-right">{fmt(p.saldoDevedor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          )}
        </div>
      </ResultPanel>
    </form>
  );
}
