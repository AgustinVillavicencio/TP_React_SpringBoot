import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom'; // Importa useHistory
import Instrumento from "../Entities/Instrumento";
import Categoria from "../Entities/Categoria";
import { getInstrumentoById , getAllCategorias, updateInstrumento, createInstrumento } from '../Functions/FunctionsApi'; // Asumiendo que tienes una función para obtener un instrumento por su ID
import NavBar from './NavBar';

interface Props {}

const Form: React.FC<Props> = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Bandera de carga
    const navigate = useNavigate();
    const [imagenURL, setImagenURL] = useState<string | null>(null);

    

    useEffect(() => {
        const cargarInstrumento = async () => {
            try {
                if (id !== "0") { // Verifica si el ID no es 0
                    const instrumentoData = await getInstrumentoById(parseInt(String(id))); // Convertir el ID a número y obtener el instrumento correspondiente
                    setInstrumento(instrumentoData);
                    console.log('Instrumento cargado:', instrumentoData);
                } else {
                    setInstrumento({
                        id:0,
                        instrumento: '',
                        marca: '',
                        modelo: '',
                        imagen:'',
                        precio: 0,
                        costoEnvio: '',
                        cantidadVendida: '',
                        descripcion: '',
                        categoria: new Categoria
                    });
                    setLoading(false); // Cuando se establece el instrumento vacío, cambia la bandera de carga a false
                }
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
    
        // Cast explícito para asegurarnos de que event.target sea tratado como un HTMLInputElement
        const inputElement = event.target as HTMLInputElement;
    
        // Comprobamos si el input es de tipo "file" y si tiene archivos seleccionados
        if (inputElement.type === "file" && inputElement.files && inputElement.files.length > 0) {
            const file = inputElement.files[0];
    
            // Creamos un FileReader para leer el contenido del archivo
            const reader = new FileReader();
            reader.onload = function(e) {
                // Cuando se complete la lectura, actualizamos el estado del instrumento con la URL de la imagen
                setInstrumento(prevState => ({
                    ...prevState!,
                    imagen: e.target!.result as string
                }));
                // También actualizamos el estado de la imagenURL con la URL de la imagen
                setImagenURL(e.target!.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // Si no es un input de tipo "file", o no tiene archivos seleccionados, actualizamos el estado del instrumento como antes
            if (name === "id_categoria") {
                const selectedCategoria = categorias.find(categoria => categoria.id === parseInt(value));
                if (selectedCategoria) {
                    setInstrumento(prevState => {
                        const updatedInstrumento = {
                            ...prevState!,
                            categoria: selectedCategoria
                        };
                        console.log(updatedInstrumento);
                        return updatedInstrumento;
                    });
                }
            } else {
                setInstrumento(prevState => {
                    const updatedInstrumento = {
                        ...prevState!,
                        [name]: value
                    };
                    console.log(updatedInstrumento);
                    return updatedInstrumento;
                });
            }
        }
    };
    



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
        if (instrumento) { // Verifica si instrumento no es null
            try {
                console.log('Enviando instrumento:', instrumento);
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
                console.log(error);
            }
        } else {
            console.error('El instrumento es null.');
            // Aquí podrías manejar el caso en el que instrumento sea null
        }
    };
    
    const handleSubmitCrear = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (instrumento) {
            try {
                console.log('Creando instrumento:', instrumento);
                const success = await createInstrumento(instrumento);
                if (success) {
                    console.log('¡Instrumento creado correctamente!');
                    alert("Instrumento creado con éxito!");
                    navigate("/grilla");
                } else {
                    console.error('Error al crear el instrumento.');
                }
            } catch (error) {
                console.error('Error al crear el instrumento:', error);
            }
        } else {
            console.error('El instrumento es null.');
        }
    };
    
    

    
    if (loading || !instrumento) {
        return <div>Cargando...</div>; // Muestra un indicador de carga mientras se cargan los datos o si no hay instrumento
    }

    return(
        <>
        <NavBar />
        <div className='mt-4'>
        <form onSubmit={instrumento.id === 0 ? handleSubmitCrear : handleSubmit}>
                <label htmlFor="instrumento">Instrumento: </label>
                <input type="text" name="instrumento" value={instrumento.instrumento} onChange={handleChange}/><br /><br />
                <label htmlFor="marca">Marca: </label>
                <input type="text" name="marca" value={instrumento.marca} onChange={handleChange}/><br /><br />
                <label htmlFor="modelo">Modelo: </label>
                <input type="text" name="modelo" value={instrumento.modelo} onChange={handleChange}/><br /><br />
                <label htmlFor="precio">Precio: </label>
                <input type="text" name="precio" value={instrumento.precio} onChange={handleChange}/><br /><br />
                <label htmlFor="imagen">Imagen: </label><br />
                <input type="text" name="imagen" onChange={handleChange} value={instrumento.imagen}/><br /><br />
                <label htmlFor="costo-de-envio">Costo de envio: </label>
                <input type="text" name="costo_envio" value={instrumento.costoEnvio} onChange={handleChange}/><br /><br />
                <label htmlFor="cantidad-vendida">Cantidad vendida: </label>
                <input type="text" name="cantidad_vendida" value={instrumento.cantidadVendida} onChange={handleChange}/><br /><br />
                <label htmlFor="descripcion">Descripcion: </label>
                <textarea name="descripcion" id="descripcion" cols={90} rows={3} value={instrumento.descripcion} onChange={handleChange}></textarea><br /><br />
                <select name="id_categoria" id="categoria" value={instrumento.categoria ? instrumento.categoria.id : ''} onChange={handleChange}>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                    ))}
                </select><br /><br />
                {instrumento.id === 0 ? (
                    <button type='submit' className='btn btn-primary'>Crear</button>
                ) : (
                    <button type='submit' className='btn btn-success'>Modificar</button>
                )}
            </form>
        </div>
        </>
    );
};

export default Form;
