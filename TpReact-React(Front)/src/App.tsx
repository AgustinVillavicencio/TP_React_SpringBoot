import { useEffect, useState } from 'react';
import './App.css';
import Instrumento from './Entities/Instrumento.ts';
import Card from './Componentes/Card.tsx';
import NavBar from './Componentes/NavBar.tsx';
import { getAll } from './Functions/FunctionsApi.ts';
//import Carrito from './Componentes/Carrito.tsx'
import { CarritoContextProvider } from './Context/CarritoContext.tsx';

function App() {
  // Estado local para almacenar los instrumentos obtenidos de la API
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  // Función asíncrona para obtener todos los instrumentos desde la API
  const mostrar = async () => {
    // Llamada a la función getAll que devuelve una lista de instrumentos
    const result: Instrumento[] = await getAll();
    // Actualización del estado instrumentos con la lista obtenida de la API
    setInstrumentos(result);
  };

  // Hook useEffect que se ejecuta después de que el componente se monta
  // Llama a la función mostrar para cargar los instrumentos desde la API
  useEffect(() => {
    mostrar();
  }, []);

  // Renderizado del componente NavBar
  return (
    <>
    <CarritoContextProvider>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {instrumentos.map((instrumento: Instrumento) => (
              <Card info={instrumento} key={instrumento.id} />
            ))}
          </div>
          <div className="col-md-4">
            <h2>Carrito Compras</h2>
            {/*<Carrito />*/}
          </div>
        </div>
      </div>
      </CarritoContextProvider>
    </>
  );
}

// Exportación del componente App como el componente predeterminado de la aplicación
export default App;
