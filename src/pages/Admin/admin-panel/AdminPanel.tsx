import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

// Define los tipos para las categorías y subcategorías
interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface ProductForm {
  productName: string;
  description: string;
  price: number;
}

const API_URL = 'http://localhost:5001'; // Ajusta a la URL de tu servidor

const AdminPanel = () => {
  const { register, handleSubmit, reset } = useForm<ProductForm>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);

  useEffect(() => {
    // Obtener categorías cuando se carga el panel
    axios.get(`${API_URL}/categories`)
      .then((response) => {
        console.log(response.data); // Verifica los datos que recibes
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Error al cargar las categorías');
      });
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(''); // Resetear subcategoría cuando se cambia la categoría
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(URL.createObjectURL(file)); // Mostrar la imagen cargada en el frontend
    }
  };

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    const newProduct = {
      id: Date.now().toString(),  // Generar un ID único para el producto
      name: data.productName,
      description: data.description,
      price: parseFloat(data.price.toString()),
      images: [image1, image2].filter(Boolean), // Solo agregar las imágenes que se hayan cargado
    };

    axios.post(`${API_URL}/categories/${selectedCategory}/subcategories/${selectedSubcategory}/products`, newProduct)
      .then(() => {
        alert('Producto agregado correctamente');
        reset();  // Resetear el formulario
      })
      .catch((error) => {
        console.error(error);
        alert('Error al agregar el producto');
      });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Panel de Administración</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Selección de Categoría */}
        <div>
          <label htmlFor="category" className="block text-lg">Categoría</label>
          <select
            id="category"
            name="category"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleCategoryChange}
            value={selectedCategory}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Selección de Subcategoría */}
        <div>
          <label htmlFor="subcategory" className="block text-lg">Subcategoría</label>
          <select
            id="subcategory"
            name="subcategory"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleSubcategoryChange}
            value={selectedSubcategory}
            required
          >
            <option value="">Seleccione una subcategoría</option>
            {selectedCategory &&
              categories
                .find((cat) => cat.id === selectedCategory)
                ?.subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                ))}
          </select>
        </div>

        {/* Nombre del Producto */}
        <div>
          <label htmlFor="productName" className="block text-lg">Nombre del Producto</label>
          <input
            id="productName"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register('productName', { required: 'El nombre del producto es obligatorio' })}
          />
        </div>

        {/* Descripción del Producto */}
        <div>
          <label htmlFor="description" className="block text-lg">Descripción del Producto</label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register('description', { required: 'La descripción es obligatoria' })}
          ></textarea>
        </div>

        {/* Precio del Producto */}
        <div>
          <label htmlFor="price" className="block text-lg">Precio del Producto</label>
          <input
            id="price"
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register('price', { required: 'El precio es obligatorio' })}
          />
        </div>

        {/* Subir Imágenes */}
        <div>
          <label className="block text-lg">Imágenes del Producto</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full mb-2"
            onChange={(e) => handleImageUpload(e, setImage1)}
          />
          {image1 && <img src={image1} alt="Imagen 1" className="w-32 h-32 object-cover" />}
          
          <input
            type="file"
            accept="image/*"
            className="block w-full mb-2"
            onChange={(e) => handleImageUpload(e, setImage2)}
          />
          {image2 && <img src={image2} alt="Imagen 2" className="w-32 h-32 object-cover" />}
        </div>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded-md">
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;