import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIAS, FERRAMENTAS } from '../data/categorias';
import ToolCard from '../components/Layout/ToolCard';

const stats = [
  { label: 'Ferramentas', value: '30+', icon: '🧰' },
  { label: 'Categorias', value: '6', icon: '📂' },
  { label: 'Grátis', value: '100%', icon: '✅' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 py-8"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
          🌾 AgroToolbox
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-6">
          Calculadoras e ferramentas gratuitas para o agronegócio brasileiro — fiscal, financeiro, agronômica e mais.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 shadow-sm text-center min-w-[100px]">
              <p className="text-2xl">{s.icon}</p>
              <p className="text-xl font-bold text-green-700 dark:text-green-400">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {CATEGORIAS.map((cat, i) => {
        const ferramentas = FERRAMENTAS.filter((f) => f.categoria === cat.slug);
        if (ferramentas.length === 0) return null;

        return (
          <motion.section
            key={cat.slug}
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
                {cat.icone} {cat.nome}
              </h2>
              <Link
                to={`/categoria/${cat.slug}`}
                className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
              >
                Ver todas →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ferramentas.map((f) => (
                <ToolCard key={f.slug} ferramenta={f} />
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
