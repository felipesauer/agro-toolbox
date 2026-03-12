import { Link } from 'react-router-dom';

export default function ToolCard({ ferramenta }) {
  return (
    <Link
      to={`/ferramenta/${ferramenta.slug}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all"
    >
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{ferramenta.nome}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{ferramenta.descricao}</p>
      <span className="inline-block mt-3 text-xs bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded">
        {ferramenta.categoria}
      </span>
    </Link>
  );
}
