export default function ResultPanel({ title = 'Resultado', children, visible = true }) {
  if (!visible) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-4">
      <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
        📊 {title}
      </h3>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}
