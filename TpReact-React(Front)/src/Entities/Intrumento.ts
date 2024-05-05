export default interface Instrumento {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number; // Cambiado a number, ya que parece ser un número
    costo_envio: string;
    cantidad_vendida: number; // Cambiado a number, ya que parece ser un número
    descripcion: string;
    id_categoria: {
        id: number;
        denominacion: string;
    };
}
