import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import WhatsAppButton from './components/WhatsAppButton';

// Importamos las páginas del admin
import AdminPanel from './pages/Admin/admin-panel/AdminPanel';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Rutas de la tienda */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />

            {/* Rutas del Admin */}
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;