import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const DFE_TIPOS = [
  { value: 'nfe', label: 'NF-e (modelo 55)' },
  { value: 'nfce', label: 'NFC-e (modelo 65)' },
];

export default function ClassificacaoTributaria() {
  const [ncm, setNcm] = useState('');
  const [siglaDfe, setSiglaDfe] = useState('');
  const [cClassTrib, setCClassTrib] = useState('');
  const { data, loading, error, calculate } = useCalculation('/reforma/classificacao-tributaria');

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate({ ncm: ncm || undefined, siglaDfe: siglaDfe || undefined, cClassTrib: cClassTrib || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="NCM (opcional)" id="ncm" value={ncm} onChange={(e) => setNcm(e.target.value)} placeholder="Ex: 10011000" />
      <Select label="Tipo de DFe (opcional)" id="siglaDfe" options={DFE_TIPOS} value={siglaDfe} onChange={(e) => setSiglaDfe(e.target.value)} />
      <Input label="cClassTrib (opcional)" id="cClassTrib" value={cClassTrib} onChange={(e) => setCClassTrib(e.target.value)} placeholder="Ex: 01" />

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Consultando...' : 'Consultar Classificação'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-3">
          {data?.classificacao && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <h4 className="font-semibold text-blue-800 mb-1">Classificação Tributária</h4>
              <p className="text-sm">cClassTrib: <span className="font-mono font-bold">{data.classificacao.cClassTrib}</span></p>
              {data.classificacao.descricao && <p className="text-sm">{data.classificacao.descricao}</p>}
              <div className="grid grid-cols-3 gap-2 mt-2 text-center text-sm">
                <div className="bg-white rounded p-1">
                  <p className="text-xs text-gray-500">Redução CBS</p>
                  <p className="font-bold">{data.classificacao.percentualReducaoCbs}%</p>
                </div>
                <div className="bg-white rounded p-1">
                  <p className="text-xs text-gray-500">Redução IBS UF</p>
                  <p className="font-bold">{data.classificacao.percentualReducaoIbsUf}%</p>
                </div>
                <div className="bg-white rounded p-1">
                  <p className="text-xs text-gray-500">Redução IBS Mun</p>
                  <p className="font-bold">{data.classificacao.percentualReducaoIbsMun}%</p>
                </div>
              </div>
            </div>
          )}
          {data?.validacaoDfe && (
            <div className={`rounded p-3 ${data.validacaoDfe.valido ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
              <p className="text-sm font-medium">{data.validacaoDfe.valido ? '✅ DFe compatível' : '⚠️ ' + data.validacaoDfe.mensagem}</p>
            </div>
          )}
          {data?.fundamentacoesLegais?.length > 0 && (
            <div className="bg-gray-50 rounded p-3">
              <h4 className="font-semibold text-gray-700 mb-1">Fundamentações Legais</h4>
              <ul className="text-sm space-y-1">
                {data.fundamentacoesLegais.map((f, i) => (
                  <li key={i} className="text-gray-600">• {typeof f === 'string' ? f : f.texto || JSON.stringify(f)}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-gray-400">Fonte: {data?.fonteAliquotas}</p>
        </div>
      </ResultPanel>
    </form>
  );
}
