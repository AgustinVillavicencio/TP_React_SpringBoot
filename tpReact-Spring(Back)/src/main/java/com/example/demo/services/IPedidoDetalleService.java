package com.example.demo.services;

import com.example.demo.entities.PedidoDetalle;

import java.util.List;

public interface IPedidoDetalleService {
    List<PedidoDetalle> getAll();
    PedidoDetalle getById(Long id);
    void remove(Long id);
    PedidoDetalle save(PedidoDetalle instrumento);
    public List<PedidoDetalle> saveAll(List<PedidoDetalle> pedidoDetalles);
}
