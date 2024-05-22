import NavBar from "./NavBar";
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getAll } from "../Functions/FunctionsApi";
import Instrumento from "../Entities/Instrumento";
import '../index.css'; // Asegúrate de importar el archivo CSS

const Home = () => {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const mostrar = async () => {
    const result: Instrumento[] = await getAll();
    setInstrumentos(result.slice(0, 3));
  };

  useEffect(() => {
    mostrar();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Carousel data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
          {instrumentos.map((instrumento: Instrumento) => (
            <Carousel.Item key={instrumento.id}>
              <img className="d-block w-100" src={`../src/assets/img/${instrumento.imagen}`} alt={instrumento.instrumento} />
              <Carousel.Caption>
                <h3>{instrumento.instrumento}</h3>
                <p>{instrumento.descripcion}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
