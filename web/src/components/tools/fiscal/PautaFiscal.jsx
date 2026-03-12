import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const ESTADOS = [
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PR', label: 'Paraná' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'BA', label: 'Bahia' },
];

const PRODUTOS = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'algodao', label: 'Algodão' },
  { value: 'cafe', label: 'Café' },
  { value: 'arroz', label: 'Arroz' },
  { value: 'trigo', label: 'Trigo' },
  { value: 'sorgo', label: 'Sorgo' },
  { value: 'gado', label: 'Gado' },
];

export default function PautaFiscal() {
  const [estado, setEstado] = useState('');
  const [produto, setProduto] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/pauta-fiscal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (estado && produto && precoVenda && quantidade) {
      calculate({
        estado,
        produto,
        precoVenda: Number(precoVenda),
        quantidade: Number(quantidade),
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="Estado" id="estado" options={ESTADOS} value={estado} onChange={(e) => setEstado(e.target.value)} />
      <Select label="Produto" id="produto" options={PRODUTOS} value={produto} onChange={(e) => setProduto(e.target.value)} />
      <Input label="Preço de venda (R$/ton)" id="precoVenda" value={precoVenda} onChange={(e) => setPrecoVenda(e.target.value)} placeholder="Ex: 1300" />
      <Input label="Quantidade (ton)" id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Ex: 100" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Verificar Pauta'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-2">
          {data?.usouPauta ? (
            <p className="text-lg font-semibold text-orange-600">⚠️ Pauta fiscal aplicada</p>
          ) : (
            <p className="text-lg font-semibold text-green-600">✅ Preço de venda acima da pauta</p>
          )}
          <p className="text-sm">{data?.mensagem}</p>
          {data?.valorPauta > 0 && <p className="text-sm">Valor da pauta: {fmt(data?.valorPauta)}/ton (vigência: {data?.vigenciaPauta})</p>}
          <p className="text-2xl font-bold text-green-800">Base de cálculo: {fmt(data?.baseCalculo)}</p>
          {data?.diferencaPauta > 0 && (
            <p className="text-sm text-orange-600">Diferença pela pauta: +{fmt(data?.diferencaPauta)}</p>
          )}
        </div>
      </ResultPanel>
    </form>
  );
}
