import { Link } from 'react-router-dom';
import { CATEGORIAS } from '../../data/categorias';

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span>🌾</span>
            <span>AgroToolbox</span>
          </Link>
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
          </div>
        </div>
      </div>
    </nav>
  );
}
