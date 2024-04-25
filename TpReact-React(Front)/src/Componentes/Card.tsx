import Instrumento from '../Entities/Intrumento';
import NavBar from './NavBar';
import '../index.css'
  
  interface Props {
    info: Instrumento; 
    key: Number; 
  }

  const Card: React.FC<Props> = (props:Props) => {
    const infoCostoEnvio = props.info.costoEnvio !='G'
    ? "Costo de Envio interior Argentina: "+props.info.costoEnvio:"Envío gratis a todo el país";
    const costoClassName = props.info.costoEnvio !='G' && props.info.costoEnvio !='0'
    ? 'CostoInterior mt-4':'CostoGratis mt-4 ';
    const rutaImagen = "src/assets/img/"+props.info.imagen;
    return(
        <>
            
            <div className='cardContainer'>
                <div>
                    <img src={rutaImagen} />
                </div>
                <div className='cardBody'>
                    <h2 className='title'>{props.info.instrumento}</h2>
                    <p className='mt-4 price'>${props.info.precio}</p>
                    <p className={costoClassName}>
                        {
                            props.info.costoEnvio == 'G' || props.info.costoEnvio =='0'? (<img src="src/assets/img/camion.png" alt="camion" />):''
                        }
                        {infoCostoEnvio}
                    </p>
                    <p className='mt-4 sales'>{props.info.cantidadVendida} vendidos</p>
                </div>
                <a href={`instrumentos/${props.info.id}`}>
                    Detalle
                </a>
            </div>
        </>
    );
}

export default Card;