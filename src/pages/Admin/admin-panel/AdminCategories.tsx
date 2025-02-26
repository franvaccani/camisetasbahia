// AdminCategories.tsx

// Exportando directamente el array de categorías
export const categories = [
  {
    id: 'adulto',
    name: 'Adulto',
    subcategories: [
      {
        id: 'futbol',
        name: 'Fútbol',
        subcategories: [
          { id: 'bermudas', name: 'Bermudas' },
          { id: 'camisetas', name: 'Camisetas' },
        ],
      },
    ],
  },
  {
    id: 'nino',
    name: 'Niño',
    subcategories: [
      { id: 'nino-basquet', name: 'Básquet' },
      { id: 'nino-futbol', name: 'Fútbol' },
    ],
  },
];

// Componente que usa ese array
const AdminCategories = () => {
  return (
    <div>
      <h1>Administrar Categorías</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong>
            <ul>
              {category.subcategories.map((sub) => (
                <li key={sub.id}>{sub.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategories;