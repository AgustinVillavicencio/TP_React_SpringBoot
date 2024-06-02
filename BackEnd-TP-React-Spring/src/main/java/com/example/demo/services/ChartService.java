package com.example.demo.services;

import com.example.demo.entities.PedidoDetalle;
import com.example.demo.repository.PedidoDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.*;

@Service
public class ChartService {

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    public List<Object[]> getPedidosPorInstrumentoAsArray() {
        List<PedidoDetalle> detalles = pedidoDetalleRepository.findAll();
        Map<String, Integer> pedidosPorInstrumento = new HashMap<>();

        // Contar la cantidad de veces que aparece cada instrumento en los pedidos
        for (PedidoDetalle detalle : detalles) {
            String instrumento = detalle.getInstrumento().getInstrumento();
            // Incrementar la cuenta de apariciones del instrumento
            pedidosPorInstrumento.put(instrumento, pedidosPorInstrumento.getOrDefault(instrumento, 0) + 1);
        }

        // Convertir el mapa en una lista de arrays
        List<Object[]> resultado = new ArrayList<>();

        // Agregar el encabezado
        resultado.add(new Object[]{"Instrumento", "Cantidad de veces en pedidos"});

        // Ordenar los datos agrupados por cantidad de veces en pedidos (de mayor a menor)
        List<Map.Entry<String, Integer>> listaOrdenada = new ArrayList<>(pedidosPorInstrumento.entrySet());
        listaOrdenada.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        // Agregar los datos ordenados
        for (Map.Entry<String, Integer> entry : listaOrdenada) {
            resultado.add(new Object[]{entry.getKey(), entry.getValue()});
        }

        return resultado;
    }


    public List<Object[]> getPedidosPorMesYAnio() {
        List<PedidoDetalle> detalles = pedidoDetalleRepository.findAll();
        Map<YearMonth, Integer> pedidosPorMesYAnio = new TreeMap<>();

        // Agrupar los pedidos por mes y año
        for (PedidoDetalle detalle : detalles) {
            LocalDate fechaPedido = detalle.getPedido().getFechaPedido().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            YearMonth mesYAnio = YearMonth.from(fechaPedido);
            int cantidad = detalle.getCantidad();
            pedidosPorMesYAnio.put(mesYAnio, pedidosPorMesYAnio.getOrDefault(mesYAnio, 0) + cantidad);
        }

        // Convertir el mapa en una lista de arrays
        List<Object[]> resultado = new ArrayList<>();

        // Agregar el encabezado
        resultado.add(new Object[]{"Mes y Año", "Cantidad de Pedidos"});

        // Agregar los datos agrupados
        for(Map.Entry<YearMonth, Integer> entry : pedidosPorMesYAnio.entrySet()) {
            resultado.add(new Object[]{entry.getKey().toString(), entry.getValue()});
        }

        return resultado;
    }

    public List<Object[]> getUnidadesVendidasPorInstrumento() {
        List<PedidoDetalle> detalles = pedidoDetalleRepository.findAll();
        Map<String, Integer> unidadesVendidasPorInstrumento = new HashMap<>();

        // Calcular las unidades vendidas por instrumento
        for (PedidoDetalle detalle : detalles) {
            String instrumento = detalle.getInstrumento().getInstrumento();
            int cantidad = detalle.getCantidad();
            unidadesVendidasPorInstrumento.put(instrumento, unidadesVendidasPorInstrumento.getOrDefault(instrumento, 0) + cantidad);
        }

        // Convertir el mapa en una lista de arrays
        List<Object[]> resultado = new ArrayList<>();

        // Agregar el encabezado
        resultado.add(new Object[]{"Instrumento", "Unidades Vendidas"});

        // Agregar los datos
        for (Map.Entry<String, Integer> entry : unidadesVendidasPorInstrumento.entrySet()) {
            resultado.add(new Object[]{entry.getKey(), entry.getValue()});
        }

        return resultado;
    }

}
