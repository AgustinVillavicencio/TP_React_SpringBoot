package com.example.demo.controllers;

import com.example.demo.entities.Instrumento;
import com.example.demo.entities.PedidoDetalle;
import com.example.demo.repository.InstrumentoRepository;
import com.example.demo.repository.PedidoDetalleRepository;
import com.example.demo.services.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @GetMapping("/descargarExcelInstrumentos")
    public ResponseEntity<byte[]> downloadExcelInstrumentos() throws IOException {
        List<Instrumento> instrumentos = instrumentoRepository.findAll();
        ByteArrayInputStream in = excelService.exportInstrumentosToExcel(instrumentos);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=Instrumentos.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(in.readAllBytes());
    }

    @GetMapping("/descargarExcelPedidos")
    public ResponseEntity<byte[]> downloadExcelFechas(@RequestParam(name = "fechaDesde", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaDesde,
                                                      @RequestParam(name = "fechaHasta", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaHasta) throws IOException {
        List<PedidoDetalle> detallesPedidos;

        if (fechaDesde != null && fechaHasta != null) {
            // Si se proporcionan ambas fechas, filtra los detalles de pedido por el rango de fechas
            detallesPedidos = pedidoDetalleRepository.findByPedido_FechaPedidoBetween(fechaDesde, fechaHasta);
        } else {
            // Si no se proporcionan ambas fechas, obtiene todos los detalles de pedido
            detallesPedidos = pedidoDetalleRepository.findAll();
        }

        ByteArrayInputStream in = excelService.exportPedidosToExcel(detallesPedidos);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=Pedidos.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(in.readAllBytes());
    }
}
