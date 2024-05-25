import Instrumento from '../Entities/Instrumento';
import '../index.css'
import { UseCarrito } from '../Context/UseCarrito';

// Definición de la interfaz Props que describe las propiedades esperadas para el componente Card
interface Props {
    info: Instrumento; // Instrumento recibido como propiedad
    key: Number; // Clave única de React para identificar el componente
}

// Definición del componente funcional Card que recibe las propiedades definidas en la interfaz Props
const Card: React.FC<Props> = (props: Props) => {
    // Lógica para determinar la ruta de la imagen
    const rutaImagen = props.info.imagen.startsWith('http') ? props.info.imagen : `../src/assets/img/${props.info.imagen}`;
    const {addCarrito,removeItemCarrito} = UseCarrito()
    // Lógica para determinar el mensaje de costo de envío
    const infoCostoEnvio = props.info.costoEnvio !== 'G' && props.info.costoEnvio !== '0'
        ? "Costo de Envio interior Argentina: " + props.info.costoEnvio
        : "Envío gratis a todo el país";

    // Determina la clase CSS según el tipo de costo de envío
    const costoClassName = props.info.costoEnvio !== 'G' && props.info.costoEnvio !== '0'
        ? 'CostoInterior mt-4'
        : 'CostoGratis mt-4 ';

    // Renderiza el componente Card
    return (
        <>
            {/* Contenedor principal del card */}
            <div className='cardContainer'>
                {/* Contenedor para la imagen del instrumento */}
                <div>
                    {/* Renderiza la imagen del instrumento */}
                    <img src={rutaImagen} alt={props.info.instrumento} style={{ width: "100px" }} />
                </div>
                {/* Contenedor para la información del instrumento */}
                <div className='cardBody'>
                    {/* Renderiza el título del instrumento */}
                    <h2 className='title'>{props.info.instrumento}</h2>
                    {/* Renderiza el precio del instrumento */}
                    <p className='mt-4 price'>${props.info.precio}</p>
                    {/* Renderiza el mensaje de costo de envío y la imagen del camión si corresponde */}
                    <p className={costoClassName}>
                        {props.info.costoEnvio === 'G' || props.info.costoEnvio === '0' ? (<img src="../src/assets/img/camion.png" alt="camion" />) : ''}
                        {infoCostoEnvio}
                    </p>
                    {/* Renderiza la cantidad vendida del instrumento */}
                    <p className='mt-4 sales'>{props.info.cantidadVendida} vendidos</p>
                </div>
                {/* Enlace al detalle del instrumento */}
                <a href={`instrumentos/${props.info.id}`}>
                    Detalle
                </a>
                <button className="btn btn-info" onClick={()=>addCarrito(props.info)}>Añadir a carrito</button>
                <button className="btn btn-info" onClick={()=>removeItemCarrito(props.info)}>Sacar de carrito</button>
            </div>
        </>
    );
}

// Exporta el componente Card como el componente predeterminado
export default Card;
