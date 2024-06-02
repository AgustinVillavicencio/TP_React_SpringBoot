import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import NavBar from './NavBar';
import { getDataSecondChart } from '../Functions/FunctionsApi.ts'; // Ajusta la ruta según tu estructura de archivos

export const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "70%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
};

export const optionsPie = {
    title: "Cantidad de pedidos agrupados por instrumentos",
};


function Charts() {

    const [dataPie, setDataPie] = useState<[string, number][]>([]);
    const [datosChartPie, setDatosChartPie] = useState<any>();

    const getPieChart =  async () => {
        const datosBackend = await getDataSecondChart();
        console.log(datosBackend);
        setDatosChartPie(datosBackend);
    }

    // Datos y opciones para el gráfico de barras
    // const data = [
    //     ["City", "2010 Population", "2000 Population"],
    //     ["New York City, NY", 8175000, 8008000],
    //     ["Los Angeles, CA", 3792000, 3694000],
    //     ["Chicagoa, IL", 2695000, 2896000],
    //     ["Houston, TX", 2099000, 1953000],
    //     ["Philadelphia, PA", 1526000, 1517000],
    // ];
    
    // useEffect para hacer la solicitud al backend
    useEffect(() => {
        getPieChart();
    }, []);

    return (
        <>
            <NavBar/>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={dataPie}
                options={options}
            />
            <Chart
                chartType="PieChart"
                data={datosChartPie}
                options={optionsPie}
                width={"100%"}
                height={"400px"}
            />  
        </>
    );
}

export default Charts;
