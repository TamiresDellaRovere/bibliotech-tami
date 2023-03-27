import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./config"; // é a autenticação do projeto;

// Função assincrona = que o resultado não é obtido de imediato;
//Haverá "espera" dos dados;
export async function cadastrarEmailSenha(email, senha){
    //Indicar para o firebase que queremos cadastras
    // um novo usuário utilizando email/senha

    //Aguardando o resultado do Firebase
    const resultado = await createUserWithEmailAndPassword(auth, email, senha);

    return resultado.user;
}

export async function loginGoogle(){

    //Configurar como o login do google vai funcionar;
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup (auth, provider);

    return resultado.user;
}

export async function loginEmailSenha(email, senha){

    //Vai realizar o login com uma conta de email que já existe
    const resultado = await signInWithEmailAndPassword (auth, email, senha);

    return resultado.user;
}