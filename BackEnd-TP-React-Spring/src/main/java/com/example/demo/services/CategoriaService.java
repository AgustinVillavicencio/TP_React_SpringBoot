package com.example.demo.services;

import com.example.demo.entities.Categoria;
import com.example.demo.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService implements ICategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> getAll(){
        return (List<Categoria>)categoriaRepository.findAll();
    }

    @Override
    public Categoria getById(Long id) {
        return (Categoria) categoriaRepository.findById(id).get();
    }

    @Override
    public void remove(Long id){
        categoriaRepository.deleteById(id);
    }

    @Override
    public void save(Categoria categoria){
        categoriaRepository.save(categoria);
    }
}
