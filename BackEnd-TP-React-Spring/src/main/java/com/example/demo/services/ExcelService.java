package com.example.demo.services;

import com.example.demo.entities.Instrumento;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {

    public ByteArrayInputStream exportInstrumentosToExcel(List<Instrumento> instrumentos) throws IOException {
        String[] columns = {"Id", "Instrumento", "Categoria", "Precio"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Instrumentos");

            // Create header row
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            // Create data rows
            int rowIdx = 1;
            for (Instrumento instrumento : instrumentos) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(instrumento.getId());
                row.createCell(1).setCellValue(instrumento.getInstrumento());
                row.createCell(2).setCellValue(instrumento.getCategoria().getDenominacion());
                row.createCell(3).setCellValue(instrumento.getPrecio());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}
