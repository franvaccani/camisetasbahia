import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Truck, CreditCard, ShieldCheck, MessageCircle } from 'lucide-react';

import Carrousel from '../components/Carrousel';
const featuredProducts = [
  {
    id: 1,
    name: 'Argentina 2022 Campeón',
    price: 24999,
    images: [
      'https://images.unsplash.com/photo-1671465317593-a637c8a0e08c?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 2,
    name: 'Boca Juniors 2024',
    price: 22999,
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 3,
    name: 'River Plate Retro 1986',
    price: 19999,
    images: [
      'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 4,
    name: 'Independiente 2023',
    price: 21999,
    images: [
      'https://images.unsplash.com/photo-1603134067099-7219c70d2b8c?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 5,
    name: 'Racing Club 2024',
    price: 23999,
    images: [
      'https://images.unsplash.com/photo-1597913025851-4cd04f3e8ffb?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 6,
    name: 'Racing Club 2024',
    price: 23999,
    images: [
      'https://images.unsplash.com/photo-1597913025851-4cd04f3e8ffb?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 7,
    name: 'Racing Club 2024',
    price: 23999,
    images: [
      'https://images.unsplash.com/photo-1597913025851-4cd04f3e8ffb?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 8,
    name: 'Racing Club 2024',
    price: 23999,
    images: [
      'https://images.unsplash.com/photo-1597913025851-4cd04f3e8ffb?q=80&w=600&auto=format&fit=crop'
    ]
  }
];

import { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1676498111080-5b73b7f0122c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fondo de camisetas de fútbol"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl max-sm:text-3xl font-bold text-white mb-6">
            Las Mejores Camisetas de Fútbol y Basket
          </h1>
          <p className="text-xl max-sm:text-lg text-white mb-8 max-w-2xl">
            Encontrá tu camiseta favorita entre nuestra amplia colección de equipos.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              placeholder="Buscar camisetas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
          </div>
        </div>
      </section>

{/* Benefits Section */}
<section className="py-5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 bg-black rounded-lg">
              <Truck className="h-10 w-10 text-white" />
              <div>
                <h3 className="font-semibold text-white">Envío Gratis</h3>
                <p className="text-white">En compras mayores a $50.000</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-black rounded-lg">
              <CreditCard className="h-10 w-10 text-white" />
              <div>
                <h3 className="font-semibold text-white">Cuotas Sin Interés</h3>
                <p className="text-white">Con todas las tarjetas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-black rounded-lg">
              <ShieldCheck className="h-10 w-10 text-white" />
              <div>
                <h3 className="font-semibold text-white">Comprá Tranquilo y Seguro</h3>
                <p className="text-white">Estamos para ayudarte</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Lo más vendido</h2>

        {/* Grid de 4 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/producto/${product.id}`} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-black font-bold mt-2">${product.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

      

      {/* Contact CTA */}
      <section className="py-16 mb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contáctanos por WhatsApp o redes sociales para asesoramiento personalizado
          </p>
          <a 
            href="https://wa.me/5492911234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>
      
      <Carrousel />


      
    </div>
  );
};

export default Home;

