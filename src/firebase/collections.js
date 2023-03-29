import { db } from "./config";
import { collection } from "firebase/firestore";


//representa a coleção de livros, é "livros" porque foi esse titulo que demos na pagina Firebase, lá no Firebase Console
export const livrosCollection = collection(db, "livros"); 
