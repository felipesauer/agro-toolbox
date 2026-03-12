import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIAS } from '../../data/categorias';

export default function Navbar({ dark, setDark, onSearch }) {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Principal" className="bg-green-700 dark:bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span>🌾</span>
            <span>AgroToolbox</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {CATEGORIAS.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                className="text-green-100 hover:text-white transition-colors text-sm"
              >
                {cat.icone} {cat.nome}
              </Link>
            ))}
            <button
              type="button"
              onClick={onSearch}
              className="p-2 rounded-md hover:bg-green-600 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
              aria-label="Buscar ferramenta"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <kbd className="hidden lg:inline text-xs bg-green-600/50 dark:bg-gray-600 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-md hover:bg-green-600 dark:hover:bg-gray-700 transition-colors"
              aria-label={dark ? 'Modo claro' : 'Modo escuro'}
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-green-600">
          <div className="px-4 py-3 space-y-2">
            {CATEGORIAS.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="block text-green-100 hover:text-white hover:bg-green-600 rounded-md px-3 py-2 text-sm transition-colors"
              >
                {cat.icone} {cat.nome}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
