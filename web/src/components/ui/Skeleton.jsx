export default function Skeleton({ className = '', lines = 3 }) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`} role="status" aria-label="Carregando">
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
