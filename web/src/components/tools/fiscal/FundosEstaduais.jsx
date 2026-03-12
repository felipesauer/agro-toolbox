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
  { value: 'BA', label: 'Bahia' },
  { value: 'PR', label: 'Paraná' },
];

const PRODUTOS = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'algodao', label: 'Algodão' },
  { value: 'gado', label: 'Gado' },
  { value: 'cafe', label: 'Café' },
];

export default function FundosEstaduais() {
  const [estado, setEstado] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorOperacao, setValorOperacao] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/fundos-estaduais');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (estado && produto && quantidade && valorOperacao) {
      calculate({
        estado,
        produto,
        quantidade: Number(quantidade),
        valorOperacao: Number(valorOperacao),
      });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="Estado" id="estado" options={ESTADOS} value={estado} onChange={(e) => setEstado(e.target.value)} />
      <Select label="Produto" id="produto" options={PRODUTOS} value={produto} onChange={(e) => setProduto(e.target.value)} />
      <Input label="Quantidade (ton ou cabeças)" id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Ex: 100" />
      <Input label="Valor da operação (R$)" id="valorOperacao" value={valorOperacao} onChange={(e) => setValorOperacao(e.target.value)} placeholder="Ex: 150000" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Calcular Fundo'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        {data?.mensagem && !data?.valorFundo ? (
          <p className="text-yellow-700">{data.mensagem}</p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Fundo: <span className="font-medium">{data?.fundo}</span></p>
            <p className="text-sm">Valor por {data?.unidade}: {fmt(data?.valorPorUnidade)}</p>
            <p className="text-2xl font-bold text-green-800">Total: {fmt(data?.valorFundo)}</p>
            <p className="text-sm text-gray-500">Equivale a {data?.percentualSobreOperacao}% da operação</p>
          </div>
        )}
      </ResultPanel>
    </form>
  );
}
