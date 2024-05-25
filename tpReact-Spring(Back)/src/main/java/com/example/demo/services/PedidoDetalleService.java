package com.example.demo.services;

import com.example.demo.entities.PedidoDetalle;
import com.example.demo.repository.PedidoDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoDetalleService implements IPedidoDetalleService{
    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @Override
    public List<PedidoDetalle> getAll(){
        return (List<PedidoDetalle>)pedidoDetalleRepository.findAll();
    }

    @Override
    public PedidoDetalle getById(Long id) {
        return (PedidoDetalle) pedidoDetalleRepository.findById(id).get();
    }

    @Override
    public void remove(Long id){
        pedidoDetalleRepository.deleteById(id);
    }

    @Override
    public PedidoDetalle save(PedidoDetalle pedidoDetalle){
        pedidoDetalleRepository.save(pedidoDetalle);
        return pedidoDetalle;
    }
    @Override
    public List<PedidoDetalle> saveAll(List<PedidoDetalle> pedidoDetalles) {
        pedidoDetalleRepository.saveAll(pedidoDetalles);
        return pedidoDetalles;
    }
}
