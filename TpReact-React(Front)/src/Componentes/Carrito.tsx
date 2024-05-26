import { UseCarrito } from '../Context/UseCarrito.tsx';
import PedidoDetalle from '../Entities/PedidoDetalle.ts';
import Pedido from '../Entities/Pedido.ts';
import { PostDetalleData, postData } from '../Functions/FunctionsApi.ts';
import CheckOutMP from './CheckOutMP.tsx';
import { useState } from 'react';

function ItemCarrito(props: { item: PedidoDetalle }) {
  return (
    <div>
      <span>
        <img
          width={50}
          height={50}
          src={`src/assets/img/${props.item.instrumento.imagen}`}
          alt={props.item.instrumento.instrumento}
        />
        <div>
          <strong>{props.item.instrumento.instrumento}</strong> - ${props.item.instrumento.precio}
        </div>
        <div>
          <b>{props.item.cantidad} {props.item.cantidad === 1 ? 'unidad' : 'unidades'} </b>
        </div>
      </span>
      <hr />
    </div>
  );
}

export default function Carrito() {
  const { cart, limpiarCarrito, totalPedido } = UseCarrito();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  const handleCheckout = async () => {
    try {
      // Verificar si el carrito está vacío
      if (cart.length === 0) {
        alert("El carrito está vacío. Por favor, cargue los instrumentos al carrito.");
        return;
      }

      // Guardar el pedido primero
      const nuevoPedido: Pedido = {
        fechaPedido: new Date(), // Asignar la fecha actual o según sea necesario
        totalPedido: totalPedido // Usar el total del pedido del contexto
      };
      const pedidoGuardado = await postData<Pedido>("http://localhost:8080/api/pedidos/save", nuevoPedido);
      // Asignar el ID del pedido guardado a cada detalle del carrito
      const detallesConPedido = cart.map(detalle => ({
        ...detalle,
        pedido: {
          id: pedidoGuardado.id,
          fechaPedido: pedidoGuardado.fechaPedido,
          totalPedido: pedidoGuardado.totalPedido
        }
      }));
      setPedido(pedidoGuardado);
      // Guardar los detalles del pedido
      const result = await PostDetalleData<PedidoDetalle>("http://localhost:8080/api/pedido_detalles/saveAll", detallesConPedido);
      console.log(result);

      alert(`El pedido con id ${pedidoGuardado.id} se guardó correctamente`);
      // Limpiar el carrito después de realizar el checkout
      limpiarCarrito();
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
    }
  };

  return (
    <>
      <aside className='cart'>
        <ul>
          {cart.map((itemCart: PedidoDetalle) => (
            <ItemCarrito key={itemCart.instrumento.id} item={itemCart} />
          ))}
        </ul>
        <div>
          <h3>${totalPedido}</h3>
        </div>
        <div className="d-flex align-items-center justify-content-evenly">
          <button className="btn btn-warning" onClick={handleCheckout}>
            Enviar Datos
          </button>
          <button className="btn btn-warning me-2" onClick={limpiarCarrito} title="Limpiar Todo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17a2 2 0 1 0 2 2" />
              <path d="M17 17h-11v-11" />
              <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
              <path d="M3 3l18 18" />
            </svg>
          </button>
        </div>
        {pedido && <CheckOutMP pedido={pedido} />}
      </aside>
    </>
  );
}
