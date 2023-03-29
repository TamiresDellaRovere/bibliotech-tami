import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { adicionarEmprestimo } from "../../firebase/emprestimos";
import { getLivro, getLivros } from "../../firebase/livros";

export function AdicionarEmprestimo() {

    const [livros, setLivros] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {

        getLivro(data.idLivro).then(livro => {
            
            delete data.idLivro; //vai deletar o id do livro antes de salvar

            let novoEmprestimo = { ...data, status: "Pendente", livro, dataEmprestimo: new Date() } // o spread "...data" chama os dados do data e adiciona junto o status de pendente;
            adicionarEmprestimo(novoEmprestimo).then(() => {
                toast.success(
                    "Empréstimo registrado com sucesso!", 
                    { duration: 2000, position: "bottom-right" })
            })
        });
    } // adiciona os dados do emprestimo no banco dados do Firebase emprestimos;

    useEffect(() => {

        getLivros().then(busca => {
            setLivros(busca);
        })
    }, []) // essa função traz os livros para esse estágio e podemos utilizar nas funções

    return (
        <div className="adicionar-emprestimo">
            <Container>
                <h1>Adicionar empréstimo</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Leitor: </Form.Label>
                        <Form.Control type="text" className={errors.leitor && "is-invalid"} {...register("leitor", { required: "Leitor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.leitor?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail: </Form.Label>
                        <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "E-mail é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone: </Form.Label>
                        <Form.Control type="tel" className={errors.telefone && "is-invalid"} {...register("telefone", { required: "Telefone é obrigatório!", maxLength: { value: 255, message: "Limite de 15 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.telefone?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Livro: </Form.Label>
                        <Form.Select className={errors.idLivro && "is-invalid"} {...register("idLivro", { required: "Livro é obrigatório!" })}>
                            {livros.map(livro => <option key={livro.id} value={livro.id}>{livro.titulo}</option>)} {/*Pra cada livro traz uma opção de seleção*/}
                        </Form.Select>
                        <Form.Text className="invalid-feedback">
                            {errors.idLivro?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button className="mb-3" type="submit" variant="success">Emprestar</Button>
                </Form>
            </Container>
        </div>
    );
}