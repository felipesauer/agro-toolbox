export default function ResultPanel({ title = 'Resultado', children, visible = true }) {
  if (!visible) return null;

  return (
    <div role="region" aria-label={title} className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-5 mt-4">
      <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
        📊 {title}
      </h3>
      <div className="text-gray-800 dark:text-gray-200">{children}</div>
    </div>
  );
}
