import { useEffect, useState } from 'react';
import Instrumento from '../Entities/Instrumento';
import { createPDFInstrumento, getInstrumentoById } from '../Functions/FunctionsApi';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import InfoDetails from './InfoDetails';
import { Col, Row, Container, Button } from 'react-bootstrap';

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
  };

  // Hook useEffect que se ejecuta después de que el componente se monta
  // Llama a la función mostrar para cargar la información del instrumento
  useEffect(() => {
    mostrar();
  }, []);

  return (
    <>
      {/* Renderiza el componente NavBar */}
      <NavBar />
      <Container className="infoGeneral d-flex align-items-center ">
        <Row>
          <Col md={5} className="d-flex justify-content-center">
            {instrumento && (
              <img
                width={400}
                height={400}
                className="img-fluid"
                src={
                  instrumento.imagen.startsWith('http') // Verifica si la URL comienza con "http"
                    ? instrumento.imagen // Si es así, muestra la URL completa
                    : `../src/assets/img/${instrumento.imagen}` // De lo contrario, usa la ruta relativa
                }
                alt={String(instrumento.id)}
              />
            )}
          </Col>
          <Col md={7} className="">
            <InfoDetails instrumento={instrumento} />
          </Col>
        </Row>
      </Container>
      <Button 
          className="mt-4"
          onClick={() => createPDFInstrumento(Number(id))} 
      >
        Descargar PDF
      </Button>
    </>
  );
}


export default InstrumentoDetails;
