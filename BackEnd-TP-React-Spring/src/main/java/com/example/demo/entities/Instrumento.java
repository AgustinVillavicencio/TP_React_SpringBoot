package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "instrumento")
@Getter
@Setter
@EqualsAndHashCode
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private Double precio;
    private String costoEnvio;
    private Integer cantidadVendida;
    private String descripcion;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;
}