import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
      <Link to="/" className="text-green-600 hover:underline">
        Início
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="text-gray-400">/</span>
          {item.to ? (
            <Link to={item.to} className="text-green-600 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
