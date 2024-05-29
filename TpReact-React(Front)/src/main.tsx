import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import InstrumentoDetails from './Componentes/InstrumentoDetails.tsx';
import Home from './Componentes/Home.tsx';
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './Componentes/Map.tsx';
import Grilla from "./Componentes/Grilla.tsx"
import Form from "./Componentes/Form.tsx"
import Login from './Componentes/Login.tsx';
import RolUsuario from './Control Access/RolUsuario.tsx';
import { Roles } from './Entities/Roles.ts';

// Renderizado de la aplicación utilizando ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Componente raíz envuelto en <React.StrictMode>
  <React.StrictMode>
    {/* BrowserRouter para envolver las rutas de la aplicación */}
    <BrowserRouter>
      {/* Componente Routes para definir las rutas */}
      <Routes>
      <Route path="/login" element={<Login />} />
        {/* Ruta para la página de inicio */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        {/* Ruta para la página "Donde estamos" */}
        <Route path='/dondeEstamos' element={<Map />} />
        {/* Ruta para la página de instrumentos */}
        <Route path="/instrumentos" element={<App />} />
        {/* Ruta para los detalles de un instrumento */}
        <Route path="/instrumentos/:id" element={<InstrumentoDetails />} />
        <Route path="/formulario/:id" element={<Form />} />
        <Route element={<RolUsuario rol={Roles.ADMIN} />}>
            <Route path="/grilla" element={<Grilla />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
