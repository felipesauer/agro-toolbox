import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ToolPage from '../pages/ToolPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categoria/:slug" element={<CategoryPage />} />
      <Route path="/ferramenta/:slug" element={<ToolPage />} />
    </Routes>
  );
}
