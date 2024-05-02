import Instrumento from "../Entities/Intrumento";
// Función asincrónica para obtener todos los instrumentos
export async function getAll() {
    // URL de la API para obtener todos los instrumentos
    const url = "http://localhost:8080/api/instrumentos";

    // Realiza una solicitud GET a la API
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*' // Permite solicitudes de cualquier origen
        },
        mode: 'cors' // Modo CORS para permitir solicitudes entre dominios
    });

    // Extrae los datos de la respuesta como JSON
    const data = await response.json();

    // Retorna los datos obtenidos de la API
    return data;
}

// Función asincrónica para obtener un instrumento por su ID
export async function getInstrumentoById(id: Number) {
    // URL de la API para obtener un instrumento por su ID
    const url = `http://localhost:8080/api/instrumentos/${id}`;

    // Realiza una solicitud GET a la API
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*' // Permite solicitudes de cualquier origen
        },
        mode: 'cors' // Modo CORS para permitir solicitudes entre dominios
    });

    // Extrae los datos de la respuesta como JSON y los convierte en un objeto de tipo Instrumento
    const data = await response.json();

    // Retorna el instrumento obtenido de la API
    return data as Instrumento; // Se especifica el tipo de retorno como Instrumento
}

export async function deleteInstrumento(id: number) {
    const url = `http://localhost:8080/api/instrumentos/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*' // Permite solicitudes de cualquier origen
            },
            mode: 'cors' // Modo CORS para permitir solicitudes entre dominios
        });

        if (response.ok) {
            // Si la eliminación es exitosa, retornamos true
            return true;
        } else {
            // Si hay algún error en la eliminación, lanzamos una excepción con el mensaje de error
            const errorMessage = `Error al eliminar el instrumento con ID ${id}`;
            throw new Error(errorMessage);
        }
    } catch (error:any) {
        // Si hay algún error en la solicitud, lanzamos una excepción con el mensaje de error
        throw new Error(error.message);
    }
}

export async function createInstrumento(instrumentoData: Instrumento): Promise<boolean> {
    const url: string = "http://localhost:8080/api/instrumentos";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*' // Permite solicitudes de cualquier origen
            },
            mode: 'cors', // Modo CORS para permitir solicitudes entre dominios
            body: JSON.stringify(instrumentoData) // Convierte el objeto de datos en formato JSON
        });

        if (response.ok) {
            // Si la creación es exitosa, retornamos true
            return true;
        } else {
            // Si hay algún error en la creación, lanzamos una excepción con el mensaje de error
            const errorMessage: string = "Error al crear el instrumento";
            throw new Error(errorMessage);
        }
    } catch (error:any) {
        // Si hay algún error en la solicitud, lanzamos una excepción con el mensaje de error
        throw new Error(error.message);
    }
}

// Función asincrónica para obtener todas las categorías
export async function getAllCategorias() {
    // URL de la API para obtener todas las categorías
    const url = "http://localhost:8080/api/categorias";

    // Realiza una solicitud GET a la API
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*' // Permite solicitudes de cualquier origen
        },
        mode: 'cors' // Modo CORS para permitir solicitudes entre dominios
    });

    // Extrae los datos de la respuesta como JSON
    const data = await response.json();

    // Retorna los datos obtenidos de la API
    return data;
}