import Instrumento from "../Entities/Instrumento";
import "../Estilos/InfoDetalle.css"

// Definición de la interfaz Props que describe las propiedades esperadas para el componente InfoDetails
interface Props {
  instrumento?: Instrumento;  // Instrumento recibido como propiedad
}

// Definición del componente funcional InfoDetails que recibe las propiedades definidas en la interfaz Props
const InfoDetails: React.FC<Props> = (props: Props) => {
  // Lógica para determinar el mensaje de costo de envío
  const infoCostoEnvio = props.instrumento?.costoEnvio != 'G' && props.instrumento?.costoEnvio != '0'
      ? "Costo de Envio interior Argentina: $" + props.instrumento?.costoEnvio
      : "Envío gratis a todo el país";

  // Determina la clase CSS según el tipo de costo de envío
  const costoClassName = props.instrumento?.costoEnvio != 'G' && props.instrumento?.costoEnvio != '0'
      ? 'CostoInterior mt-4'
      : 'CostoGratis mt-4 ';

  // Renderiza el componente InfoDetails
  return (
      <div className='infoDetalle'>
          {/* Muestra la cantidad vendida */}
          <p>{props.instrumento?.cantidadVendida} vendidos</p>
          {/* Muestra el nombre del instrumento */}
          <h1 className='titleInformacion'>{props.instrumento?.instrumento}</h1>
          {/* Muestra el precio del instrumento */}
          <p className='text-start'>{props.instrumento?.descripcion}</p>
          <p className='text-start'><b>Precio:</b> $ {props.instrumento?.precio}</p>
          {/* Muestra la marca del instrumento */}
          <p className='text-start'><b>Marca:</b> {props.instrumento?.marca}</p>
          {/* Muestra el modelo del instrumento */}
          <p className='text-start'><b>Modelo:</b> {props.instrumento?.modelo}</p>
          {/* Muestra el costo de envío y la imagen del camión si corresponde */}
          <p className={`text-start ${costoClassName}`}>
              {props.instrumento?.costoEnvio == 'G' || props.instrumento?.costoEnvio == '0' ? (<img src="../src/assets/img/camion.png" alt="camion" />) : ''}
              {infoCostoEnvio}
          </p>
      </div>
  )
}

// Exporta el componente InfoDetails como el componente predeterminado
export default InfoDetails;