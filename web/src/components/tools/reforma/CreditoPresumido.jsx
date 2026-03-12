import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const TIPOS = [
  { value: 'produtor_rural_pf', label: 'Produtor Rural PF' },
  { value: 'agricultor_familiar', label: 'Agricultor Familiar' },
  { value: 'cooperativa', label: 'Cooperativa' },
];

export default function CreditoPresumido() {
  const [receitaBruta, setReceitaBruta] = useState('');
  const [custos, setCustos] = useState('');
  const [tipo, setTipo] = useState('');
  const [ncmPrincipal, setNcmPrincipal] = useState('');
  const { data, loading, error, calculate } = useCalculation('/reforma/credito-presumido');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receitaBruta && custos && tipo) {
      calculate({
        receitaBruta: Number(receitaBruta),
        custos: Number(custos),
        tipo,
        ncmPrincipal: ncmPrincipal || undefined,
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Receita bruta (R$)" id="receitaBruta" value={receitaBruta} onChange={(e) => setReceitaBruta(e.target.value)} placeholder="Ex: 500000" />
      <Input label="Custos (R$)" id="custos" value={custos} onChange={(e) => setCustos(e.target.value)} placeholder="Ex: 300000" />
      <Select label="Tipo de produtor" id="tipo" options={TIPOS} value={tipo} onChange={(e) => setTipo(e.target.value)} />
      <Input label="NCM principal (opcional)" id="ncmPrincipal" type="text" value={ncmPrincipal} onChange={(e) => setNcmPrincipal(e.target.value)} placeholder="Ex: 1201" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Crédito'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-green-800">Crédito: {fmt(data?.creditoPresumido)}</p>
          <p className="text-sm text-gray-600">Percentual de crédito: {data?.percentualCredito}%</p>
          <div className="text-sm mt-2 space-y-1">
            <p>Margem operacional: {fmt(data?.margemOperacional)}</p>
            <p>Carga tributária estimada (26,5%): {fmt(data?.cargaTributariaEstimada)}</p>
            <p className="font-semibold text-green-700">Economia com crédito: {fmt(data?.economiaCredito)}</p>
            <p>Carga líquida: {fmt(data?.cargaLiquida)}</p>
          </div>
          <p className="text-xs text-yellow-600 mt-2">{data?.aviso}</p>
        </div>
      </ResultPanel>
    </form>
  );
}
