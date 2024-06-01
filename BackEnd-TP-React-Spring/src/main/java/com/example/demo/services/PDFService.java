package com.example.demo.services;

import com.example.demo.entities.Instrumento;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

@Service
public class PDFService {

    public ByteArrayInputStream generateInstrumentoPDF(Instrumento instrumento) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc, PageSize.A4);
        Paragraph emptyParagraph = new Paragraph();

        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);


        //Logo UTN
        ClassPathResource rutaLogo = new ClassPathResource("static/UTN.jpg");
        ImageData imageDataLogo;
        try (InputStream is = rutaLogo.getInputStream()) {
            imageDataLogo = ImageDataFactory.create(is.readAllBytes());
        }
        Image imageLogo = new Image(imageDataLogo).setWidth(UnitValue.createPercentValue(50)).setHorizontalAlignment(HorizontalAlignment.LEFT);
        document.add(imageLogo);

        // Titulo
        Paragraph title = new Paragraph(instrumento.getInstrumento())
                .setFont(boldFont)
                .setFontSize(25)
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);
        document.add(emptyParagraph);
        document.add(emptyParagraph);

        // Imagen

        ImageData imageData;
        if (instrumento.getImagen().startsWith("http")) {
            try {
                URL imageUrl = new URL(instrumento.getImagen());
                imageData = ImageDataFactory.create(imageUrl);
            } catch (MalformedURLException e) {
                throw new IOException("Invalid URL for image", e);
            }
        } else {
            ClassPathResource imgFile = new ClassPathResource("static/" + instrumento.getImagen());
            try (InputStream is = imgFile.getInputStream()) {
                imageData = ImageDataFactory.create(is.readAllBytes());
            }
        }
        Image image = new Image(imageData).setWidth(UnitValue.createPercentValue(50))
                .setHorizontalAlignment(HorizontalAlignment.CENTER);
        document.add(image);
        document.add(emptyParagraph);
        document.add(emptyParagraph);
        document.add(emptyParagraph);
        document.add(emptyParagraph);

        // Descripcion
        Paragraph description = new Paragraph(instrumento.getDescripcion())
                .setFontSize(20);  // Adjust font size as needed
        document.add(description);

        document.add(emptyParagraph);
        document.add(emptyParagraph);
        document.add(emptyParagraph);
        // Tabla sin bordes
        Table table = new Table(UnitValue.createPercentArray(new float[]{1, 3}))
                .useAllAvailableWidth()
                .setFontSize(16);

        table.addCell(new Cell().add(new Paragraph("Marca:").setBold()).setBorder(null));
        table.addCell(new Cell().add(new Paragraph(String.valueOf(instrumento.getMarca()))).setBorder(null));

        table.addCell(new Cell().add(new Paragraph("Modelo:").setBold()).setBorder(null));
        table.addCell(new Cell().add(new Paragraph(String.valueOf(instrumento.getModelo()))).setBorder(null));

        table.addCell(new Cell().add(new Paragraph("Categoria:").setBold()).setBorder(null));
        table.addCell(new Cell().add(new Paragraph(instrumento.getCategoria().getDenominacion())).setBorder(null));

        table.addCell(new Cell().add(new Paragraph("Precio:").setBold()).setBorder(null));
        table.addCell(new Cell().add(new Paragraph("$"+String.valueOf(instrumento.getPrecio()))).setBorder(null));



        document.add(table);

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
