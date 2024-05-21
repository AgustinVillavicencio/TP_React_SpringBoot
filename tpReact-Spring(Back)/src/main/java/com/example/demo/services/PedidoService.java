package com.example.demo.services;

import com.example.demo.entities.Pedido;
import com.example.demo.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService implements IPedidoService{
    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public List<Pedido> getAll(){
        return (List<Pedido>)pedidoRepository.findAll();
    }

    @Override
    public Pedido getById(Long id) {
        return (Pedido) pedidoRepository.findById(id).get();
    }

    @Override
    public void remove(Long id){
        pedidoRepository.deleteById(id);
    }

    @Override
    public void save(Pedido pedido){
        pedidoRepository.save(pedido);
    }
}
