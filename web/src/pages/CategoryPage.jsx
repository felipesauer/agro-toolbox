import { useParams, Link } from 'react-router-dom';
import { CATEGORIAS, FERRAMENTAS } from '../data/categorias';
import ToolCard from '../components/Layout/ToolCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const categoria = CATEGORIAS.find((c) => c.slug === slug);
  const ferramentas = FERRAMENTAS.filter((f) => f.categoria === slug);

  if (!categoria) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Categoria não encontrada</p>
        <Link to="/" className="text-green-600 hover:underline mt-2 inline-block">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link to="/" className="text-sm text-green-600 hover:underline">
          ← Voltar
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          {categoria.icone} {categoria.nome}
        </h1>
        <p className="text-gray-500">{categoria.descricao}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ferramentas.map((f) => (
          <ToolCard key={f.slug} ferramenta={f} />
        ))}
      </div>
    </div>
  );
}
