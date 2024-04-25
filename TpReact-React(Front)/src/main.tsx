import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import InstrumentoDetails from './Componentes/InstrumentoDetails.tsx';
import Home from './Componentes/Home.tsx';
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './Componentes/Map.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dondeEstamos' element={<Map/>}></Route>
        <Route path="/instrumentos" element={<App />}></Route>
        <Route path="/instrumentos">
        <Route path=":id" element={<InstrumentoDetails/>}></Route>
        
        </Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
