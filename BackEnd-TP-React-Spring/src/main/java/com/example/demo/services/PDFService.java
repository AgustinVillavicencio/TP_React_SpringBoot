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
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@Service
public class PDFService {

    @SuppressWarnings("resource")
    public ByteArrayInputStream generateInstrumentoPDF(Instrumento instrumento) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc, PageSize.A4.rotate());
        Paragraph emptyParagraph = new Paragraph();

        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

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
            String imagePath = "src/main/resources/static/" + instrumento.getImagen();
            File file = new File(imagePath);
            imageData = ImageDataFactory.create(file.getAbsolutePath());
        }

        Image image = new Image(imageData)
                .setWidth(UnitValue.createPercentValue(40))
                .setHorizontalAlignment(HorizontalAlignment.LEFT);

        Div detallesDiv = new Div()
                .setWidth(UnitValue.createPercentValue(60))
                .setHorizontalAlignment(HorizontalAlignment.RIGHT)
                .setMarginLeft(20);;

        detallesDiv.add(new Paragraph(String.valueOf(instrumento.getCantidadVendida()) + " vendidos").setFontSize(12).setTextAlignment(TextAlignment.CENTER));
        detallesDiv.add(new Paragraph(instrumento.getInstrumento()).setBold().setFontSize(30));
        detallesDiv.add(new Paragraph());
        detallesDiv.add(new Paragraph(instrumento.getDescripcion()).setTextAlignment(TextAlignment.LEFT));


        Paragraph precioParagraph = new Paragraph();
        precioParagraph.add(new Text("Precio: ").setFont(boldFont));
        precioParagraph.add(new Text("$" + instrumento.getPrecio()).setFont(regularFont));
        detallesDiv.add(precioParagraph);


        Paragraph marcaParagraph = new Paragraph();
        marcaParagraph.add(new Text("Marca: ").setFont(boldFont));
        marcaParagraph.add(new Text(instrumento.getMarca()).setFont(regularFont));
        detallesDiv.add(marcaParagraph);


        Paragraph modeloParagraph = new Paragraph();
        modeloParagraph.add(new Text("Modelo: ").setFont(boldFont));
        modeloParagraph.add(new Text(instrumento.getModelo()).setFont(regularFont));
        detallesDiv.add(modeloParagraph);


        Paragraph envioParagraph = new Paragraph();
        if ("G".equals(instrumento.getCostoEnvio()) || "0".equals(instrumento.getCostoEnvio())) {
            envioParagraph.add(new Image(ImageDataFactory.create("src/main/resources/static/camion.png")).setWidth(20)); // Imagen del camión
            envioParagraph.add(new Text("Envío gratis a todo el país").setFont(boldFont).setFontColor(ColorConstants.GREEN));
        } else {
            envioParagraph.add(new Text("Costo de Envio interior Argentina: $").setFont(boldFont).setFontColor(ColorConstants.ORANGE));
            envioParagraph.add(new Text(instrumento.getCostoEnvio()).setFontColor(ColorConstants.ORANGE));
        }
        detallesDiv.add(envioParagraph);

        // Agregar la imagen a la izquierda y los detalles a la derecha
        document.add(new Paragraph().add(image).add(detallesDiv));

        document.add(emptyParagraph);
        document.add(emptyParagraph);
        document.add(emptyParagraph);
        document.add(emptyParagraph);

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
