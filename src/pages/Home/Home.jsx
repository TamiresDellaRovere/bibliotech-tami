import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";

export function Home (){
    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;

    return(
        
        <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
            <Breadcrumb />
            <div><h1>Home</h1></div>
        </div>
    );
}