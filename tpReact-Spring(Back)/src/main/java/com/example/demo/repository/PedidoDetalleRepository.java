package com.example.demo.repository;

import com.example.demo.entities.PedidoDetalle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoDetalleRepository extends CrudRepository<PedidoDetalle,Long> {
}
