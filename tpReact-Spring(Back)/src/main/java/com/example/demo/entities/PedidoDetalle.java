package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pedido_detalle")
@Getter
@Setter
@EqualsAndHashCode
public class PedidoDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer cantidad;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_instrumento")
    private Instrumento instrumento;
}
