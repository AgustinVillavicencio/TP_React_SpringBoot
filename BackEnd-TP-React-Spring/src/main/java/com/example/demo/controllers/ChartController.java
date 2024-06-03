package com.example.demo.controllers;

import com.example.demo.services.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class ChartController {
   @Autowired
    private ChartService chartService;

    @GetMapping("/pedidosPorInstrumento")
    public List<Object[]> getPedidosPorInstrumento() {
        return chartService.getPedidosPorInstrumentoAsArray();
    }

    @GetMapping("/pedidosPorMesYAnio")
    public List<Object[]> getPedidosPorMesYAnio() {
        return chartService.getPedidosPorMesYAnio();
    }

    @GetMapping("/unidadesVendidasPorInstrumento")
    public List<Object[]> unidadesVendidasPorInstrumento() {
        return chartService.getUnidadesVendidasPorInstrumento();
    }
}
