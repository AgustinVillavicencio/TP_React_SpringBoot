import React, { useState, useEffect, ChangeEvent } from 'react';
import Instrumento from "../Entities/Instrumento";
import Categoria from "../Entities/Categoria";
import { createExcelInstrumentos,  createExcelPedidos,  deleteInstrumento, getAllCategorias, getAllIncludeEliminado, restoreInstrumento } from '../Functions/FunctionsApi';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form, Modal, FormControl } from 'react-bootstrap';

interface Props {}

const Grilla: React.FC<Props> = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [filtroCategoria, setFiltroCategoria] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fechaDesde, setFechaDesde] = useState<string | undefined>(undefined);
    const [fechaHasta, setFechaHasta] = useState<string | undefined>(undefined);
    const [todosPedidos, setTodosPedidos] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const instrumentosData = await getAllIncludeEliminado();
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
                alert("Instrumento eliminado con exito!")
            }
            window.location.reload()
        } catch (error) {
            console.error('Error al eliminar el instrumento:', error);
        }
    };

    

    const handleModificar = (id: number) => {
        navigate(`/formulario/${id}`);
    };

    const handleCategoriaChange = (event: ChangeEvent<any>) => {
        const target = event.target as HTMLSelectElement;
        setFiltroCategoria(target.value);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDownloadExcelPedidos = () => {
        if (fechaDesde && fechaHasta) {
            const fechaDesdeDate = new Date(fechaDesde);
            const fechaHastaDate = new Date(fechaHasta);
    
            // Formatear las fechas en el formato esperado yyyy-MM-dd
            const formattedFechaDesde = formatDate(fechaDesdeDate);
            const formattedFechaHasta = formatDate(fechaHastaDate);
            
            createExcelPedidos(formattedFechaDesde, formattedFechaHasta)
        } else {
            alert('Por favor, seleccione ambas fechas.');
        }
        handleCloseModal(); // Cerrar el modal después de descargar el Excel
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // Función para manejar el cambio de fechaDesde
    const handleFechaDesdeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value; // Obtener el valor de entrada
        setFechaDesde(value); // Establecer directamente el valor en el estado
    };

    // Función para manejar el cambio de fechaHasta
    const handleFechaHastaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value; // Obtener el valor de entrada
        setFechaHasta(value); // Establecer directamente el valor en el estado
    };

     // Función para manejar el cambio del checkbox
     const handleTodosPedidosChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodosPedidos(event.target.checked);
        if (event.target.checked) {
            setFechaDesde("2024-01-01");
            setFechaHasta("2025-01-01");
        } else {
            setFechaDesde(undefined);
            setFechaHasta(undefined);
        }
    };

    const handleRestore = async (id: number) => {
        try {
            const confirmRestore = window.confirm("¿Desea reestablecer el instrumento?");
            if (confirmRestore) {
                // Llamar a la función para restaurar el instrumento y esperar su respuesta
                await restoreInstrumento(id);
                alert("Restauracion exitosa!");
                window.location.reload();
            }
        } catch (error) {
            // Mostrar el mensaje de error al usuario
            alert(`Error al reestablecer el instrumento`);
            console.error('Error al reestablecer el instrumento:', error);
        }
    };

    return (
        <>
            <NavBar />
            <Container className="mt-4">
                <Row className="mb-4">
                    <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0"> 
                        <Button className="btn btn-info" onClick={() => createExcelInstrumentos()}>Excel Grilla</Button>
                    </Col>
                    <Col xs={12} md={10} className="text-md-end mt-3 mt-md-0"> 
                        <Button className="btn btn-info" onClick={handleShowModal}>Excel Pedidos</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} className="text-center"> 
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
                            {instrumentos.filter(instrumento => !filtroCategoria || instrumento.categoria?.denominacion === filtroCategoria).map(instrumento => (
                                <tr key={instrumento.id}>
                                    <td>{instrumento.id}</td>
                                    <td>{instrumento.instrumento}</td>
                                    <td>{instrumento.categoria?.denominacion}</td>
                                    <td>{instrumento.precio}</td>
                                    {instrumento.eliminado ? (
                                        // Si el instrumento está eliminado, mostrar un botón para reestablecer
                                        <td colSpan={2}>
                                            <Button className='btn btn-warning' onClick={() => handleRestore(instrumento.id)}>Reestablecer</Button>
                                        </td>
                                    ) : (
                                        // Si el instrumento no está eliminado, mostrar botones para modificar y eliminar
                                        <>
                                            <td><Button className='btn btn-success' onClick={() => handleModificar(instrumento.id)}>Modificar</Button></td>
                                            <td><Button className='btn btn-danger' onClick={() => handleDelete(instrumento.id)}>Eliminar</Button></td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            {/* Modal para seleccionar fechas */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar rango de fechas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="fechaDesde">
                        <Form.Label>Desde:</Form.Label>
                        <FormControl type="date" value={fechaDesde || ''} onChange={handleFechaDesdeChange}/>
                    </Form.Group>
                    <Form.Group controlId="fechaHasta">
                        <Form.Label>Hasta:</Form.Label>
                        <FormControl type="date" value={fechaHasta || ''} onChange={handleFechaHastaChange}/>
                    </Form.Group>
                    <Form.Group controlId="todosPedidos">
                        <Form.Check type="checkbox" label="Todos los pedidos" checked={todosPedidos} onChange={handleTodosPedidosChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="primary" onClick={handleDownloadExcelPedidos}>Descargar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Grilla;
