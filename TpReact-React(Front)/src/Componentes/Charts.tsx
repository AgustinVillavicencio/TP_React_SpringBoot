import  { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import NavBar from './NavBar';
import { getDataFirstChart, getDataSecondChart, getDataThirdChart } from '../Functions/FunctionsApi.ts'; // Ajusta la ruta según tu estructura de archivos

export const options = {
    title: "Pedidos agrupados por mes y anio",
    chartArea: { width: "70%" },
    hAxis: {
        title: "Cantidad de pedidos",
        minValue: 0,
    },
    vAxis: {
        title: "Fecha",
    },
};

export const optionsPie = {
    title: "Cantidad de pedidos agrupados por instrumentos",
};

export const optionsBarras = {
    chart: {
        title: "Instrumentos mas vendidos",
        subtitle: "Sales, Expenses, and Profit: 2020-present",
    },
};


function Charts() {

    const [datosChartPie, setDatosChartPie] = useState<any>();
    const [datosChartBar, setDatosChartBar] = useState<any>();
    const [datosChartBarras, setDatosChartBarras] = useState<any>();

    const getPieChart =  async () => {
        const datosBackend = await getDataSecondChart();
        console.log(datosBackend);
        setDatosChartPie(datosBackend);
    }
    const getBarChart =  async () => {
        const datosBackend = await getDataFirstChart();
        console.log(datosBackend);
        setDatosChartBar(datosBackend);
    }

    const getBarrasChart =  async () => {
        const datosBackend = await getDataThirdChart();
        console.log(datosBackend);
        setDatosChartBarras(datosBackend);
    }

    // useEffect para hacer la solicitud al backend
    useEffect(() => {
        getPieChart();
        getBarChart();
        getBarrasChart();
    }, []);

    return (
        <>
            <NavBar/>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={datosChartBar}
                options={options}
            /> 
            <Chart
                chartType="PieChart"
                data={datosChartPie}
                options={optionsPie}
                width={"100%"}
                height={"450px"}
            />
                <Chart chartType="ColumnChart" 
                width="100%" 
                height="400px" 
                data={datosChartBarras} 
            />

        </>
    );
}

export default Charts;
