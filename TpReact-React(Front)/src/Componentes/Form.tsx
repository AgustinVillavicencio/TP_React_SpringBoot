import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom'; // Importa useHistory
import Instrumento from "../Entities/Intrumento";
import Categoria from "../Entities/Categoria";
import { getInstrumentoById , getAllCategorias, updateInstrumento } from '../Functions/FunctionsApi'; // Asumiendo que tienes una función para obtener un instrumento por su ID
import NavBar from './NavBar';

interface Props {}

const Form: React.FC<Props> = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Bandera de carga
    const navigate = useNavigate();

    

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

    // Dentro del componente Form

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "id_categoria") {
        // Si estás actualizando la categoría, busca la categoría correspondiente en el estado de categorías y actualiza el estado del instrumento
        const selectedCategoria = categorias.find(categoria => categoria.id === parseInt(value));
        if (selectedCategoria) {
            setInstrumento(prevState => ({
                ...prevState!,
                id_categoria: selectedCategoria // Actualiza la categoría seleccionada
            }));
        }
    } else {
        // Para otros campos, simplemente actualiza el estado del instrumento
        setInstrumento(prevState => ({
            ...prevState!,
            [name]: value
        }));
    }
};



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
        if (instrumento) { // Verifica si instrumento no es null
            try {
    
                const success = await updateInstrumento(instrumento); // Llama a la función para actualizar el instrumento
                if (success) {
                    console.log('¡Instrumento actualizado correctamente!');
                    console.log('JSON enviado:', JSON.stringify(instrumento)); // Imprime el JSON enviado
                    alert("Instrumento modificado con exito!")
                    navigate("/grilla");
                } else {
                    console.error('Error al actualizar el instrumento.');
                    // Aquí podrías mostrar un mensaje de error al usuario
                }
            } catch (error) {
                console.error('Error al actualizar el instrumento:', error);
                // Aquí podrías manejar cualquier error que ocurra durante la actualización del instrumento
            }
        } else {
            console.error('El instrumento es null.');
            // Aquí podrías manejar el caso en el que instrumento sea null
        }
    };
    
    
    
    

    
    if (loading || !instrumento) {
        return <div>Cargando...</div>; // Muestra un indicador de carga mientras se cargan los datos o si no hay instrumento
    }

    return(
        <>
        <NavBar />
        <div className='mt-4'>
            <form onSubmit={handleSubmit}>
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
                <select name="id_categoria" id="categoria" value={instrumento.id_categoria ? instrumento.id_categoria.id : ''} onChange={handleChange}>
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
