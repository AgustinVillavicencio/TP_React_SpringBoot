package com.example.demo.controllers;

import com.example.demo.entities.Instrumento;
import com.example.demo.services.IInstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class InstrumentoController {
    @Autowired
    private IInstrumentoService iInstrumentoService;

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

    @PostMapping("/api/instrumentos")
    public void save(@RequestBody Instrumento instrumento){
        iInstrumentoService.save(instrumento);
    }
}




