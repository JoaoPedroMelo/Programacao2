import { Container } from "react-bootstrap";
import Menu from "./Menu";

export default function Pagina(props) {
    console.log("Página renderizada"); 
    return (
        <Container>
            <Menu />
            {props.children}
        </Container>
    );
}
