import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: 'http://localhost:5173',  // Permite el acceso solo desde este origen
  }));

// Middleware para procesar JSON
app.use(express.json());

// Ruta para obtener los datos de categorías desde el archivo JSON
const getCategories = () => {
  const filePath = path.join(__dirname, './products.json'); // Ruta al archivo JSON
  try {
    const data = fs.readFileSync(filePath, 'utf8'); // Lee el archivo en formato UTF-8
    return JSON.parse(data); // Convierte el contenido a JSON
  } catch (error) {
    console.error('Error al leer el archivo products.json:', error); // Loguea el error si falla la lectura
    return []; // Devuelve un array vacío si no se puede leer el archivo
  }
};

// Ruta para obtener todas las categorías
app.get('/categories', (req, res) => {
  const categories = getCategories();
  res.json(categories);
});

// Ruta para obtener una categoría por ID
app.get('/categories/:id', (req, res) => {
  const categoryId = req.params.id;
  const categories = getCategories();
  const category = categories.find((cat) => cat.id === categoryId);

  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Categoría no encontrada' });
  }
});

// Ruta para obtener todos los productos de una subcategoría
app.get('/categories/:categoryId/subcategories/:subcategoryId/products', (req, res) => {
  const { categoryId, subcategoryId } = req.params;
  const categories = getCategories();
  const category = categories.find((cat) => cat.id === categoryId);

  if (category) {
    const subcategory = category.subcategories.find((subcat) => subcat.id === subcategoryId);
    if (subcategory) {
      res.json(subcategory.products || []);
    } else {
      res.status(404).json({ message: 'Subcategoría no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Categoría no encontrada' });
  }
});

// Ruta para agregar un producto a una subcategoría
app.post('/categories/:categoryId/subcategories/:subcategoryId/products', (req, res) => {
  const { categoryId, subcategoryId } = req.params;
  const newProduct = req.body;
  const categories = getCategories();
  const category = categories.find((cat) => cat.id === categoryId);

  if (category) {
    const subcategory = category.subcategories.find((subcat) => subcat.id === subcategoryId);
    if (subcategory) {
      if (!subcategory.products) {
        subcategory.products = [];  // Si no existe la propiedad "products", la creamos.
      }
      subcategory.products.push(newProduct);
      saveCategories(categories);  // Guardamos las categorías actualizadas en el archivo JSON
      res.status(201).json(newProduct);
    } else {
      res.status(404).json({ message: 'Subcategoría no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Categoría no encontrada' });
  }
});

// Ruta para actualizar un producto en una subcategoría
app.put('/categories/:categoryId/subcategories/:subcategoryId/products/:productId', (req, res) => {
  const { categoryId, subcategoryId, productId } = req.params;
  const updatedProduct = req.body;
  const categories = getCategories();
  const category = categories.find((cat) => cat.id === categoryId);

  if (category) {
    const subcategory = category.subcategories.find((subcat) => subcat.id === subcategoryId);
    if (subcategory) {
      const productIndex = subcategory.products.findIndex((prod) => prod.id === productId);
      if (productIndex !== -1) {
        subcategory.products[productIndex] = { ...subcategory.products[productIndex], ...updatedProduct };
        saveCategories(categories);  // Guardamos las categorías actualizadas en el archivo JSON
        res.json(subcategory.products[productIndex]);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } else {
      res.status(404).json({ message: 'Subcategoría no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Categoría no encontrada' });
  }
});

// Ruta para eliminar un producto de una subcategoría
app.delete('/categories/:categoryId/subcategories/:subcategoryId/products/:productId', (req, res) => {
  const { categoryId, subcategoryId, productId } = req.params;
  const categories = getCategories();
  const category = categories.find((cat) => cat.id === categoryId);

  if (category) {
    const subcategory = category.subcategories.find((subcat) => subcat.id === subcategoryId);
    if (subcategory) {
      const productIndex = subcategory.products.findIndex((prod) => prod.id === productId);
      if (productIndex !== -1) {
        subcategory.products.splice(productIndex, 1);  // Elimina el producto
        saveCategories(categories);  // Guardamos las categorías actualizadas en el archivo JSON
        res.status(204).end();  // Respuesta sin contenido
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } else {
      res.status(404).json({ message: 'Subcategoría no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Categoría no encontrada' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});