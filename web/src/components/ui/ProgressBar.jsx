export default function ProgressBar({ percentual = 0, status = 'tranquilo' }) {
  const cores = {
    tranquilo: 'bg-green-500',
    atencao: 'bg-yellow-500',
    alerta: 'bg-orange-500',
    obrigatorio: 'bg-red-500',
  };

  const cor = cores[status] || 'bg-gray-400';
  const largura = Math.min(percentual, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400">{percentual.toFixed(1)}%</span>
        <span className="capitalize font-medium">{status}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-500 ${cor}`}
          style={{ width: `${largura}%` }}
        />
      </div>
    </div>
  );
}
