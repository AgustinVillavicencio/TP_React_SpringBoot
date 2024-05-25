package com.example.demo.controllers;

import com.example.demo.entities.Pedido;
import com.example.demo.services.IPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PedidoController {
    @Autowired
    private IPedidoService iPedidoService;


    @PostMapping("/api/pedidos/save")
    public void save(@RequestBody Pedido instrumento){
        // Guardar el instrumento
        iPedidoService.save(instrumento);
    }

    @GetMapping("/api/pedidos")
    public List<Pedido> getAll(){
        return iPedidoService.getAll();
    }

    @GetMapping("/api/pedidos/{id}")
    private Pedido getById(@PathVariable String id){ return iPedidoService.getById(Long.parseLong(id));}

    @DeleteMapping("/api/pedidos/{id}")
    public void remove(@PathVariable String id){
        iPedidoService.remove(Long.parseLong(id));
    }

    @PutMapping("/api/pedidos/{id}")
    public void update(@PathVariable Long id, @RequestBody Pedido pedido){
        // Verificar si el instrumento con el ID dado existe en la base de datos
        Pedido existingPedido = iPedidoService.getById(id);
        if (existingPedido != null) {
            // Asignar el ID al instrumento que se va a actualizar
            pedido.setId(id);

            // Guardar el instrumento actualizado
            iPedidoService.save(pedido);
        } else {
            // Si no se encuentra el instrumento con el ID dado, lanzar una excepción o manejar el error según sea necesario
            throw new RuntimeException("El pedido con ID " + id + " no existe.");
        }
    }
}
