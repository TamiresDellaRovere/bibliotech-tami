import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";


//Layout principal do App com Navbar Fixa
// As paginas com Navbar fixa: home, livros, empréstimos, etc...
export function Root(){

    const usuarioLogado = useContext(AuthContext);

    //quando o usuário tenta acessar a home sem estar logado ele manda para a pagina login
    if(usuarioLogado === null){ //usuarioLogado vem do arquivo App
        
        //se o usuario está deslogado
        // redireciona para a página de login
        return <Navigate to="/login" /> // -> não permite que o usuario acesse a pagina home sem estar logado
    }

    return(
        <>
        <header>
            <Menu />
        </header>
        <main>
            <Outlet />
        </main>
        </>
    )
}