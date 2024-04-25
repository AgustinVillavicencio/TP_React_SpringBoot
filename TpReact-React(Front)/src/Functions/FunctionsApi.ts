import Instrumento from "../Entities/Intrumento";


//Traemos todos los instrumentos

export async function getAll(){
    const url = "http://localhost:8080/api/instrumentos"
    const response = await fetch(url,{
        method:'GET',
        headers:{
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*'
        },
        mode: 'cors'
    })
    const data = await response.json();
    return data;
}

//Traemos 1 instrumento por id

export async function getInstrumentoById(id:Number){
    const url = `http://localhost:8080/api/instrumentos/${id}`
    const response = await fetch(url,{
        method:'GET',
        headers:{
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*'
        },
        mode: 'cors'
    })
    const data = await response.json();
    return data as Instrumento;
}