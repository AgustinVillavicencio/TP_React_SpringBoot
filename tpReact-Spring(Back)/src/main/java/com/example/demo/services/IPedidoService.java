package com.example.demo.services;

import com.example.demo.entities.Pedido;

import java.util.List;

public interface IPedidoService {
    List<Pedido> getAll();
    Pedido getById(Long id);
    void remove(Long id);
    void save(Pedido pedido);
}
