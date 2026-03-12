import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FERRAMENTAS } from '../../data/categorias';

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose((v) => !v);
      }
      if (e.key === 'Escape') onClose(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const filtered = query.trim()
    ? FERRAMENTAS.filter((f) => {
        const q = query.toLowerCase();
        return f.nome.toLowerCase().includes(q) || f.descricao.toLowerCase().includes(q) || f.categoria.includes(q);
      })
    : FERRAMENTAS.slice(0, 8);

  const handleSelect = (f) => {
    onClose(false);
    navigate(`/ferramenta/${f.slug}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => onClose(false)}>
      <div className="fixed inset-0 bg-black/50" />
      <div
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Buscar ferramenta"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar ferramenta..."
            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400"
          />
          <kbd className="hidden sm:inline text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Esc</kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-gray-400 text-sm">Nenhuma ferramenta encontrada</li>
          )}
          {filtered.map((f) => (
            <li key={f.slug}>
              <button
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                onClick={() => handleSelect(f)}
              >
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{f.nome}</p>
                <p className="text-xs text-gray-400">{f.descricao}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
