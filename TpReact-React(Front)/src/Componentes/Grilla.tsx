import React, { useState, useEffect } from 'react';
import Instrumento from "../Entities/Intrumento";
import Categoria from "../Entities/Categoria";
import { deleteInstrumento, getAll, getAllCategorias } from '../Functions/FunctionsApi';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

interface Props {
}

const Grilla: React.FC<Props> = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const cargarInstrumentos = async () => {
            try {
                const instrumentosData = await getAll();
                setInstrumentos(instrumentosData);
                cargarCategorias();
                 // Llamamos a cargarCategorias después de obtener los instrumentos
            } catch (error) {
                console.error('Error al cargar los instrumentos:', error);
            }
        };
    
        const cargarCategorias = async () => {
            try {
                const categoriasData = await getAllCategorias();
                setCategorias(categoriasData);

            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };
    
        cargarInstrumentos();
    }, []);
    

    const handleDelete = async (id: number) => {
        try {
            const confirmDelete=confirm("Desea eliminar el instumento?")
            if(confirmDelete){
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


    return (
        <>
            <NavBar />
            <button className='btn btn-primary mt-4' onClick={()=> handleModificar(0)}>Nuevo</button>
            <div className='mt-4'>
                <table>
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
                        {instrumentos.map(instrumento => (
                            <tr key={instrumento.id}>
                                <td className='px-2'>{instrumento.id}</td>
                                <td className='px-2'>{instrumento.instrumento}</td>
                                <td className='px-2'>{instrumento.id_categoria?.denominacion}</td>
                                <td className='px-2'>{instrumento.precio}</td>
                                <td className='px-2'><button className='btn btn-success' onClick={()=> handleModificar(instrumento.id)}>Modificar</button></td>
                                <td className='px-2'><button className='btn btn-danger' onClick={() => handleDelete(instrumento.id)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Grilla;
