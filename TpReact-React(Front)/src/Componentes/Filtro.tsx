import { useState, useEffect } from 'react';
import { getAllCategorias,getAll } from '../Functions/FunctionsApi';
import Instrumento from '../Entities/Instrumento';
import Categoria from '../Entities/Categoria';

interface FiltroProps {
}

const Filtro: React.FC<FiltroProps> = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);


  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await getAllCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };
    const fetchInstrumentos = async () => {
      try {
        const InstrumentosData = await getAll();
        setInstrumentos(InstrumentosData);
      } catch (error) {
        console.error('Error al cargar los instrumentos:', error);
      }
    };

    fetchCategorias();
    fetchInstrumentos();
  }, []);

  

  return (
    <div>
      <label htmlFor="categoria">Selecciona una categoría:</label>
      <select id="categoria">
        {categorias.map(categoria => (
          <option key={categoria.denominacion} value={categoria.denominacion}>{categoria.denominacion}</option>
        ))}
      </select>
    </div>
  );
};

export default Filtro;
