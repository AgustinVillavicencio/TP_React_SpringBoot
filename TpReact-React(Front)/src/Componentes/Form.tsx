import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Instrumento from "../Entities/Intrumento";
import Categoria from "../Entities/Categoria";
import { getInstrumentoById , getAllCategorias, createInstrumento } from '../Functions/FunctionsApi'; // Asumiendo que tienes una función para obtener un instrumento por su ID
import NavBar from './NavBar';

interface Props {}

const Form: React.FC<Props> = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Bandera de carga

    useEffect(() => {
        const cargarInstrumento = async () => {
            try {
                const instrumentoData = await getInstrumentoById(parseInt(String(id))); // Convertir el ID a número y obtener el instrumento correspondiente
                setInstrumento(instrumentoData);
            } catch (error) {
                console.error('Error al cargar el instrumento:', error);
            }
        };

        const cargarCategorias = async () => {
            try {
                const categoriasData = await getAllCategorias();
                setCategorias(categoriasData);
                setLoading(false); // Cuando se cargan las categorías, cambia la bandera de carga a false
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        if (id) {
            cargarInstrumento(); // Cargar el instrumento solo si hay un ID en la URL
            cargarCategorias(); // Cargar las categorías
        }
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setInstrumento(prevState => ({
            ...prevState!,
            [name]: value
        }));
    };

    
    if (loading || !instrumento) {
        return <div>Cargando...</div>; // Muestra un indicador de carga mientras se cargan los datos o si no hay instrumento
    }

    return(
        <>
        <NavBar />
        <div className='mt-4'>
            <form action="">
                <label htmlFor="instrumento">Instrumento: </label>
                <input type="text" name="instrumento" value={instrumento.instrumento} onChange={handleChange}/><br /><br />
                <label htmlFor="marca">Marca: </label>
                <input type="text" name="marca" value={instrumento.marca} onChange={handleChange}/><br /><br />
                <label htmlFor="modelo">Modelo: </label>
                <input type="text" name="modelo" value={instrumento.modelo} onChange={handleChange}/><br /><br />
                <label htmlFor="precio">Precio: </label>
                <input type="text" name="precio" value={instrumento.precio} onChange={handleChange}/><br /><br />
                <label htmlFor="costo-de-envio">Costo de envio: </label>
                <input type="text" name="costo_envio" value={instrumento.costo_envio} onChange={handleChange}/><br /><br />
                <label htmlFor="cantidad-vendida">Cantidad vendida: </label>
                <input type="text" name="cantidad_vendida" value={instrumento.cantidad_vendida} onChange={handleChange}/><br /><br />
                <label htmlFor="descripcion">Descripcion: </label>
                <textarea name="descripcion" id="descripcion" cols={90} rows={3} value={instrumento.descripcion} onChange={handleChange}></textarea><br /><br />
                <select name="id_categoria" id="categoria" value={instrumento.id_categoria.id} onChange={handleChange}>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                    ))}
                </select><br /><br />
                <button type='submit' className='btn btn-success'>Modificar</button>
            </form>
        </div>
        </>
    );
};

export default Form;
