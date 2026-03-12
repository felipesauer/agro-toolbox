import { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIAS, FERRAMENTAS } from '../data/categorias';
import toolComponents from '../components/tools/registry';
import Breadcrumb from '../components/Layout/Breadcrumb';

export default function ToolPage() {
  const { slug } = useParams();
  const ferramenta = FERRAMENTAS.find((f) => f.slug === slug);

  if (!ferramenta) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Ferramenta não encontrada</p>
        <Link to="/" className="text-green-600 hover:underline mt-2 inline-block">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const ToolComponent = toolComponents[slug];
  const categoria = CATEGORIAS.find((c) => c.slug === ferramenta.categoria);

  return (
    <div className="max-w-2xl mx-auto">
      <Breadcrumb
        items={[
          { label: categoria ? `${categoria.icone} ${categoria.nome}` : ferramenta.categoria, to: `/categoria/${ferramenta.categoria}` },
          { label: ferramenta.nome },
        ]}
      />
      <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-1">{ferramenta.nome}</h1>
      <p className="text-gray-500 mb-6">{ferramenta.descricao}</p>

      {ToolComponent ? (
        <Suspense fallback={<div className="text-center py-8 text-gray-400">Carregando...</div>}>
          <ToolComponent ferramenta={ferramenta} />
        </Suspense>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700">🚧 Ferramenta em desenvolvimento</p>
        </div>
      )}
    </div>
  );
}
