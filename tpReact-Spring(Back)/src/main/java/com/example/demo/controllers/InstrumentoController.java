package com.example.demo.controllers;

import com.example.demo.entities.Categoria;
import com.example.demo.entities.Instrumento;
import com.example.demo.services.ICategoriaService;
import com.example.demo.services.IInstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
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
        Categoria categoria = iCategoriaService.getById(instrumento.getId_categoria().getId());
        instrumento.setId_categoria(categoria);

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
        iInstrumentoService.remove(Long.parseLong(id));
    }

    @PutMapping("/api/instrumentos/{id}")
    public void update(@PathVariable Long id, @RequestBody Instrumento instrumento){
        // Verificar si el instrumento con el ID dado existe en la base de datos
        Instrumento existingInstrumento = iInstrumentoService.getById(id);
        if (existingInstrumento != null) {
            // Asignar el ID al instrumento que se va a actualizar
            instrumento.setId(id);

            // Buscar la categoría por su ID y establecerla en el instrumento
            Categoria categoria = iCategoriaService.getById(instrumento.getId_categoria().getId());
            instrumento.setId_categoria(categoria);

            // Guardar el instrumento actualizado
            iInstrumentoService.save(instrumento);
        } else {
            // Si no se encuentra el instrumento con el ID dado, lanzar una excepción o manejar el error según sea necesario
            throw new RuntimeException("El instrumento con ID " + id + " no existe.");
        }
    }

}




