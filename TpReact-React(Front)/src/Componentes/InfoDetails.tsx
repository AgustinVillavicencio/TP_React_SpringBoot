import Instrumento from "../Entities/Intrumento";

interface Props {
    instrumento: Instrumento;  
  }
  

  const InfoDetails: React.FC<Props> = (props:Props)=>{
    const infoCostoEnvio = props.instrumento?.costoEnvio !='G'
    ? "Costo de Envio interior Argentina: "+props.instrumento?.costoEnvio:"Envío gratis a todo el país";
    const costoClassName = props.instrumento?.costoEnvio !='G' && props.instrumento?.costoEnvio !='0'
    ? 'CostoInterior mt-4':'CostoGratis mt-4 ';
    return(
        <div className='infoDetalle'>
              <p>{props.instrumento?.cantidadVendida} vendidos</p>
              <h1 className='titleInformacion'>{props.instrumento?.instrumento}</h1>
              <p>$ {props.instrumento?.precio}</p>
              <p>Marca: {props.instrumento?.marca}</p>
              <p>Modelo: {props.instrumento?.modelo}</p>
              <p className={costoClassName}>
                {
                  props.instrumento?.costoEnvio == 'G' || props.instrumento?.costoEnvio =='0'? (<img src="../src/assets/img/camion.png" alt="camion" />):''
                }
                {infoCostoEnvio}</p>
            </div>
    )
}

export default InfoDetails;