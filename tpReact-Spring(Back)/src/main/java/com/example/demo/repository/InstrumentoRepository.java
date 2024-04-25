package com.example.demo.repository;

import com.example.demo.entities.Instrumento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstrumentoRepository extends CrudRepository<Instrumento,Long> {
}
