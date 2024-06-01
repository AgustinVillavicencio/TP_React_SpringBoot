package com.example.demo.controllers;

import com.example.demo.entities.Instrumento;
import com.example.demo.repository.InstrumentoRepository;
import com.example.demo.services.PDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class PDFController {

    @Autowired
    private PDFService pdfService;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping("/downloadPDFInstrumento/{id}")
    public ResponseEntity<byte[]> downloadPDFInstrumento(@PathVariable Long id) throws IOException {
        Instrumento instrumento = instrumentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado"));

        ByteArrayInputStream in = pdfService.generateInstrumentoPDF(instrumento);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=instrumento_" + id + ".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(in.readAllBytes());
    }
}

