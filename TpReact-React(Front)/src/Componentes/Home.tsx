import NavBar from "./NavBar";
import { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getAll } from "../Functions/FunctionsApi";
import Instrumento from "../Entities/Intrumento";

// Definición del componente funcional Home
const Home = () => {
  // Estado local para el índice activo del carousel
  const [index, setIndex] = useState<number>(0);

  // Función para manejar la selección de elementos en el carousel
  const handleSelect = (selectedIndex: number) => {
      setIndex(selectedIndex);
  };

  // Estado local para almacenar la lista de instrumentos
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const mostrar = async () => {
      const result: Instrumento[] = await getAll();
      setInstrumentos(result.slice(0, 3));
    };
  
    useEffect(() => {
      mostrar();
    }, []); // <- Array vacío como segundo argumento para que se ejecute una vez al montar el componente
  
    return (
      <>
        <NavBar />
        <Carousel data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
          {instrumentos.map((instrumentos: Instrumento) => (
            <Carousel.Item key={instrumentos.id}>
              <img className="d-block w-100" src={`../src/assets/img/${instrumentos.imagen}`} alt="" />
              <Carousel.Caption>
                <h3>{instrumentos.instrumento}</h3>
                <p>{instrumentos.descripcion}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    );
  };
export default Home;