import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Search, ChevronRight } from 'lucide-react';
/* import { db } from "../firebase/firebaseConfig";  // Importa la referencia a la base de datos desde firebaseConfig
import { collection, getDocs } from "firebase/firestore";   */// Importa las funciones necesarias de Firestore


const products = [
  {
    id: 1,
    name: 'Argentina 2022 Campeón',
    category: 'adulto',
    subcategory: 'futbol',
    subsubcategory: 'camisetas',
    subsubsubcategory: 'selecciones-nacionales',
    price: 24999,
    images: [
      'https://images.unsplash.com/photo-1671465317593-a637c8a0e08c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1671465314792-2bd24c64c1c4?q=80&w=600&auto=format&fit=crop'
    ],
  },
  {
    id: 2,
    name: 'Boca Juniors 2024',
    category: 'adulto',
    subcategory: 'futbol',
    subsubcategory: 'camisetas',
    subsubsubcategory: 'clubes-nacionales',
    price: 22999,
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614632537355-3aa9c93c8e8c?q=80&w=600&auto=format&fit=crop'
    ],
  },
  {
    id: 3,
    name: 'River Plate Retro 1986',
    category: 'adulto',
    subcategory: 'futbol',
    subsubcategory: 'camisetas-retro',
    subsubsubcategory: 'clubes-nacionales',
    price: 19999,
    images: [
      'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577471488695-a4dd0d38c335?q=80&w=600&auto=format&fit=crop'
    ],
  },
  {
    id: 3,
    name: 'River Plate Retro 1986',
    category: 'adulto',
    subcategory: 'futbol',
    subsubcategory: 'camisetas-retro',
    subsubsubcategory: 'clubes-nacionales',
    price: 19999,
    images: [
      'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577471488695-a4dd0d38c335?q=80&w=600&auto=format&fit=crop'
    ],
  }
];

