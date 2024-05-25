import { UseCarrito } from '../Context/UseCarrito.tsx'
import PedidoDetalle from '../Entities/PedidoDetalle.ts'
import Pedido from '../Entities/Pedido.ts'
import { PostDetalleData, postData } from '../Functions/FunctionsApi.ts'

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
  
  const { cart, removeCarrito, addCarrito, limpiarCarrito, totalPedido } = UseCarrito()
  
  const handleCheckout = async () => {
    try {
      // Guardar el pedido primero
      const pedido: Pedido = {
        fechaPedido: new Date(), // Asignar la fecha actual o según sea necesario
        totalPedido: totalPedido // Usar el total del pedido del contexto
      };
      const pedidoGuardado = await postData<Pedido>("http://localhost:8080/api/pedidos/save", pedido);
      // Asignar el ID del pedido guardado a cada detalle del carrito
      const detallesConPedido = cart.map(detalle => ({
        ...detalle,
        pedido: pedidoGuardado
      }));

      // Guardar los detalles del pedido
      const result = await PostDetalleData<PedidoDetalle>("http://localhost:8080/api/pedido_detalles/save", detallesConPedido);
      console.log(result);

      // Limpiar el carrito después de realizar el checkout
      limpiarCarrito();
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
    }
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
            <h3>${totalPedido}</h3>
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
