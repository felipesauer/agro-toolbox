import { useState } from 'react';
import Input from '../../ui/Input';
import ResultPanel from '../../ui/ResultPanel';
import ProgressBar from '../../ui/ProgressBar';
import { useCalculation } from '../../../hooks/useCalculation';

export default function TermometroLcdpr() {
  const [receitaBrutaTotal, setReceitaBrutaTotal] = useState('');
  const { data, loading, error, calculate } = useCalculation('/fiscal/termometro-lcdpr');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receitaBrutaTotal) {
      calculate({ receitaBrutaTotal: Number(receitaBrutaTotal) });
    }
  };

  const fmt = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Receita bruta total no ano (R$)" id="receitaBrutaTotal" value={receitaBrutaTotal} onChange={(e) => setReceitaBrutaTotal(e.target.value)} placeholder="Ex: 120000" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Calculando...' : 'Verificar Obrigatoriedade'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-3">
          <ProgressBar percentual={data?.percentual || 0} status={data?.status} />
          <p className="text-sm">Limite LCDPR: {fmt(data?.limite)}</p>
          <p className="text-sm">Sua receita: {fmt(data?.receitaTotal)} ({data?.percentual}% do limite)</p>
          <p className={`text-lg font-bold ${data?.obrigatorio ? 'text-red-600' : 'text-green-600'}`}>
            {data?.obrigatorio ? '⚠️ LCDPR obrigatório!' : '✅ LCDPR não obrigatório'}
          </p>
        </div>
      </ResultPanel>
    </form>
  );
}
