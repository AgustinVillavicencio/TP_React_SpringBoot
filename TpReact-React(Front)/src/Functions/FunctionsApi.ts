import Instrumento from "../Entities/Instrumento";
import Pedido from "../Entities/Pedido";
import PreferenceMP from "../Entities/PreferenceMP";


//------------------------------------------------------------------------------------------------------
//---------------------------------------FUNCIONES API INSTRUMENTOS-------------------------------------
//------------------------------------------------------------------------------------------------------
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

 // Función generica para enviar datos mediante una solicitud POST
// Función genérica para enviar datos mediante una solicitud POST
export async function postData<T>(url: string, data: any): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      // Manejar la respuesta vacía aquí
        console.warn('Empty response from server');
      return {} as T;  // Devolver un objeto vacío del tipo esperado
    }

    const result = JSON.parse(text) as T;
    return result;
}




    
    // Función generica para actualizar datos mediante una solicitud PUT
export async function putData<T>(path: string, data: T): Promise<T> {
    try {
    const response = await fetch(`${path}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(data), // Convierte los datos a JSON y los envía en el cuerpo de la solicitud
    });
    
    if (!response.ok) {
        throw Error(response.statusText);
    }
        return response.json(); // Retorna los datos en formato JSON
    } catch (error) {
        return Promise.reject(error); // Rechaza la promesa con el error
    }
}
    
    // Función generica para eliminar datos mediante una solicitud DELETE
export async function deleteData(path: string) {
    try {
        const response = await fetch(`${path}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            mode: 'cors'
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
    } catch (error) {
        console.error(error); // Imprime el error en la consola
    }
}

    export async function PostDetalleData<T>(path: string, data: T[]): Promise<T[]> {
        console.log(data);
        try {
            const response = await fetch(`${path}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Retorna los datos en formato JSON
        } catch (error: any) {
            console.error(error); // Imprime el error en la consola
            throw error; // Rechaza la promesa con el error
        }
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

export async function updateInstrumento(instrumentoData: Instrumento): Promise<boolean> {
    // Creamos una copia del objeto instrumentoData sin la propiedad "denominacion" en id_categoria

    const instrumentoSinDenominacion = {
        ...instrumentoData,
        id_categoria: {
            id: instrumentoData.categoria?.id
        }
    };

    const url: string = `http://localhost:8080/api/instrumentos/${instrumentoData.id}`;
    try {
        const response = await fetch(url, {
            method: 'PUT', // Usamos el método PUT para actualizar el instrumento
            headers: {
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*' // Permite solicitudes de cualquier origen
            },
            mode: 'cors', // Modo CORS para permitir solicitudes entre dominios
            body: JSON.stringify(instrumentoSinDenominacion) // Convertimos el objeto de datos modificado en formato JSON
        });

        if (response.ok) {
            // Si la actualización es exitosa, retornamos true
            return true;
        } else {
            // Si hay algún error en la actualización, lanzamos una excepción con el mensaje de error
            const errorMessage: string = "Error al actualizar el instrumento";
            throw new Error(errorMessage);
        }
    } catch (error:any) {
        // Si hay algún error en la solicitud, lanzamos una excepción con el mensaje de error
        throw new Error(error.message);
    }
}

export async function createPreferenceMP(pedido?:Pedido){
    console.log("Pedido enviado al backend:", pedido);
    let urlServer = 'http://localhost:8080/create_preference_mp';
    const response = await fetch(urlServer, {
	    method: "POST",
	    body: JSON.stringify(pedido),
	    headers: {
		"Content-Type": 'application/json'
	    },
    mode: 'cors'
	});
    return await response.json() as PreferenceMP;   
}

export function createPDFInstrumento(id:number){
    let url =`http://localhost:8080/api/downloadPDFInstrumento/${id}`
    window.location.href = url;
}

export function createExcelInstrumentos(){
    let url =`http://localhost:8080/api/descargarExcelInstrumentos`
    window.location.href = url;
}
export function createExcelPedidos(fechaDesde:string, fechaHasta:string){
    let url = `http://localhost:8080/api/descargarExcelPedidos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
        window.location.href = url;
}

export async function getDataSecondChart() {
    const url = "http://localhost:8080/api/pedidosPorInstrumento";

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

export async function getDataFirstChart() {
    const url = "http://localhost:8080/api/pedidosPorMesYAnio";

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

export async function getDataThirdChart() {
    const url = "http://localhost:8080/api/unidadesVendidasPorInstrumento";

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