// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBA7netZviCboChHNA4x5pMOvnCD_xGlRk",
  authDomain: "camisetas-bahia-31699.firebaseapp.com",
  projectId: "camisetas-bahia-31699",
  storageBucket: "camisetas-bahia-31699.firebasestorage.app",
  messagingSenderId: "101440655328",
  appId: "1:101440655328:web:045ad3aefec0f5d804a585"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y exportar la referencia
const db = getFirestore(app);

export { db };