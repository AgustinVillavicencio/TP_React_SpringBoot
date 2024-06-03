package com.example.demo.services;

import com.example.demo.entities.Instrumento;
import com.example.demo.entities.Pedido;
import com.example.demo.entities.PedidoDetalle;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExcelService {

    public ByteArrayInputStream exportInstrumentosToExcel(List<Instrumento> instrumentos) throws IOException {

        List<Instrumento> filteredInstrumentos = instrumentos.stream()
                .filter(instrumento -> !instrumento.getEliminado())
                .collect(Collectors.toList());

        String[] columns = {"Id", "Instrumento", "Categoria", "Precio"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Instrumentos");

            // Definir el ancho de las columnas y el estilo de las celdas
            int[] columnWidths = {5, 55, 12, 10};
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true); // Aplicar negrita
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER); // Centrar el texto
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_ORANGE.getIndex()); // Color de fondo naranja claro
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); // Patrón de relleno sólido
            headerStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            headerStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            headerStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            headerStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho

            CellStyle combinedStyle = workbook.createCellStyle();
            combinedStyle.setAlignment(HorizontalAlignment.CENTER);
            combinedStyle.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex()); // Color de fondo amarillo claro
            combinedStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); // Patrón de relleno sólido
            combinedStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            combinedStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            combinedStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            combinedStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho

            // Setear el ancho de las columnas
            for (int i = 0; i < columns.length; i++) {
                sheet.setColumnWidth(i, columnWidths[i] * 256); // Multiplicar por 256 para convertir de caracteres a unidades de ancho de columna
            }

            // Crear el índice del encabezado de fila
            int headerRowIdx = 0;
            Row headerRow = sheet.createRow(headerRowIdx);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i].toUpperCase());
                cell.setCellStyle(headerStyle); // Aplicar estilo de encabezado
            }

            // Crear filas de datos
            int rowIdx = 1;
            for (Instrumento instrumento : filteredInstrumentos) {
                Row row = sheet.createRow(rowIdx++);

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(instrumento.getId());
                cell0.setCellStyle(combinedStyle);

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(instrumento.getInstrumento());
                cell1.setCellStyle(combinedStyle);

                Cell cell2 = row.createCell(2);
                cell2.setCellValue(instrumento.getCategoria().getDenominacion());
                cell2.setCellStyle(combinedStyle);

                Cell cell3 = row.createCell(3);
                cell3.setCellValue(instrumento.getPrecio());
                cell3.setCellStyle(combinedStyle);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public ByteArrayInputStream exportPedidosToExcel(List<PedidoDetalle> detallesPedidos) throws IOException {
        String[] columns = {"Fecha Pedido", "Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Pedidos");

            // Definir el ancho de las columnas y el estilo de las celdas
            int[] columnWidths = {21, 55, 12, 10, 10, 8, 10};
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true); // Aplicar negrita
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER); // Centrar el texto
            headerStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex()); // Color de fondo naranjaClaro
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); // Patrón de relleno sólido
            headerStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            headerStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            headerStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            headerStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho
            CellStyle centeredStyle = workbook.createCellStyle();
            centeredStyle.setAlignment(HorizontalAlignment.CENTER);
            centeredStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            centeredStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            centeredStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            centeredStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho
            CellStyle lightYellowStyle = workbook.createCellStyle();
            lightYellowStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex()); // Color de fondo amarillo claro
            lightYellowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); // Patrón de relleno sólido
            lightYellowStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            lightYellowStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            lightYellowStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            lightYellowStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho

            // Setear el ancho de las columnas
            for (int i = 0; i < columns.length; i++) {
                sheet.setColumnWidth(i, columnWidths[i] * 256); // Multiplicar por 256 para convertir de caracteres a unidades de ancho de columna
            }

            // Crear el índice del encabezado de fila
            int headerRowIdx = 0;
            Row headerRow = sheet.createRow(headerRowIdx);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i].toUpperCase());
                cell.setCellStyle(headerStyle); // Aplicar estilo de encabezado
            }

            // Agrupar los detalles de pedido por pedido
            Map<Pedido, List<PedidoDetalle>> detallesPorPedido = new HashMap<>();
            for (PedidoDetalle detalle : detallesPedidos) {
                Pedido pedido = detalle.getPedido();
                detallesPorPedido.computeIfAbsent(pedido, k -> new ArrayList<>()).add(detalle);
            }

            // Crear filas para cada grupo de pedido
            int rowIdx = 1;
            for (Map.Entry<Pedido, List<PedidoDetalle>> entry : detallesPorPedido.entrySet()) {
                Pedido pedido = entry.getKey();
                List<PedidoDetalle> detalles = entry.getValue();

                // Agregar una fila vacía por cada pedido
                Row emptyRow = sheet.createRow(rowIdx++);
                for (int i = 0; i < columns.length; i++) {
                    Cell cell = emptyRow.createCell(i);
                    cell.setCellValue(""); // Celda vacía
                    cell.setCellStyle(lightYellowStyle); // Aplicar estilo de fondo amarillo claro a las filas vacías
                }

                // Agregar detalles de pedido
                for (PedidoDetalle detalle : detalles) {
                    Row row = sheet.createRow(rowIdx++);

                    Instrumento instrumento = detalle.getInstrumento();
                    row.createCell(0).setCellValue(pedido.getFechaPedido().toString());
                    row.createCell(1).setCellValue(instrumento.getInstrumento());
                    row.createCell(2).setCellValue(instrumento.getMarca());
                    row.createCell(3).setCellValue(instrumento.getModelo());
                    row.createCell(4).setCellValue(detalle.getCantidad());
                    row.createCell(5).setCellValue(instrumento.getPrecio());
                    row.createCell(6).setCellValue(detalle.getCantidad() * instrumento.getPrecio());
                }
            }

            // Aplicar estilo de fondo amarillo claro al resto de la tabla
            for (int i = headerRowIdx + 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                for (int j = 0; j < columns.length; j++) {
                    Cell cell = row.getCell(j);
                    if (cell != null) {
                        cell.setCellStyle(lightYellowStyle);
                    }
                }
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

}
