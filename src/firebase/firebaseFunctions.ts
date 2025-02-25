import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Suponiendo que tienes el archivo JSON en el cliente o ya lo cargas en la app
const productsJson = [
  {
    category: 'adulto',
    subcategory: 'futbol',
    subsubcategory: 'bermudas',
    imageUrls: ['https://link-a-imagen1.jpg', 'https://link-a-imagen2.jpg']
  },
  {
    category: 'nino',
    subcategory: 'futbol',
    subsubcategory: 'camisetas',
    imageUrls: ['https://link-a-imagen3.jpg', 'https://link-a-imagen4.jpg']
  }
];

export const addBulkProducts = async (products: any[]) => {
  try {
    for (let product of products) {
      await addDoc(collection(db, 'productos'), {
        category: product.category,
        subcategory: product.subcategory,
        subsubcategory: product.subsubcategory,
        imageUrls: product.imageUrls,
        createdAt: new Date()
      });
    }
    console.log('Productos agregados exitosamente.');
  } catch (error) {
    console.error('Error al agregar productos:', error);
  }
};

// Llamada a la función
addBulkProducts(productsJson);