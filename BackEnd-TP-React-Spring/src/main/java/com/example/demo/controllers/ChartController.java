package com.example.demo.controllers;

import com.example.demo.services.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api")
public class ChartController {
   @Autowired
    private ChartService chartService;

    @GetMapping("/pedidosPorInstrumento")
    public Map<String, Integer> getPedidosPorInstrumento() {
        return chartService.getPedidosPorInstrumento();
    }
}
