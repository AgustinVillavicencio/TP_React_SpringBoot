import Instrumento from "../Entities/Instrumento";

// Definición de la interfaz Props que describe las propiedades esperadas para el componente InfoDetails
interface Props {
  instrumento: Instrumento;  // Instrumento recibido como propiedad
}

// Definición del componente funcional InfoDetails que recibe las propiedades definidas en la interfaz Props
const InfoDetails: React.FC<Props> = (props: Props) => {
  // Lógica para determinar el mensaje de costo de envío
  const infoCostoEnvio = props.instrumento?.costo_envio != 'G' && props.instrumento?.costo_envio != '0'
      ? "Costo de Envio interior Argentina: " + props.instrumento?.costo_envio
      : "Envío gratis a todo el país";

  // Determina la clase CSS según el tipo de costo de envío
  const costoClassName = props.instrumento?.costo_envio != 'G' && props.instrumento?.costo_envio != '0'
      ? 'CostoInterior mt-4'
      : 'CostoGratis mt-4 ';

  // Renderiza el componente InfoDetails
  return (
      <div className='infoDetalle'>
          {/* Muestra la cantidad vendida */}
          <p>{props.instrumento?.cantidad_vendida} vendidos</p>
          {/* Muestra el nombre del instrumento */}
          <h1 className='titleInformacion'>{props.instrumento?.instrumento}</h1>
          {/* Muestra el precio del instrumento */}
          <p>$ {props.instrumento?.precio}</p>
          {/* Muestra la marca del instrumento */}
          <p>Marca: {props.instrumento?.marca}</p>
          {/* Muestra el modelo del instrumento */}
          <p>Modelo: {props.instrumento?.modelo}</p>
          {/* Muestra el costo de envío y la imagen del camión si corresponde */}
          <p className={costoClassName}>
              {props.instrumento?.costo_envio == 'G' || props.instrumento?.costo_envio == '0' ? (<img src="../src/assets/img/camion.png" alt="camion" />) : ''}
              {infoCostoEnvio}
          </p>
      </div>
  )
}

// Exporta el componente InfoDetails como el componente predeterminado
export default InfoDetails;