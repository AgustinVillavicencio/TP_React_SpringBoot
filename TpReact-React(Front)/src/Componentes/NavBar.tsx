import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        // Utiliza un contenedor fluido para que el NavBar ocupe todo el ancho de la pantalla
        <Container fluid>
            {/* Navbar de Bootstrap */}
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" style={{ width: '100%' }}>
                <Container>
                    {/* Contenido del Navbar */}
                    <Navbar.Brand href="/">Instrumentos</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        {/* Utiliza la clase "ms-auto" para alinear los elementos a la derecha */}
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/dondeEstamos">Donde estamos</Nav.Link>
                            <Nav.Link href="/instrumentos">Instrumentos</Nav.Link>
                            <Nav.Link href="/grilla">Grilla</Nav.Link>
                            <Nav.Link href="/filtro">Filtro</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
}

export default NavBar;
