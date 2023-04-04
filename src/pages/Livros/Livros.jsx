import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";

export function Livros() {

    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;

    const [livros, setLivros] = useState(null);

    useEffect(() => {
        getLivros().then(busca => {
            setLivros(busca) 
        })
    }, []);

    function onDeleteLivro(id, titulo){
        //o "window." não é obrigatório, funciona do mesmo modo com ele ou sem ele
        const deletar = window.confirm(`Tem certeza que deseja excluir o livro ${titulo}?`)
        if(deletar) {
            deleteLivro(id).then(() => {
                toast.success(`${titulo} apagado com sucesso!`, {duration: 2000, position:"bottom-rigth"});
                getLivros().then(busca => {
                    setLivros(busca)
                })
            })
        }
    } // essa função faz deletar o livro

    return (
        <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
        <div className="livros">
            <Breadcrumb />
            <Container className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Livros</h1>
                    <Button as={Link} to="/livros/adicionar" variant="success">
                        Adicionar Livro
                    </Button>
                </div>
                <hr />
                {livros === null ?
                    <Loader />
                    : 
                    <Table className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Categoria</th>
                                <th>ISBN</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map(livro => {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.autor}</td>
                                        <td>{livro.categoria}</td>
                                        <td>{livro.isbn}</td>
                                        <td>
                                            <img src={livro.urlCapa} alt={livro.titulo} />
                                        </td>
                                        <td>
                                            <Button 
                                                as={Link} 
                                                to={`/livros/editar/${livro.id} `}
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                <i className="bi bi-pencil-fill"></i> {/*icone editar*/}
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => onDeleteLivro(livro.id, livro.titulo)}> {/*criar uma arrow devido a necessidade de passar o parametro livro.id e livro.titulo*/}
                                                <i className="bi bi-trash3-fill"></i> {/*icone remover */}
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                }
            </Container>
        </div>
        </div>
    )
}