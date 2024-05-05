import { useEffect, useState } from 'react'
import Instrumento from '../Entities/Instrumento';
import { getInstrumentoById } from '../Functions/FunctionsApi';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import InfoDetails from './InfoDetails';

// Definición del componente funcional InstrumentoDetails
function InstrumentoDetails() {
  // Obtiene el parámetro 'id' de la URL utilizando el hook useParams
  const { id } = useParams();

  // Estado local para almacenar la información del instrumento
  const [instrumento, setInstrumento] = useState<Instrumento>();

  // Llama a la función mostrar para obtener y establecer la información del instrumento
  const mostrar = async () => {
    // Llama a la función getInstrumentoById para obtener el instrumento por su ID
    const result: Instrumento = await getInstrumentoById(Number(id));
    // Establece el estado del instrumento con la información obtenida
    setInstrumento(result);
  }

  // Hook useEffect que se ejecuta después de que el componente se monta
  // Llama a la función mostrar para cargar la información del instrumento
  useEffect(() => {
    mostrar();
  }, []);

  return (
    <>
      {/* Renderiza el componente NavBar */}
      <NavBar />

      {/* Contenedor principal para mostrar los detalles del instrumento */}
      <div className='detalleContainer'>
        <div className='mainDetalle'>
          {/* Renderiza la imagen del instrumento */}
          {instrumento && (
            <img
              width={240}
              height={240}
              src={
                instrumento.imagen.startsWith('http') // Verifica si la URL comienza con "http"
                  ? instrumento.imagen // Si es así, muestra la URL completa
                  : `/assets/img/${instrumento.imagen}` // De lo contrario, usa la ruta relativa
              }
              alt={String(instrumento.id)}
            />
          )}
          <div className='titleInformacion'>
            {/* Renderiza la descripción del instrumento */}
            <p>Descripción:</p>
            <p>{instrumento?.descripcion}</p>
          </div>
        </div>

        {/* Renderiza el componente InfoDetails solo si el instrumento existe */}
        {instrumento && <InfoDetails instrumento={instrumento} />}
      </div>
    </>
  );
}

// Exporta el componente InstrumentoDetails como el componente predeterminado
export default InstrumentoDetails;
