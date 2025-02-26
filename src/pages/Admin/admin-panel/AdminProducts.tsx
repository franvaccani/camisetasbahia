import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Camiseta Boca 2024', price: 25000, category: 'Fútbol' },
    { id: 2, name: 'Short River Plate', price: 18000, category: 'Fútbol' },
  ]);

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Administrar Productos</h1>
      <ul className="mt-4 space-y-2">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between border-b p-2">
            <span>{product.name} - ${product.price}</span>
            <button 
              className="text-red-500 hover:underline" 
              onClick={() => deleteProduct(product.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProducts;