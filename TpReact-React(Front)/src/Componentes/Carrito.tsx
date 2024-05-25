import { UseCarrito } from '../Context/UseCarrito.tsx'
import PedidoDetalle from '../Entities/PedidoDetalle.ts'
import { PostDetalleData } from '../Functions/FunctionsApi.ts'

function ItemCarrito(props: { item: PedidoDetalle }){
  return(
    <div>
        {/* <span>{props.item.cantidad}</span> */}
    <span>
        <img width={50} height={50}
        src={`src/assets/img/${props.item.instrumento.imagen}`}
        alt={props.item.instrumento.instrumento}
        />
        <div>
            <strong>{props.item.instrumento.instrumento}</strong> - ${props.item.instrumento.precio}
        </div>
        <div>
            <b>{props.item.cantidad} {props.item.cantidad == 1 ? 'unidad' : 'unidades'} </b>
        </div>
    </span>
    <hr></hr>
    </div>
  )
}

export default function Carrito () {
  
  const { cart, removeCarrito, addCarrito, limpiarCarrito, total_pedido } = UseCarrito()
  
  const handleCheckout = async () => {
    const result = await PostDetalleData<PedidoDetalle>("http://localhost:8080/pedidoDetalle/save",cart);
    console.log(result);
}

  
  return (
    <>
      <aside className='cart'>
        <ul>
          {cart.map((itemCart:PedidoDetalle) => (
            <ItemCarrito key={itemCart.instrumento.id} item={itemCart}/>
          ))}
        </ul>
        <div>
            <h3>${total_pedido}</h3>
        </div>

        <button onClick={limpiarCarrito} title='Limpiar Todo'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                <path d='M17 17a2 2 0 1 0 2 2' />
                <path d='M17 17h-11v-11' />
                <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
                <path d='M3 3l18 18' />
            </svg>
        </button>
        <br></br>
        <button onClick={handleCheckout}>
        Enviar Datos
        </button>
        <br></br>
        
        
        
      </aside>
    </>
  )
}
