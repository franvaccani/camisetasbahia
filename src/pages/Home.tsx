import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: 'Argentina 2022 Campeón',
    price: 24999,
    images: [
      'https://images.unsplash.com/photo-1671465317593-a637c8a0e08c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1671465314792-2bd24c64c1c4?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 2,
    name: 'Boca Juniors 2024',
    price: 22999,
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614632537355-3aa9c93c8e8c?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 3,
    name: 'River Plate Retro 1986',
    price: 19999,
    images: [
      'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577471488695-a4dd0d38c335?q=80&w=600&auto=format&fit=crop'
    ]
  }
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r bg-black">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Camisetas Bahia
          </h1>
          <p className="text-xl text-white mb-8">
            Las mejores camisetas de fútbol, originales y retro
          </p>
          <Link 
            to="/productos"
            className="inline-flex items-center bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition w-fit"
          >
            Ver Catálogo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Camisetas Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id}
                to={`/producto/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-3">
                    <img 
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-blue-600 font-bold mt-2">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id}
                to={`/producto/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-3">
                    <img 
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-blue-600 font-bold mt-2">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      

      {/* Contact CTA */}
      <section className="py-16 bg-white">
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
    </div>
  );
};

export default Home;