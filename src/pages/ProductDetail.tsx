import React from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  images: string[];
};

const products: { [key: string]: Product } = {
  1: {
    id: 1,
    name: 'Argentina 2022 Campeón',
    category: 'selecciones',
    price: 24999,
    description: 'Camiseta oficial de la Selección Argentina campeona del mundo 2022. Incluye parche de campeón mundial.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1671465317593-a637c8a0e08c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1671465314792-2bd24c64c1c4?q=80&w=600&auto=format&fit=crop'
    ]
  },
  2: {
    id: 2,
    name: 'Boca Juniors 2024',
    category: 'equipos',
    price: 22999,
    description: 'Camiseta titular Boca Juniors temporada 2024. Material de primera calidad con tecnología de ventilación.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614632537355-3aa9c93c8e8c?q=80&w=600&auto=format&fit=crop'
    ]
  },
  3: {
    id: 3,
    name: 'River Plate Retro 1986',
    category: 'retro',
    price: 19999,
    description: 'Camiseta retro River Plate 1986. Edición especial conmemorativa de la primera Copa Libertadores.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577471488695-a4dd0d38c335?q=80&w=600&auto=format&fit=crop'
    ]
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = React.useState('');
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  const product = products[Number(id)];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Producto no encontrado</h1>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola! Me gustaría tener más información sobre la camiseta ${product.name}`);
    window.open(`https://wa.me/5492911234567?text=${message}`, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Carousel */}
          <div className="relative aspect-w-3 rounded-lg overflow-hidden group">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Vista ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevImage}
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl text-blue-600 font-bold mb-6">
              ${product.price.toLocaleString()}
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Talle</h2>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md border ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    } flex items-center justify-center font-medium`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                disabled={!selectedSize}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al carrito
              </button>
              <button
                className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
              >
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Consultar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;