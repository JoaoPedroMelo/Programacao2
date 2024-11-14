import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Menu(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Atualizado com Link para a página inicial */}
        <Navbar.Brand as={Link} to="/menu-inicial">Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/cadastro-veiculos">Veículos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/cadastro-fornecedor">Fornecedores</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/cadastro-produto">Produtos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
