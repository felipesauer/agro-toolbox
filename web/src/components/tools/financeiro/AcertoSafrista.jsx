import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

export default function AcertoSafrista() {
  const [salarioMensal, setSalarioMensal] = useState('');
  const [mesesTrabalhados, setMesesTrabalhados] = useState('');
  const [horasExtras, setHorasExtras] = useState('0');
  const [adicionalNoturno, setAdicionalNoturno] = useState(false);
  const { data, loading, error, calculate } = useCalculation('/financeiro/acerto-safrista');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (salarioMensal && mesesTrabalhados) {
      calculate({
        salarioMensal: Number(salarioMensal),
        mesesTrabalhados: Number(mesesTrabalhados),
        horasExtras: Number(horasExtras),
        adicionalNoturno,
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Salário mensal (R$)" id="salarioMensal" value={salarioMensal} onChange={(e) => setSalarioMensal(e.target.value)} placeholder="Ex: 2500" />
      <Input label="Meses trabalhados" id="mesesTrabalhados" value={mesesTrabalhados} onChange={(e) => setMesesTrabalhados(e.target.value)} placeholder="Ex: 6" />
      <Input label="Total horas extras (h) — opcional" id="horasExtras" value={horasExtras} onChange={(e) => setHorasExtras(e.target.value)} placeholder="Ex: 40" />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="adicionalNoturno"
          checked={adicionalNoturno}
          onChange={(e) => setAdicionalNoturno(e.target.checked)}
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <label htmlFor="adicionalNoturno" className="text-sm text-gray-700">Adicional noturno</label>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Acerto'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <p className="text-2xl font-bold text-green-800">Total: {fmt(data?.totalAcerto)}</p>
        <div className="mt-3 space-y-1 text-sm">
          <p>Salário bruto ({data?.mesesTrabalhados} meses): {fmt(data?.salarioBruto)}</p>
          <p>Férias proporcionais: {fmt(data?.feriasProporcionais)}</p>
          <p>1/3 de férias: {fmt(data?.tercoFerias)}</p>
          <p>13º proporcional: {fmt(data?.decimoTerceiro)}</p>
          {data?.horasExtrasValor > 0 && <p>Horas extras: {fmt(data?.horasExtrasValor)}</p>}
          {data?.adicionalNoturno > 0 && <p>Adicional noturno: {fmt(data?.adicionalNoturno)}</p>}
          <div className="border-t pt-2 mt-2">
            <p className="text-gray-500">FGTS depositado: {fmt(data?.fgts)}</p>
            <p className="text-gray-500">INSS empregado (ref.): {fmt(data?.inssEmpregado)}</p>
          </div>
        </div>
      </ResultPanel>
    </form>
  );
}
