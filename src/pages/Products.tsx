import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Argentina 2022 Campeón',
    category: 'futbol',
    subcategory: 'selecciones',
    price: 24999,
    images: [
      'https://images.unsplash.com/photo-1671465317593-a637c8a0e08c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1671465314792-2bd24c64c1c4?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 2,
    name: 'Boca Juniors 2024',
    category: 'futbol',
    subcategory: 'clubes-locales',
    price: 22999,
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614632537355-3aa9c93c8e8c?q=80&w=600&auto=format&fit=crop'
    ]
  },
  {
    id: 3,
    name: 'River Plate Retro 1986',
    category: 'futbol',
    subcategory: 'retro',
    price: 19999,
    images: [
      'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577471488695-a4dd0d38c335?q=80&w=600&auto=format&fit=crop'
    ]
  }
];

const categories = [
  {
    id: 'futbol',
    name: 'Fútbol',
    subcategories: [
      { id: 'clubes-locales', name: 'Clubes Locales' },
      { id: 'clubes-internacionales', name: 'Clubes Internacionales' },
      { id: 'selecciones', name: 'Selecciones' },
      { id: 'retro', name: 'Retro' }
    ]
  },
  {
    id: 'basket',
    name: 'Basketball',
    subcategories: [
      { id: 'nba', name: 'NBA' },
      { id: 'selecciones-basket', name: 'Selecciones' },
      { id: 'liga-nacional', name: 'Liga Nacional' }
    ]
  }
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('categoria') || 'todos';
  const currentSubcategory = searchParams.get('subcategoria');
  const [showFilters, setShowFilters] = React.useState(false);
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const filteredProducts = React.useMemo(() => {
    if (currentCategory === 'todos') return products;
    
    return products.filter(product => {
      const categoryMatch = product.category === currentCategory;
      if (currentSubcategory) {
        return categoryMatch && product.subcategory === currentSubcategory;
      }
      return categoryMatch;
    });
  }, [currentCategory, currentSubcategory]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nuestras Camisetas</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 text-gray-600"
          >
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-gray-900 mb-4">Categorías</h2>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSearchParams({});
                    setExpandedCategory(null);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    currentCategory === 'todos'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Todas las Categorías
                </button>

                {categories.map(category => (
                  <div key={category.id} className="space-y-1">
                    <button
                      onClick={() => {
                        toggleCategory(category.id);
                        setSearchParams({ categoria: category.id });
                      }}
                      className={`w-full text-left px-4 py-2 rounded-md transition flex items-center justify-between ${
                        currentCategory === category.id && !currentSubcategory
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedCategory === category.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedCategory === category.id && (
                      <div className="ml-4 space-y-1">
                        {category.subcategories.map(subcategory => (
                          <button
                            key={subcategory.id}
                            onClick={() => setSearchParams({
                              categoria: category.id,
                              subcategoria: subcategory.id
                            })}
                            className={`w-full text-left px-4 py-2 rounded-md transition ${
                              currentSubcategory === subcategory.id
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {subcategory.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <a
                  key={product.id}
                  href={`/producto/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-w-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-black font-bold mt-2">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No se encontraron productos en esta categoría
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;