import { useEffect, useState } from 'react'
import './App.css'
import Instrumento from './Entities/Instrumento.ts'
import Card from './Componentes/Card.tsx'
import NavBar from './Componentes/NavBar.tsx'
import {getAll} from './Functions/FunctionsApi.ts'

function App() {
  // Estado local para almacenar los instrumentos obtenidos de la API
  const [instrumentos,setInstrumentos] = useState<Instrumento[]>([]);
  // Función asíncrona para obtener todos los instrumentos desde la API
  const mostrar = async () => {
    // Llamada a la función getAll que devuelve una lista de instrumentos
    const result:Instrumento[] = await getAll();
    // Actualización del estado instrumentos con la lista obtenida de la API
    setInstrumentos(result);
  }

  // Hook useEffect que se ejecuta después de que el componente se monta
  // Llama a la función mostrar para cargar los instrumentos desde la API
  useEffect(()=>{
    mostrar();
  },([]))

  // Renderizado del componente NavBar
  return (
    <>
    <NavBar />

    {/* Mapeo de la lista de instrumentos y renderizado de un componente Card para cada instrumento */}
    {
      instrumentos.map((instrumento:Instrumento) => {
        return(
          <Card info={instrumento} key={instrumento.id} />
        )
      })
    }
    </>
  )
}

// Exportación del componente App como el componente predeterminado de la aplicación
export default App
