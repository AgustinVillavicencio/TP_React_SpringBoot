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

    @PostMapping("/api/pedido_detalles/saveAll")
    public List<PedidoDetalle> saveAll(@RequestBody List<PedidoDetalle> pedidoDetalles) {
        // Iterar sobre cada pedidoDetalle y realizar las operaciones necesarias antes de guardarlos
        for (PedidoDetalle pedidoDetalle : pedidoDetalles) {
            Pedido pedido = iPedidoService.getById(pedidoDetalle.getPedido().getId());
            pedidoDetalle.setPedido(pedido);

            Instrumento instrumento = iInstrumentoService.getById(pedidoDetalle.getInstrumento().getId());
            pedidoDetalle.setInstrumento(instrumento);

            // Actualizar la cantidad vendida del instrumento
            int nuevaCantidadVendida = instrumento.getCantidadVendida() + pedidoDetalle.getCantidad();
            instrumento.setCantidadVendida(nuevaCantidadVendida);

            iInstrumentoService.save(instrumento);
        }

        // Guardar todos los pedidoDetalles y devolver la lista completa
        return iPedidoDetalleService.saveAll(pedidoDetalles);
    }

    @PostMapping("/api/pedido_detalles/save")
    public PedidoDetalle save(@RequestBody PedidoDetalle pedidoDetalle){
        // Buscar el pedido por su ID y establecerla en el pedidoDetalle
        Pedido pedido = iPedidoService.getById(pedidoDetalle.getPedido().getId());
        pedidoDetalle.setPedido(pedido);

        // Buscar el instrumento por su ID y establecerla en el pedidoDetalle
        Instrumento instrumento = iInstrumentoService.getById(pedidoDetalle.getInstrumento().getId());
        pedidoDetalle.setInstrumento(instrumento);

        // Guardar el pedidoDetalle
        PedidoDetalle savedPedidoDetalle = iPedidoDetalleService.save(pedidoDetalle);

        // Devolver el pedidoDetalle guardado
        return savedPedidoDetalle;
    }

    @GetMapping("/api/pedido_detalles")
    public List<PedidoDetalle> getAll(){
        return iPedidoDetalleService.getAll();
    }

    @GetMapping("/api/pedido_detalles/{id}")
    private PedidoDetalle getById(@PathVariable String id){ return iPedidoDetalleService.getById(Long.parseLong(id));}

    @DeleteMapping("/api/pedido_detalles/{id}")
    public void remove(@PathVariable String id){
        iPedidoDetalleService.remove(Long.parseLong(id));
    }

    @PutMapping("/api/pedido_detalles/{id}")
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
