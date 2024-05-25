package com.example.demo.controllers;

import com.example.demo.entities.Instrumento;
import com.example.demo.entities.Pedido;
import com.example.demo.entities.PedidoDetalle;
import com.example.demo.services.IInstrumentoService;
import com.example.demo.services.IPedidoDetalleService;
import com.example.demo.services.IPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PedidoDetalleController {
    @Autowired
    private IPedidoDetalleService iPedidoDetalleService;

    @Autowired
    private IPedidoService iPedidoService;

    @Autowired
    private IInstrumentoService iInstrumentoService;

    @PostMapping("/api/pedidoDetalles")
    public void save(@RequestBody PedidoDetalle pedidoDetalle){
        // Buscar el pedido por su ID y establecerla en el pedidoDetalle
        Pedido pedido = iPedidoService.getById(pedidoDetalle.getPedido().getId());
        pedidoDetalle.setPedido(pedido);

        // Buscar el instrumento por su ID y establecerla en el pedidoDetalle
        Instrumento instrumento = iInstrumentoService.getById(pedidoDetalle.getInstrumento().getId());
        pedidoDetalle.setInstrumento(instrumento);

        // Guardar el pedidoDetalle
        iPedidoDetalleService.save(pedidoDetalle);
    }

    @GetMapping("/api/pedidoDetalles")
    public List<PedidoDetalle> getAll(){
        return iPedidoDetalleService.getAll();
    }

    @GetMapping("/api/pedidoDetalles/{id}")
    private PedidoDetalle getById(@PathVariable String id){ return iPedidoDetalleService.getById(Long.parseLong(id));}

    @DeleteMapping("/api/pedidoDetalles/{id}")
    public void remove(@PathVariable String id){
        iPedidoDetalleService.remove(Long.parseLong(id));
    }

    @PutMapping("/api/pedidoDetalles/{id}")
    public void update(@PathVariable Long id, @RequestBody PedidoDetalle pedidoDetalle){
        // Verificar si el instrumento con el ID dado existe en la base de datos
        PedidoDetalle existingPedidoDetalle = iPedidoDetalleService.getById(id);
        if (existingPedidoDetalle != null) {
            // Asignar el ID al instrumento que se va a actualizar
            pedidoDetalle.setId(id);

            // Buscar la categoría por su ID y establecerla en el instrumento
            Pedido pedido = iPedidoService.getById(pedidoDetalle.getPedido().getId());
            pedidoDetalle.setPedido(pedido);

            // Buscar la categoría por su ID y establecerla en el instrumento
            Instrumento instrumento = iInstrumentoService.getById(pedidoDetalle.getInstrumento().getId());
            pedidoDetalle.setInstrumento(instrumento);

            // Guardar el instrumento actualizado
            iPedidoDetalleService.save(pedidoDetalle);
        } else {
            // Si no se encuentra el instrumento con el ID dado, lanzar una excepción o manejar el error según sea necesario
            throw new RuntimeException("El pedidoDetalle con ID " + id + " no existe.");
        }
    }
}
