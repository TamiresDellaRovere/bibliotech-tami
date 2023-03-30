import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function adicionarEmprestimo(data){
    await addDoc(emprestimosCollection, data);
};
// essa função salva o emprestimo


export async function getEmprestimos() {
    const snapshot = await getDocs(emprestimosCollection);
    let emprestimos = [];
    snapshot.forEach(doc => {
        emprestimos.push({...doc.data(), id: doc.id});
    });
    return emprestimos;
};
// essa função retorna os emprestimo na tabela de emprestimos

export async function getEmprestimo(id) {
    const document = await getDoc(doc(emprestimosCollection, id));
    return {...document.data(), id: document.id};
};
// essa função traz o livro a ser editado no editar emprestimos

export async function updateEmprestimo (id, data) {
    await updateDoc(doc(emprestimosCollection, id), data);
};
// esse aqui edita o livro na seção de editarEmprestimo