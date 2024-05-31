package com.example.demo.controllers;

import com.example.demo.entities.Pedido;
import com.example.demo.entities.PreferenceMP;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(value = "*")
@RestController
public class MercadoPagoController {
    public PreferenceMP getPreferenciaIdMercadoPago(Pedido pedido){
        try{
            MercadoPagoConfig.setAccessToken("TEST-5775570392810138-052511-96cb15a8071c1bc53e17a348c9333b5c-159808951");
            PreferenceItemRequest itemRequest= PreferenceItemRequest.builder()
                    .id("1234")
                    .title("Compra mercadoPago")
                    .description("Pedido realizado desde el carrito de compras")
                    .currencyId("ARG")
                    .quantity(1)
                    .unitPrice(new BigDecimal(pedido.getTotalPedido()))
                    .build();
            List <PreferenceItemRequest> items=new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/").failure("http://localhost:5173/instrumentos").build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backURL)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            PreferenceMP preferenceMpEntity = new PreferenceMP();
            preferenceMpEntity.setIdPreference(preference.getId());
            preferenceMpEntity.setStatusCode(preference.getResponse().getStatusCode());

            System.out.println("ID de preferencia antes de devolver: " + preferenceMpEntity.getIdPreference());

            return preferenceMpEntity;




        }catch(Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PostMapping("create_preference_mp")
    public PreferenceMP createPreferenciaMercadoPago(@RequestBody Pedido pedido) throws MPException, MPApiException {
        System.out.println("Pedido recibido desde el frontend:");
        System.out.println("ID: " + pedido.getId());
        System.out.println("Fecha del pedido: " + pedido.getFechaPedido());
        System.out.println("Total del pedido: " + pedido.getTotalPedido());
        MercadoPagoController cMercadoPago = new MercadoPagoController();
        PreferenceMP preferenceMP = cMercadoPago.getPreferenciaIdMercadoPago(pedido);
        return preferenceMP;
    }

}
