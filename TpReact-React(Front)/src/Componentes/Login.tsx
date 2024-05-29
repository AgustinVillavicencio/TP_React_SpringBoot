import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../Entities/Usuario";
import { Roles } from "../Entities/Roles";
import NavBar from "./NavBar";


function Login() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [txtValidacion, setTxtValidacion] = useState<string>("");



    const login = async () => {
        if(usuario?.usuario == undefined || usuario?.usuario === ""){
            setTxtValidacion("Ingrese el nombre de usuario");
            return;
        }
        if(usuario?.clave == undefined || usuario?.clave === ""){
            setTxtValidacion("Ingrese la clave");
            return;
        }
        
        //aca deberia llamar al BACKEND y validar el usuario en base de datos

        if(usuario?.usuario == "admin" && usuario?.clave == "admin"){
            usuario.id = 1;
            usuario.rol = Roles.ADMIN;
            setUsuario(usuario);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            navigate('/home', {
                replace: true,
                state: {
                    logged: true,
                    usuario: usuario
                },
		    });
        }else if(usuario?.usuario == "user" && usuario?.clave == "user"){
            usuario.id = 2;
            usuario.rol = Roles.USER;
            setUsuario(usuario);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            navigate('/home', {
                replace: true,
                state: {
                    logged: true,
                    usuario: usuario
                },
		    });
        }else{
            setTxtValidacion("Usuario y/o clave incorrectas");
            return;
        }        
    }

    return (
        <>
        <NavBar/>
        <div className="center mt-5">
            <form>
                <div className="mb-3 mx-auto" style={{ maxWidth: '300px' }}> {/* Agregar la clase mx-auto y limitar el ancho */}
                    <label htmlFor="txtUsuario" className="form-label">Usuario</label>
                    <input type="text" id='txtUsuario' className="form-control" placeholder="Ingrese el rol (admin o user)" defaultValue={usuario?.usuario} onChange={e => usuario.usuario = String(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") login();}}/>
                </div>
                <div className="mb-3 mx-auto" style={{ maxWidth: '300px' }}> {/* Agregar la clase mx-auto y limitar el ancho */}
                    <label htmlFor="txtClave" className="form-label">Clave</label>
                    <input type="password" id='txtClave' className="form-control" placeholder="Ingrese la clave (admin o user)" defaultValue={usuario?.clave} onChange={e => usuario.clave = String(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") login();}}/>
                </div>
                <div className="col">
                    <button onClick={login} className="btn btn-success" type="button">
                        Ingresar
                    </button>
                </div>
                <div>
                    <p style={{ color: 'red', lineHeight : 5, padding: 5 }}>{txtValidacion}</p>
                </div>
            </form>
        </div>
        </>
    )
    
    
    

}

export default Login