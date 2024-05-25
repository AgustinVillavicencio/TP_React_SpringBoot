import { ReactNode, createContext, useState } from 'react'
import Instrumento from '../Entities/Instrumento';
import PedidoDetalle from '../Entities/PedidoDetalle';

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
    cart: PedidoDetalle[];
    addCarrito: (product: Instrumento) => void;
    removeCarrito: (product: Instrumento) => void;
    removeItemCarrito: (product: Instrumento) => void;
    limpiarCarrito: () => void;
    total_pedido?:number;
    fecha_pedido?:Date;
}

//crear contexto
export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => {},
    removeCarrito: () => {},
    removeItemCarrito: () => {},
    limpiarCarrito: () => {},
    total_pedido: 0,
    fecha_pedido: new Date()
});


//crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }){
    
    const[cart, setCart] = useState<PedidoDetalle[]>([]);
    const[total_pedido, setTotalPedido] = useState<number>(0);

    const addCarrito = async (product: Instrumento) => {
        let existe:boolean = false
        cart.forEach(async (cartItem:PedidoDetalle) => {
            if(cartItem.instrumento.id === product.id){
                existe = true
                return existe
            }
        });
        console.log("Producto: "+product)
        if (existe) {
            const cartClonado = JSON.parse(JSON.stringify(cart))
            cartClonado.forEach((detalle: PedidoDetalle) => {
            if (detalle.instrumento?.id === product.id) {
                detalle.cantidad += 1
                detalle.pedido.totalPedido += product.precio
            }
        });
        await setCart(cartClonado)
    } 
        else { // si el producto no esta en el carrito
            const nuevoDetalle: PedidoDetalle = {
                id:0,
                instrumento: product,
                cantidad: 1,
                pedido:{
                    id:0,
                    fechaPedido:new Date(),
                    totalPedido:Number(product.precio)
                }
            };
            await setCart(prevCart => [...prevCart, nuevoDetalle])
        }   
        await calcularTotalCarrito();

    };

    const removeCarrito = async (product: Instrumento) => {
        await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    };

    const removeItemCarrito = async (product: Instrumento) => {
        //const objetoBuscado = cart.find((objeto:Plato) => objeto.id === product.id);
        //const platoIndice = cart.findIndex((objeto:Plato) => objeto.id === product.id)
        //si el producto ya esta en el carrito
        let existe:boolean = false
        cart.forEach(async (cartItem:PedidoDetalle) => {
            if(cartItem.instrumento?.id === product.id){
                existe = true
            } 
        });

        if (existe) {
            //console.log("EXISTE");
            const cartClonado = JSON.parse(JSON.stringify(cart));
            cartClonado.forEach((detalle: PedidoDetalle, index: number) => {
                if (detalle.cantidad >1) {
                    detalle.cantidad -= 1
                    detalle.pedido.totalPedido -= product.precio
                }else{
                    cartClonado.splice(index, 1);
                    detalle.pedido.totalPedido -= product.precio;
                }
            });
            setCart(cartClonado)
        }   

        calcularTotalCarrito();
    };

    const limpiarCarrito = () => {
        setCart([])
    }

    const calcularTotalCarrito = async () => {
        let total:number = 0;
        cart.forEach(async (element:PedidoDetalle) => {
            total += element.instrumento?.precio * element.cantidad;
        });
        await setTotalPedido(total);
    }


    return (
    <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, total_pedido }}>
        {children}
    </CartContext.Provider>
    );

}