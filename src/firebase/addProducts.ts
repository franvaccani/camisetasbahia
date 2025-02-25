import { db } from './firebaseConfig'; // Importación de la configuración de Firebase
import { collection, doc, writeBatch } from 'firebase/firestore'; // Importar las funciones correctas de Firestore

interface Product {
  name: string;
  price: number;
  category: string;
}

export const addBulkProductsBatch = async (products: Product[]) => {
  try {
    const batch = writeBatch(db); // Usar writeBatch para crear un nuevo batch
    const productsRef = collection(db, 'products');

    products.forEach(product => {
      const newProductRef = doc(productsRef); // Crea una referencia nueva para cada producto
      batch.set(newProductRef, product); // Agregar la operación de set al batch
    });

    await batch.commit(); // Ejecutar el batch
    console.log('Productos agregados correctamente');
  } catch (error) {
    console.error('Error al agregar productos:', error);
  }
};