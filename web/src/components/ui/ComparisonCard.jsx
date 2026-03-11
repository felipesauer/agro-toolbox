export default function ComparisonCard({ titulo, valor, destaque = false, recomendado = false }) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        recomendado
          ? 'border-green-400 bg-green-50 ring-2 ring-green-200'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-700">{titulo}</h4>
        {recomendado && (
          <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
            Recomendado
          </span>
        )}
      </div>
      <p className={`text-2xl font-bold ${destaque ? 'text-green-700' : 'text-gray-800'}`}>
        {typeof valor === 'number'
          ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          : valor}
      </p>
    </div>
  );
}
