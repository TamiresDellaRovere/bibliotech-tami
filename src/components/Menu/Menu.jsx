import "./Menu.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

export function Menu() {

    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;
    const alternar = resultado.alternar;

    let iconeBtn = "https://cdn-icons-png.flaticon.com/512/3073/3073665.png";
    if (temaEscuro) {
        iconeBtn = "https://cdn-icons-png.flaticon.com/512/581/581601.png";
    }

    const navigate = useNavigate();

    function onLogout() {
        logout().then(() => {
            navigate("/login");
        }); //quando deslogar vai voltar para a pagina login
    }
    return (
        <Navbar
            bg={temaEscuro ? "dark" : "success"}
            variant={temaEscuro ? "dark" : "ligth"}
            expand="sm"
        >
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logoIcon} width="32" alt="Logo" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/livros">
                            Livros
                        </Nav.Link>
                        <Nav.Link as={Link} to="/emprestimos">
                            Emprestimos
                        </Nav.Link>
                        <Nav.Link onClick={onLogout}>
                            <i className="bi bi-box-arrow-right"></i>
                        </Nav.Link>
                        <Button variant="outline-light" onClick={alternar}>
                            <img src={iconeBtn} width="16" />
                            Alternar
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}