
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCGiO0Pgyw0AuOIRcG-8iTz9p5lyEUGohU",
    authDomain: "bibliotech-tami.firebaseapp.com",
    projectId: "bibliotech-tami",
    storageBucket: "bibliotech-tami.appspot.com",
    messagingSenderId: "454410807935",
    appId: "1:454410807935:web:430fcc3ca55ac180dc2d4a"
};

// Inicializa o app com base nas configurações acima
const app = initializeApp(firebaseConfig);

// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);

//Configura o Firestore e seus recursos
export const db= getFirestore(app);

//Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);
