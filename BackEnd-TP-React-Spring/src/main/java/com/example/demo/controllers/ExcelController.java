package com.example.demo.controllers;

import com.example.demo.entities.Instrumento;
import com.example.demo.repository.InstrumentoRepository;
import com.example.demo.services.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping("/descargarExcelInstrumentos")
    public ResponseEntity<byte[]> downloadExcelInstrumentos() throws IOException {
        List<Instrumento> instrumentos = instrumentoRepository.findAll();
        ByteArrayInputStream in = excelService.exportInstrumentosToExcel(instrumentos);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=instrumentos.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(in.readAllBytes());
    }
}
