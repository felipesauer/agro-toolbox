import { AppRoutes } from './routes';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
