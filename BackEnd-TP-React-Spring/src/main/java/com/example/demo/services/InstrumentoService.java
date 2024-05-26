package com.example.demo.services;

import com.example.demo.entities.Instrumento;
import com.example.demo.repository.InstrumentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class InstrumentoService implements IInstrumentoService{

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Override
    public List<Instrumento> getAll(){
        return (List<Instrumento>)instrumentoRepository.findAll();
    }

    @Override
    public Instrumento getById(Long id) {
        return (Instrumento) instrumentoRepository.findById(id).get();
    }

    @Override
    public void remove(Long id){
        instrumentoRepository.deleteById(id);
    }

    @Override
    public void save(Instrumento instrumento){
        instrumentoRepository.save(instrumento);
    }
}
