import { useState } from 'react';
import { AppRoutes } from './routes';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import SearchModal from './components/ui/SearchModal';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const [dark, setDark] = useDarkMode();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-green-700 focus:text-white focus:p-3 focus:rounded-md">
        Pular para o conteúdo
      </a>
      <Navbar dark={dark} setDark={setDark} onSearch={() => setSearchOpen(true)} />
      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <AppRoutes />
      </main>
      <Footer />
      <SearchModal open={searchOpen} onClose={setSearchOpen} />
    </div>
  );
}
