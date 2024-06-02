package com.example.demo.services;

import com.example.demo.entities.PedidoDetalle;
import com.example.demo.repository.PedidoDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChartService {
    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    public Map<String, Integer> getPedidosPorInstrumento() {
        List<PedidoDetalle> detalles = pedidoDetalleRepository.findAll();
        Map<String, Integer> pedidosPorInstrumento = new HashMap<>();

        for (PedidoDetalle detalle : detalles) {
            String instrumento = detalle.getInstrumento().getInstrumento();
            pedidosPorInstrumento.put(instrumento, pedidosPorInstrumento.getOrDefault(instrumento, 0) + detalle.getCantidad());
        }

        return pedidosPorInstrumento;
    }
}
