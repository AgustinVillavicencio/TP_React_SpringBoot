package com.example.demo.services;

import com.example.demo.entities.Instrumento;

import java.util.List;

public interface IInstrumentoService {
    List<Instrumento> getAll();
    Instrumento getById(Long id);
    void remove(Long id);
    void save(Instrumento instrumento);
}
