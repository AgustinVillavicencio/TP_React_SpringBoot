import React, { useState, useEffect, ChangeEvent } from 'react';
import Instrumento from "../Entities/Instrumento";
import Categoria from "../Entities/Categoria";
import { deleteInstrumento, getAll, getAllCategorias } from '../Functions/FunctionsApi';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';

interface Props {}

const Grilla: React.FC<Props> = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [filtroCategoria, setFiltroCategoria] = useState<string>("");

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const instrumentosData = await getAll();
                setInstrumentos(instrumentosData);
                
                const categoriasData = await getAllCategorias();
                setCategorias(categoriasData);

            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };
    
        cargarDatos();
    }, []);
    
    const handleDelete = async (id: number) => {
        try {
            const confirmDelete = window.confirm("Desea eliminar el instrumento?");
            if (confirmDelete) {
                await deleteInstrumento(id);
                setInstrumentos(instrumentos.filter(instrumento => instrumento.id !== id));
            }
        } catch (error) {
            console.error('Error al eliminar el instrumento:', error);
        }
    };

    const navigate = useNavigate();

    const handleModificar = (id: number) => {
        navigate(`/formulario/${id}`);
    };

    const handleCategoriaChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFiltroCategoria(event.target.value);
    };

    return (
        <>
            <NavBar />
            <Container className="mt-4">
                <Row className="mb-4">
                    <Col>
                        <Button className='btn btn-primary' onClick={() => handleModificar(0)}>Nuevo</Button>
                    </Col>
                </Row>
                <Row className="mb-4 justify-content-center">
                    <Col md={3}>
                        <Form.Group controlId="categoria">
                            <Form.Label>Selecciona una categoría:</Form.Label>
                            <Form.Control as="select" onChange={handleCategoriaChange} value={filtroCategoria}>
                                <option value="">Todas</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.denominacion} value={categoria.denominacion}>{categoria.denominacion}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Table striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                    <th><b>ID</b></th>
                                    <th><b>Instrumento</b></th>
                                    <th><b>Categoría</b></th>
                                    <th><b>Precio</b></th>
                                    <th><b>Modificar</b></th>
                                    <th><b>Eliminar</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {instrumentos.filter(instrumento => !filtroCategoria || instrumento.id_categoria?.denominacion === filtroCategoria).map(instrumento => (
                                    <tr key={instrumento.id}>
                                        <td>{instrumento.id}</td>
                                        <td>{instrumento.instrumento}</td>
                                        <td>{instrumento.id_categoria?.denominacion}</td>
                                        <td>{instrumento.precio}</td>
                                        <td><Button className='btn btn-success' onClick={() => handleModificar(instrumento.id)}>Modificar</Button></td>
                                        <td><Button className='btn btn-danger' onClick={() => handleDelete(instrumento.id)}>Eliminar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Grilla;
