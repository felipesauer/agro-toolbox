import { useState } from 'react';
import Select from '../../ui/Select';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const TIPOS = [
  { value: 'entrada', label: 'Entrada' },
  { value: 'saida', label: 'Saída' },
];

const DESTINOS = [
  { value: 'mesmo_estado', label: 'Mesmo estado' },
  { value: 'outro_estado', label: 'Outro estado' },
  { value: 'exterior', label: 'Exterior' },
];

export default function AssistenteCfop() {
  const [tipo, setTipo] = useState('');
  const [destino, setDestino] = useState('');
  const [operacao, setOperacao] = useState('');
  const [produto, setProduto] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/assistente-cfop');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipo && destino && operacao) {
      calculate({ tipo, destino, operacao, produto: produto || undefined });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="Tipo de operação" id="tipo" options={TIPOS} value={tipo} onChange={(e) => setTipo(e.target.value)} />
      <Select label="Destino" id="destino" options={DESTINOS} value={destino} onChange={(e) => setDestino(e.target.value)} />
      <Input label="Operação" id="operacao" type="text" value={operacao} onChange={(e) => setOperacao(e.target.value)} placeholder="Ex: venda, compra, devolução, remessa..." />
      <Input label="Produto (opcional)" id="produto" type="text" value={produto} onChange={(e) => setProduto(e.target.value)} placeholder="Ex: soja, milho..." />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Consultando...' : 'Consultar CFOP'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        {data?.cfop ? (
          <div className="space-y-2">
            <p className="text-3xl font-bold text-green-800">{data.cfop}</p>
            <p className="text-sm text-gray-700">{data.descricao}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-yellow-700">{data?.mensagem}</p>
            {data?.sugestoes?.length > 0 && (
              <div className="text-sm text-gray-500">
                <p>Operações disponíveis:</p>
                <ul className="list-disc list-inside mt-1">
                  {data.sugestoes.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </ResultPanel>
    </form>
  );
}
