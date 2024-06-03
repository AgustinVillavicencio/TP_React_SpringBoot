package com.example.demo.controllers;

import com.example.demo.entities.Categoria;
import com.example.demo.entities.Instrumento;
import com.example.demo.services.ICategoriaService;
import com.example.demo.services.IInstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class InstrumentoController {
    @Autowired
    private IInstrumentoService iInstrumentoService;

    @Autowired
    private ICategoriaService iCategoriaService;

    @PostMapping("/api/instrumentos")
    public void save(@RequestBody Instrumento instrumento){
        // Buscar la categoría por su ID y establecerla en el instrumento
        Categoria categoria = iCategoriaService.getById(instrumento.getCategoria().getId());
        instrumento.setCategoria(categoria);

        // Guardar el instrumento
        iInstrumentoService.save(instrumento);
    }

    @GetMapping("/api/instrumentos")
    public List<Instrumento> getAll(){
        return iInstrumentoService.getAll();
    }

    @GetMapping("/api/instrumentos/{id}")
    private Instrumento getById(@PathVariable String id){ return iInstrumentoService.getById(Long.parseLong(id));}

    @DeleteMapping("/api/instrumentos/{id}")
    public void remove(@PathVariable String id){
        // Obtener el instrumento por su ID
        Instrumento instrumento = iInstrumentoService.getById(Long.parseLong(id));

            // Cambiar el estado del campo "eliminado" a true
            instrumento.setEliminado(true);

            // Guardar el instrumento actualizado en la base de datos
            iInstrumentoService.save(instrumento);
    }

    @PutMapping("/api/instrumentos/{id}")
    public void update(@PathVariable Long id, @RequestBody Instrumento instrumento){
        // Verificar si el instrumento con el ID dado existe en la base de datos
        Instrumento existingInstrumento = iInstrumentoService.getById(id);
        if (existingInstrumento != null) {
            // Asignar el ID al instrumento que se va a actualizar
            instrumento.setId(id);

            // Buscar la categoría por su ID y establecerla en el instrumento
            Categoria categoria = iCategoriaService.getById(instrumento.getCategoria().getId());
            instrumento.setCategoria(categoria);

            // Guardar el instrumento actualizado
            iInstrumentoService.save(instrumento);
        } else {
            // Si no se encuentra el instrumento con el ID dado, lanzar una excepción o manejar el error según sea necesario
            throw new RuntimeException("El instrumento con ID " + id + " no existe.");
        }
    }

    @PutMapping("/api/restoreInstrumento/{id}")
    public ResponseEntity<?> restoreInstrumento(@PathVariable Long id) {
        try {
            // Obtener el instrumento por su ID
            Instrumento instrumento = iInstrumentoService.getById(id);

            // Verificar si el instrumento existe y si está marcado como eliminado
            if (instrumento != null && instrumento.getEliminado()) {
                // Cambiar el estado del campo "eliminado" a false
                instrumento.setEliminado(false);

                // Guardar el instrumento actualizado en la base de datos
                iInstrumentoService.save(instrumento);

                // Devolver una respuesta exitosa con el instrumento restaurado
                return ResponseEntity.ok(instrumento);
            } else {
                // Devolver una respuesta de error con un mensaje apropiado
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Instrumento no encontrado o no está marcado como eliminado");
            }
        } catch (Exception e) {
            // Manejo de errores generales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al restaurar el instrumento");
        }
    }

}




