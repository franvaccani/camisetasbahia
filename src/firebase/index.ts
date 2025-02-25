import { db } from './firebaseConfig'; // Importar la configuración de Firebase
import { collection, doc, setDoc } from 'firebase/firestore'; // Importar funciones necesarias

interface Subcategory {
  id: string;
  name: string;
  subcategories?: Subcategory[]; // Subcategorías dentro de la subcategoría
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  {
    id: 'adulto',
    name: 'Adulto',
    subcategories: [
      {
        id: 'futbol',
        name: 'Fútbol',
        subcategories: [
          { id: 'bermudas', name: 'Bermudas' },
          { id: 'chombas', name: 'Chombas' },
          { id: 'entrenamiento', name: 'Entrenamiento' },
          { id: 'camisetas', name: 'Camisetas', subcategories: [
            { id: 'clubes-internacionales', name: 'Clubes Internacionales' },
            { id: 'clubes-nacionales', name: 'Clubes Nacionales' },
            { id: 'selecciones-nacionales', name: 'Selecciones Nacionales' }
          ] },
          { id: 'camisetas-retro', name: 'Camisetas Retro', subcategories: [
            { id: 'retro-clubes-internacionales', name: 'Clubes Internacionales' },
            { id: 'retro-clubes-nacionales', name: 'Clubes Nacionales' },
            { id: 'retro-selecciones-nacionales', name: 'Selecciones Nacionales' }
          ] },
          { id: 'camperas-buzos', name: 'Camperas y Buzos', subcategories: [
            { id: 'afa', name: 'AFA' },
            { id: 'internacional', name: 'Internacional' },
            { id: 'nacional', name: 'Nacional' }
          ] },
          { id: 'chupines-entrenamiento', name: 'Chupines Entrenamiento' },
          { id: 'remeras-algodon', name: 'Remeras Algodón', subcategories: [
            { id: 'algodon-clubes-internacionales', name: 'Clubes Internacionales' },
            { id: 'algodon-clubes-nacionales', name: 'Clubes Nacionales' }
          ] },
          { id: 'shorts', name: 'Shorts' }
          
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
          { id: 'basquet-musculosas', name: 'Musculosas', subcategories: [
            { id: 'apliques', name: 'Apliques' },
            { id: 'calidad-original', name: 'Calidad Original' },
            { id: 'replicas', name: 'Replicas' },
            { id: 'sublimadas', name: 'Sublimadas' }
          ] },
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

const addCategoryAndSubcategories = async (category: Category) => {
  try {
    // Agregar la categoría principal
    const categoryRef = doc(collection(db, 'categories'), category.id);
    await setDoc(categoryRef, {
      name: category.name
    });

    // Agregar las subcategorías
    for (const subcategory of category.subcategories) {
      const subcategoryRef = doc(collection(categoryRef, 'subcategories'), subcategory.id);
      await setDoc(subcategoryRef, {
        name: subcategory.name
      });

      // Si la subcategoría tiene más subcategorías, agregarlas
      if (subcategory.subcategories) {
        for (const subSubcategory of subcategory.subcategories) {
          const subSubcategoryRef = doc(collection(subcategoryRef, 'subcategories'), subSubcategory.id);
          await setDoc(subSubcategoryRef, {
            name: subSubcategory.name
          });
        }
      }
    }

    console.log(`Categoría "${category.name}" y sus subcategorías agregadas exitosamente.`);
  } catch (error) {
    console.error('Error al agregar categorías y subcategorías:', error);
  }
};

const addCategories = async () => {
  for (const category of categories) {
    await addCategoryAndSubcategories(category);
  }
};

addCategories();