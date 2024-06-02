import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Usuario from '../Entities/Usuario';
import { Roles } from '../Entities/Roles';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate();

    const cerrarSesion = async () => {
        localStorage.setItem('usuario', "");
        localStorage.removeItem('usuario');
        navigate('/login', {
                replace: true,
                state: {
                    logged: false
                },
		    });
    }

    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    //console.log("JSON " + jsonUsuario);
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;
    return (
        // Utiliza un contenedor fluido para que el NavBar ocupe todo el ancho de la pantalla
        <Navbar bg="dark" variant="dark" expand="lg" className="w-100 fixed-top mb">
            <Container fluid>
                {/* Contenido del Navbar */}
                <Navbar.Brand href="/">Instrumentos</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    {/* Utiliza la clase "ms-auto" para alinear los elementos a la derecha */}
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/dondeEstamos">Donde estamos</Nav.Link>
                        <Nav.Link href="/instrumentos">Instrumentos</Nav.Link>
                        {usuarioLogueado?.rol === Roles.ADMIN && <Nav.Link href="/grilla">Grilla</Nav.Link>}
                        {usuarioLogueado?.rol === Roles.ADMIN && <Nav.Link href="/charts">Charts</Nav.Link>}
                        <Nav.Item className='d-flex align-items-center bg-warning'>
                            <span className="navbar-user-info mx-3">
                            {usuarioLogueado
                                    ? `Usuario: ${usuarioLogueado.rol === Roles.ADMIN ? "Admin" : "Común"}`
                                    : "Usuario: No logueado"}
                            </span>
                        </Nav.Item>
                        <Nav.Item className=''>
                            <button onClick={cerrarSesion} className="btn btn-success ms-2" type="button">
                                Cerrar Sesión
                            </button>                 </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
