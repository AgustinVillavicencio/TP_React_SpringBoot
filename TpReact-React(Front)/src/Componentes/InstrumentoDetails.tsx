
import { useEffect, useState } from 'react'
import Instrumento from '../Entities/Intrumento';
import { getInstrumentoById } from '../Functions/FunctionsApi';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import InfoDetails from './InfoDetails';

function InstrumentoDetails(){
    const {id} = useParams()
    const [instrumento,setInstrumento] = useState<Instrumento>();
  const mostrar = async () =>{
    const result:Instrumento = await getInstrumentoById(Number(id));
    setInstrumento(result)
  }
  useEffect(()=>{
    mostrar();
  })
  
    return(
      <>
              <NavBar/>
        <div className='detalleContainer'>
            <div className='mainDetalle'>
                <img width={240} height={240} src={`../src/assets/img/${instrumento?.imagen}`} alt={String(instrumento?.id)} />
                <div className='titleInformacion'>
                  <p>Descripción:</p>
                  <p>{instrumento?.descripcion}</p>
                </div>
            </div>
            {
              // En este codigo le decimos que renderice el componente solo si instrumento existe o no es nulo
              instrumento && <InfoDetails instrumento={instrumento} />
            }
        </div>
      </>
    )
}


export default InstrumentoDetails;