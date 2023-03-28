import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./contexts/AuthContext";
import { auth } from "./firebase/config";
import { AdicionarLivro } from "./pages/AdicionarLivros/AdicionarLivros";

export function App() {

    const [usuarioLogado, setUsuarioLogado] = useState(null); //começa o estado deslogado, quando loga atualiza o estado;


    useEffect(() => {

        // onAuthStateChanged -> verifica se o usuário está logado ou não
        onAuthStateChanged(auth, (user) => {
            // user é nulo = deslogado
            // user tem objeto = logado
            setUsuarioLogado(user);

        })

        //array vazio, esse efeito irá rodar apenas uma vez;
        // Quando o App for renderizado/inicializado
    }, [])



    return (
        <>
            <AuthContext.Provider value={usuarioLogado}> {/* Se o usuario estiver logado vai prover os dados do usuário para as outras paginas*/}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Root />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/livros/adicionar" element={<AdicionarLivro />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
            <Toaster />  {/* Faz a biblioteca hot-toast funcionar em todas as paginas*/}


        </>);
}