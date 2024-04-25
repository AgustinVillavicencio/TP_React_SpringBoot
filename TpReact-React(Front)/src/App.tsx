import { useEffect, useState } from 'react'
import './App.css'
import Instrumento from './Entities/Intrumento.ts'
import Card from './Componentes/Card.tsx'
import NavBar from './Componentes/NavBar.tsx'
import {getAll} from './Functions/FunctionsApi.ts'

function App() {
  const [instrumentos,setInstrumentos] = useState<Instrumento[]>([]);
  const mostrar = async () =>{
    const result:Instrumento[] = await getAll();
    setInstrumentos(result)
  }
  useEffect(()=>{
    mostrar();
  },([]))

  return (
    <>
    <NavBar />
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

export default App
