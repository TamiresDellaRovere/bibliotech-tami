import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { livrosCollection } from "./collections";

export async function addLivro(data) {
    await addDoc(livrosCollection, data);
}// essa função adiciona o livro na coleção do banco de dados do Firebase, no caso livro por ser o que criamos lá

export async function getLivros() {
    const snapshot = await getDocs(livrosCollection);
    let livros = [];
    snapshot.forEach(doc => {
        livros.push({...doc.data(), id: doc.id});
    })
    return livros;
} //essa função vai trazer toda a coleção dos livros;

export async function getLivro(id){
    const document= await getDoc(doc(livrosCollection, id));
    return {...document.data(), id: document.id}
} // essa função vai trazer somente um documento com o id especifico dele para ser editado;

export async function updateLivro(id, data) {
    await updateDoc(doc(livrosCollection, id), data);
} // essa função vai atualizar o livro editado