package com.example.demo.controllers;

import com.example.demo.entities.Categoria;
import com.example.demo.services.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CategoriaController {
        @Autowired
        private ICategoriaService iCategoriaService;

        @GetMapping("/api/categorias")
        public List<Categoria> getAll(){
            return iCategoriaService.getAll();
        }

        @GetMapping("/api/categorias/{id}")
        private Categoria getById(@PathVariable String id){ return iCategoriaService.getById(Long.parseLong(id));}

        @DeleteMapping("/api/categorias/{id}")
        public void remove(@PathVariable String id){
            iCategoriaService.remove(Long.parseLong(id));
        }

        @PostMapping("/api/categorias")
        public void save(@RequestBody Categoria categoria){
            iCategoriaService.save(categoria);
        }

}
