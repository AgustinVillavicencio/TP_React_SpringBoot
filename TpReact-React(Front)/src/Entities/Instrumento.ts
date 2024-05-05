export default interface Instrumento {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: string;
    costo_envio: string;
    cantidad_vendida: string;
    descripcion: string;
    id_categoria: {
        id: number;
        denominacion: string;
    };
}
