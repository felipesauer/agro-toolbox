import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const CULTURAS = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'trigo', label: 'Trigo' },
  { value: 'cafe', label: 'Café' },
  { value: 'algodao', label: 'Algodão' },
  { value: 'arroz', label: 'Arroz' },
  { value: 'feijao', label: 'Feijão' },
  { value: 'sorgo', label: 'Sorgo' },
];

export default function QuebraUmidade() {
  const [pesoBruto, setPesoBruto] = useState('');
  const [umidadeRecebida, setUmidadeRecebida] = useState('');
  const [impurezaRecebida, setImpurezaRecebida] = useState('');
  const [cultura, setCultura] = useState('');
  const { data, loading, error, calculate } = useCalculation('/agronomica/quebra-umidade');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pesoBruto && umidadeRecebida && impurezaRecebida && cultura) {
      calculate({
        pesoBruto: Number(pesoBruto),
        umidadeRecebida: Number(umidadeRecebida),
        impurezaRecebida: Number(impurezaRecebida),
        cultura,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="Cultura" id="cultura" options={CULTURAS} value={cultura} onChange={(e) => setCultura(e.target.value)} />
      <Input label="Peso Bruto (kg)" id="pesoBruto" value={pesoBruto} onChange={(e) => setPesoBruto(e.target.value)} placeholder="Ex: 30000" />
      <Input label="Umidade Recebida (%)" id="umidadeRecebida" value={umidadeRecebida} onChange={(e) => setUmidadeRecebida(e.target.value)} placeholder="Ex: 18" />
      <Input label="Impureza Recebida (%)" id="impurezaRecebida" value={impurezaRecebida} onChange={(e) => setImpurezaRecebida(e.target.value)} placeholder="Ex: 2.5" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Quebra'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Cultura: <span className="font-medium">{data?.cultura}</span></p>
          <p className="text-sm text-gray-600">Umidade padrão: {data?.umidadePadrao}% | Impureza padrão: {data?.impurezaPadrao}%</p>
          <div className="border-t pt-2 mt-2">
            <p className="text-sm">Desconto umidade: <span className="font-semibold text-orange-600">{data?.descontoUmidade}%</span></p>
            <p className="text-sm">Desconto impureza: <span className="font-semibold text-orange-600">{data?.descontoImpureza}%</span></p>
            <p className="text-sm">Desconto total: <span className="font-semibold text-red-600">{data?.descontoTotal}%</span></p>
          </div>
          <p className="text-2xl font-bold text-green-800 mt-2">
            Peso líquido: {data?.pesoLiquido?.toLocaleString('pt-BR')} kg
          </p>
        </div>
      </ResultPanel>
    </form>
  );
}
