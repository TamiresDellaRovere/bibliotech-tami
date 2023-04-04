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
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { Livros } from "./pages/Livros/Livros";
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { EditarEmprestimo } from "./pages/EditarEmprestimo/EditarEmprestimo";
import { ThemeContext } from "./contexts/ThemeContext";
import { Quiz } from "./pages/Quizz/Quizz";
import { NotFound } from "./pages/NotFound/NotFound";
// import { NovoBreadcrumb } from "./components/Breadcrumb/Breadcrumb";

export function App() {


    const [temaEscuro, setTemaEscuro] = useState(false);

    //alterna entre true e false toda vez que for chamada;
    function alternar() {
        if (temaEscuro === true) {
            setTemaEscuro(false)
        } else {
            setTemaEscuro(true);
        }
    }

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
            <ThemeContext.Provider value={{ temaEscuro: temaEscuro, alternar: alternar }}>
                <AuthContext.Provider value={usuarioLogado}> {/* Se o usuario estiver logado vai prover os dados do usuário para as outras paginas*/}
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Root />}>                              
                                <Route path="/" element={<Home />} />
                                <Route path="/livros" element={<Livros />} />
                                <Route path="/livros/adicionar" element={<AdicionarLivro />} />
                                <Route path="/livros/editar/:id" element={<EditarLivro />} />
                                <Route path="/emprestimos" element={<Emprestimos />} />
                                <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} />
                                <Route path="/emprestimos/editar/:id" element={<EditarEmprestimo />} />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="/quizz" element={<Quiz />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </AuthContext.Provider>
            </ThemeContext.Provider>
            <Toaster />  {/* Faz a biblioteca hot-toast funcionar em todas as paginas*/}


        </>);
}