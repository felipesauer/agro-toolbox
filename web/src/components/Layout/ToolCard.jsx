import { Link } from 'react-router-dom';

export default function ToolCard({ ferramenta }) {
  return (
    <Link
      to={`/ferramenta/${ferramenta.slug}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-green-300 transition-all"
    >
      <h3 className="font-semibold text-gray-800 mb-1">{ferramenta.nome}</h3>
      <p className="text-sm text-gray-500">{ferramenta.descricao}</p>
      <span className="inline-block mt-3 text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
        {ferramenta.categoria}
      </span>
    </Link>
  );
}
