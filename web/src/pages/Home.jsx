import { Link } from 'react-router-dom';
import { CATEGORIAS, FERRAMENTAS } from '../data/categorias';
import ToolCard from '../components/Layout/ToolCard';

export default function Home() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌾 AgroToolbox</h1>
        <p className="text-gray-500">Ferramentas e calculadoras para o agronegócio brasileiro</p>
      </div>

      {CATEGORIAS.map((cat) => {
        const ferramentas = FERRAMENTAS.filter((f) => f.categoria === cat.slug);
        if (ferramentas.length === 0) return null;

        return (
          <section key={cat.slug} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-700">
                {cat.icone} {cat.nome}
              </h2>
              <Link
                to={`/categoria/${cat.slug}`}
                className="text-sm text-green-600 hover:text-green-800"
              >
                Ver todas →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ferramentas.map((f) => (
                <ToolCard key={f.slug} ferramenta={f} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
