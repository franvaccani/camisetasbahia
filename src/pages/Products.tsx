import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Argentina 2022 Campeón',
    category: 'camisetas',
    subcategory: 'camisetas-selecciones',
    price: 24999,
    images: [
      'https://images.unsplash.com/photo-1671465317593-a637c8a0e08c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1671465314792-2bd24c64c1c4?q=80&w=600&auto=format&fit=crop'
    ],
    temporada: '2022',
    marca: 'Adidas'
  },
  {
    id: 2,
    name: 'Boca Juniors 2024',
    category: 'camisetas',
    subcategory: 'camisetas-clubes-nacionales',
    price: 22999,
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614632537355-3aa9c93c8e8c?q=80&w=600&auto=format&fit=crop'
    ],
    temporada: '2024',
    marca: 'Adidas'
  },
  {
    id: 3,
    name: 'River Plate Retro 1986',
    category: 'camisetas-retro',
    subcategory: 'retro-clubes-nacionales',
    price: 19999,
    images: [
      'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577471488695-a4dd0d38c335?q=80&w=600&auto=format&fit=crop'
    ],
    temporada: '1986',
    marca: 'Adidas'
  }
];

const categories = [
  {
    id: 'camisetas-retro',
    name: 'Camisetas Retro',
    subcategories: [
      { id: 'retro-clubes-internacionales', name: 'Clubes Internacionales' },
      { id: 'retro-clubes-nacionales', name: 'Clubes Nacionales' },
      { id: 'retro-selecciones', name: 'Selecciones Nacionales' }
    ]
  },
  {
    id: 'camisetas',
    name: 'Camisetas',
    subcategories: [
      { id: 'camisetas-clubes-nacionales', name: 'Clubes Nacionales' },
      { id: 'camisetas-clubes-internacionales', name: 'Clubes Internacionales' },
      { id: 'camisetas-selecciones', name: 'Selecciones Nacionales' }
    ]
  },
  {
    id: 'remeras-algodon',
    name: 'Remeras Algodón',
    subcategories: [
      { id: 'remeras-clubes-internacionales', name: 'Clubes Internacionales' },
      {
        id: 'remeras-clubes-nacionales',
        name: 'Clubes Nacionales',
        subItems: [
          { id: 'river', name: 'River' },
          { id: 'boca', name: 'Boca' },
          { id: 'racing', name: 'Racing' },
          { id: 'san-lorenzo', name: 'San Lorenzo' },
          { id: 'independiente', name: 'Independiente' },
          { id: 'afa', name: 'AFA' },
          { id: 'resto', name: 'Resto' }
        ]
      }
    ]
  },
  {
    id: 'camperas-buzos',
    name: 'Camperas y Buzos',
    subcategories: [
      { id: 'camperas-internacional', name: 'Internacional' },
      { id: 'camperas-nacional', name: 'Nacional' },
      { id: 'camperas-afa', name: 'AFA' }
    ]
  },
  {
    id: 'musculosas',
    name: 'Musculosas',
    subcategories: [
      { id: 'musculosas-calidad-original', name: 'Calidad Original' },
      { id: 'musculosas-apliques', name: 'Apliques' },
      { id: 'musculosas-replicas', name: 'Replicas' },
      { id: 'musculosas-sublimadas', name: 'Sublimadas' }
    ]
  },
  {
    id: 'ninos',
    name: 'Niños',
    subcategories: [
      { id: 'futbol-nino', name: 'Fútbol Niño' },
      { id: 'basket-nino', name: 'Basket Niño' },
      { id: 'merchandising', name: 'Merchandising' }

    ]
  },
  {
    id: 'otros',
    name: 'Otros',
    subcategories: [
      { id: 'shorts', name: 'Shorts' },
      { id: 'bermudas', name: 'Bermudas' },
      { id: 'chupines', name: 'Chupines' },
      { id: 'gorras', name: 'Gorras' },
    ]
  }
];

const temporadas = ['2024', '2023', '2022', '2021', '2020', '1986'];
const marcas = ['Adidas', 'Nike', 'Puma', 'Kappa', 'Under Armour'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('categoria') || 'todos';
  const currentSubcategory = searchParams.get('subcategoria');
  const currentSubItem = searchParams.get('subitem');
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [showFilters] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTemporadas, setSelectedTemporadas] = React.useState<string[]>([]);
  const [selectedMarcas, setSelectedMarcas] = React.useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleTemporada = (temporada: string) => {
    setSelectedTemporadas(prev => 
      prev.includes(temporada) 
        ? prev.filter(t => t !== temporada)
        : [...prev, temporada]
    );
  };

  const toggleMarca = (marca: string) => {
    setSelectedMarcas(prev => 
      prev.includes(marca) 
        ? prev.filter(m => m !== marca)
        : [...prev, marca]
    );
  };

  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (currentCategory !== 'todos' && product.category !== currentCategory) return false;
      if (currentSubcategory && product.subcategory !== currentSubcategory) return false;
      
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // Temporada filter
      if (selectedTemporadas.length > 0 && !selectedTemporadas.includes(product.temporada)) return false;
      
      // Marca filter
      if (selectedMarcas.length > 0 && !selectedMarcas.includes(product.marca)) return false;
      
      return true;
    });
  }, [currentCategory, currentSubcategory, currentSubItem, searchTerm, selectedTemporadas, selectedMarcas]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="md:w-64 hidden md:block">
              {/* Categories */}
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
                        ? 'bg-blue-600 text-white'
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
                            ? 'bg-blue-600 text-white'
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
                            <div key={subcategory.id}>
                              <button
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
                              {subcategory.subItems && (
                                <div className="ml-4 space-y-1">
                                  {subcategory.subItems.map(item => (
                                    <button
                                      key={item.id}
                                      onClick={() => setSearchParams({
                                        categoria: category.id,
                                        subcategoria: subcategory.id,
                                        subitem: item.id
                                      })}
                                      className={`w-full text-left px-4 py-2 rounded-md transition ${
                                        currentSubItem === item.id
                                          ? 'bg-blue-600 text-white'
                                          : 'text-gray-600 hover:bg-gray-100'
                                      }`}
                                    >
                                      {item.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Temporadas */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-semibold text-gray-900 mb-4">Temporadas</h2>
                <div className="space-y-2">
                  {temporadas.map(temporada => (
                    <label
                      key={temporada}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTemporadas.includes(temporada)}
                        onChange={() => toggleTemporada(temporada)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{temporada}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Marcas */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-semibold text-gray-900 mb-4">Marcas</h2>
                <div className="space-y-2">
                  {marcas.map(marca => (
                    <label
                      key={marca}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMarcas.includes(marca)}
                        onChange={() => toggleMarca(marca)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{marca}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <a
                  key={product.id}
                  href={`/producto/${product.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 mb-1">{product.marca} - {product.temporada}</p>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                      <p className="text-blue-600 font-bold text-lg">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No se encontraron productos con los filtros seleccionados
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