const categories = [
  {
    id: 'adulto',
    name: 'Adulto',
    subcategories: [
      {
        id: 'futbol',
        name: 'Fútbol',
        subcategories: [
          {
            id: 'bermudas',
            name: 'Bermudas'
          },
          {
            id: 'chombas',
            name: 'Chombas'
          },
          {
            id: 'entrenamiento',
            name: 'Entrenamiento'
          },
          {
            id: 'camisetas',
            name: 'Camisetas',
            subcategories: [
              { id: 'clubes-internacionales', name: 'Clubes Internacionales' },
              { id: 'clubes-nacionales', name: 'Clubes Nacionales' },
              { id: 'selecciones-nacionales', name: 'Selecciones Nacionales' }
            ]
          },
          {
            id: 'camisetas-retro',
            name: 'Camisetas Retro',
            subcategories: [
              { id: 'retro-clubes-internacionales', name: 'Clubes Internacionales' },
              { id: 'retro-clubes-nacionales', name: 'Clubes Nacionales' },
              { id: 'retro-selecciones-nacionales', name: 'Selecciones Nacionales' }
            ]
          },
          {
            id: 'camperas-buzos',
            name: 'Camperas y Buzos',
            subcategories: [
              { id: 'afa', name: 'AFA' },
              { id: 'internacional', name: 'Internacional' },
              { id: 'nacional', name: 'Nacional' }
            ]
          },
          {
            id: 'chupines-entrenamiento',
            name: 'Chupines Entrenamiento'
          },
          {
            id: 'remeras-algodon',
            name: 'Remeras Algodón',
            subcategories: [
              { id: 'algodon-clubes-internacionales', name: 'Clubes Internacionales' },
              { id: 'algodon-clubes-nacionales', name: 'Clubes Nacionales' }
            ]
          },
          {
            id: 'shorts',
            name: 'Shorts'
          }
        ]
      },
      {
        id: 'basquet',
        name: 'Básquet',
        subcategories: [
          { id: 'basquet-bermudas', name: 'Bermudas' },
          { id: 'basquet-buzos', name: 'Buzos' },
          { id: 'basquet-camperas', name: 'Camperas' },
          { id: 'basquet-chupines', name: 'Chupines' },
          { id: 'basquet-gorras', name: 'Gorras' },
          {
            id: 'basquet-musculosas',
            name: 'Musculosas',
            subcategories: [
              { id: 'apliques', name: 'Apliques' },
              { id: 'calidad-original', name: 'Calidad Original' },
              { id: 'replicas', name: 'Replicas' },
              { id: 'sublimadas', name: 'Sublimadas' }
            ]
          },
          { id: 'basquet-remeras-algodon', name: 'Remeras Algodón' }
        ]
      }
    ]
  },
  {
    id: 'nino',
    name: 'Niño',
    subcategories: [
      { id: 'nino-basquet', name: 'Básquet' },
      { id: 'nino-futbol', name: 'Fútbol' },
      { id: 'nino-merchandising', name: 'Merchandising' }
    ]
  }
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('categoria') || 'todos';
  const currentSubcategory = searchParams.get('subcategoria');
  const currentSubSubcategory = searchParams.get('subsubcategoria');
  const currentSubSubSubcategory = searchParams.get('subsubsubcategoria');
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([]);
  const [showFilters] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const newExpandedCategories = new Set(expandedCategories);
    
    if (currentCategory !== 'todos') {
      newExpandedCategories.add(currentCategory);
      
      if (currentSubcategory) {
        newExpandedCategories.add(currentSubcategory);
        
        if (currentSubSubcategory) {
          newExpandedCategories.add(currentSubSubcategory);
        }
      }
    }
    
    setExpandedCategories(Array.from(newExpandedCategories));
  }, [currentCategory, currentSubcategory, currentSubSubcategory]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.includes(categoryId);
  };

  const isCategorySelected = (categoryId: string, path: any) => {
    return Object.values(path).includes(categoryId) || 
           categoryId === currentCategory ||
           categoryId === currentSubcategory ||
           categoryId === currentSubSubcategory ||
           categoryId === currentSubSubSubcategory;
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    
    if (currentCategory !== 'todos') {
      const category = categories.find(c => c.id === currentCategory);
      if (category) {
        breadcrumbs.push({ id: category.id, name: category.name });
        
        if (currentSubcategory) {
          const subcategory = category.subcategories?.find(s => s.id === currentSubcategory);
          if (subcategory) {
            breadcrumbs.push({ id: subcategory.id, name: subcategory.name });
            
            if (currentSubSubcategory) {
              const subsubcategory = 'subcategories' in subcategory ? (subcategory.subcategories as any[]).find(s => s.id === currentSubSubcategory) : undefined;
              if (subsubcategory) {
                breadcrumbs.push({ id: subsubcategory.id, name: subsubcategory.name });
                
                if (currentSubSubSubcategory) {
                  const subsubsubcategory = subsubcategory.subcategories?.find((s: { id: string }) => s.id === currentSubSubSubcategory);
                  if (subsubsubcategory) {
                    breadcrumbs.push({ id: subsubsubcategory.id, name: subsubsubcategory.name });
                  }
                }
              }
            }
          }
        }
      }
    }
    
    return breadcrumbs;
  };

  const renderCategoryTree = (categories: any[], level = 0, parentPath = {}) => {
    return categories.map(category => {
      const currentPath = { ...parentPath, [`level${level}`]: category.id };
      const isExpanded = isCategoryExpanded(category.id);
      const isSelected = isCategorySelected(category.id, currentPath);
      
      return (
        <div key={category.id} className={`ml-${level * 4}`}>
          <button
            onClick={() => {
              if (category.subcategories) {
                toggleCategory(category.id);
              }
              setSearchParams({ ...currentPath });
            }}
            className={`w-full text-left px-4 py-2 rounded-md transition flex items-center justify-between ${
              isSelected
                ? 'bg-gray-800 text-white font-medium shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{category.name}</span>
            {category.subcategories && (
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                } ${isSelected ? 'text-white' : 'text-gray-400'}`}
              />
            )}
          </button>
          
          {isExpanded && category.subcategories && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
              {renderCategoryTree(category.subcategories, level + 1, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      if (currentCategory !== 'todos') {
        if (product.category !== currentCategory) return false;
        if (currentSubcategory && product.subcategory !== currentSubcategory) return false;
        if (currentSubSubcategory && product.subsubcategory !== currentSubSubcategory) return false;
        if (currentSubSubSubcategory && product.subsubsubcategory !== currentSubSubSubcategory) return false;
      }
      
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      
      return true;
    });
  }, [currentCategory, currentSubcategory, currentSubSubcategory, currentSubSubSubcategory, searchTerm]);

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

        {/* Breadcrumbs */}
        {currentCategory !== 'todos' && (
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center space-x-2">
                <li>
                  <button
                    onClick={() => {
                      setSearchParams({});
                      setExpandedCategories([]);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Todas las Categorías
                  </button>
                </li>
                {getBreadcrumbs().map((crumb, index) => (
                  <React.Fragment key={crumb.id}>
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <li>
                      <span className={`${
                        index === getBreadcrumbs().length - 1
                          ? 'text-black font-medium'
                          : 'text-gray-500'
                      }`}>
                        {crumb.name}
                      </span>
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-80 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="md:w-80 hidden md:block">
              {/* Categories */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-semibold text-gray-900 mb-4">Categorías</h2>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSearchParams({});
                      setExpandedCategories([]);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md transition ${
                      currentCategory === 'todos'
                        ? 'bg-gray-800 text-white font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Todas las Categorías
                  </button>

                  <div className="mt-2 space-y-1">
                    {renderCategoryTree(categories)}
                  </div>
                </div>
              </div>

              {/* Temporadas */}
              

              {/* Marcas */}
              
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Category Title */}
            {currentCategory !== 'todos' && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {getBreadcrumbs().map(crumb => crumb.name).join(' › ')}
                </h1>
                <p className="text-gray-600 mt-2">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
                </p>
              </div>
            )}

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
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                      <p className="text-black font-bold text-lg">
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