import { addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { livrosCollection } from "./collections";
import { storage } from "./config";

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

export async function deleteLivro(id) {
    await deleteDoc(doc(livrosCollection, id));
} // essa função deleta o livro atraves do id

export async function uploadCapaLivro(imagem) {
    const filename = imagem.name;
    const imageRef = ref(storage, `livros/${filename}`);// ref cria uma pasta livros e o filename é o nome do arquivo;
    const result = await uploadBytes(imageRef, imagem);
    return await getDownloadURL(result.ref);
}

// essa função retorna os dados url da imagem
//ref -> função do storage

// //quem armazena é o storage
// export async function uploadCapaLivro(imagem){
//     //pego o nome da img e armazeno no filename
//     const filename = imagem.name;
//     //imageRef recebe a configuração de upload e pasta livro com o nome do arquivo dentro
//     const imageRef = ref(storage, `livros/${filename}`);
//     //result vai carregar dados de localização com base na pasta e nos dados do parâmetro imagem 
//     //se deu certo ou algum erro
//     const result = await uploadBytes(imageRef, imagem);
//     //Ret
