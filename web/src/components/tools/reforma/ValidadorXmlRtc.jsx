import { useState } from 'react';
import Select from '../../ui/Select';
import ResultPanel from '../../ui/ResultPanel';
import { useCalculation } from '../../../hooks/useCalculation';

const DFE_TIPOS = [
  { value: '', label: 'Selecione (opcional)' },
  { value: 'nfe', label: 'NF-e (modelo 55)' },
  { value: 'nfce', label: 'NFC-e (modelo 65)' },
  { value: 'cte', label: 'CT-e (modelo 57)' },
];

export default function ValidadorXmlRtc() {
  const [xml, setXml] = useState('');
  const [tipoDfe, setTipoDfe] = useState('');
  const { data, loading, error, calculate } = useCalculation('/reforma/validador-xml-rtc');

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate({ xml, tipoDfe: tipoDfe || undefined });
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setXml(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload XML</label>
        <input type="file" accept=".xml" onChange={handleFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
      </div>

      <div>
        <label htmlFor="xml" className="block text-sm font-medium text-gray-700 mb-1">Ou cole o XML</label>
        <textarea id="xml" rows={8} value={xml} onChange={(e) => setXml(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 font-mono text-xs" placeholder="<?xml version='1.0'?>..." />
      </div>

      <Select label="Tipo de DFe" id="tipoDfe" options={DFE_TIPOS} value={tipoDfe} onChange={(e) => setTipoDfe(e.target.value)} />

      <button type="submit" disabled={loading || !xml} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors">
        {loading ? 'Validando...' : 'Validar XML'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ResultPanel visible={!!data}>
        <div className="space-y-3">
          {data?.tipoDfe && <p className="text-sm text-gray-600">Tipo: <span className="font-semibold">{data.tipoDfe}</span></p>}

          {data?.erros?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <h4 className="font-semibold text-red-700 mb-1">Erros ({data.erros.length})</h4>
              <ul className="text-sm space-y-1">
                {data.erros.map((e, i) => <li key={i} className="text-red-600">❌ {e.campo || ''}: {e.mensagem}</li>)}
              </ul>
            </div>
          )}

          {data?.avisos?.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <h4 className="font-semibold text-yellow-700 mb-1">Avisos ({data.avisos.length})</h4>
              <ul className="text-sm space-y-1">
                {data.avisos.map((a, i) => <li key={i} className="text-yellow-700">⚠️ {a.campo || ''}: {a.mensagem}</li>)}
              </ul>
            </div>
          )}

          {data?.erros?.length === 0 && data?.avisos?.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-green-700 font-semibold">✅ XML válido — campos RTC OK</p>
            </div>
          )}

          {data?.valoresExtraidos && Object.keys(data.valoresExtraidos).length > 0 && (
            <div className="bg-gray-50 rounded p-3">
              <h4 className="font-semibold text-gray-700 mb-1">Valores Extraídos</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(data.valoresExtraidos).map(([k, v]) => (
                  <div key={k} className="bg-white rounded p-1 px-2">
                    <span className="text-gray-500">{k}:</span> <span className="font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ResultPanel>
    </form>
  );
}
