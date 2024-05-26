package com.example.demo.services;

import com.example.demo.entities.Categoria;

import java.util.List;

public interface ICategoriaService {

    List<Categoria> getAll();
    Categoria getById(Long id);
    void remove(Long id);
    void save(Categoria categoria);
}
