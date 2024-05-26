import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { createPreferenceMP } from "../Functions/FunctionsApi";
import PreferenceMP from "../Entities/PreferenceMP";
import Pedido from "../Entities/Pedido";

interface CheckOutMPProps {
    pedido: Pedido;
}

export default function CheckOutMP({ pedido }: CheckOutMPProps) {
    const [idPreference, setIdPreference] = useState<string>("");

    useEffect(() => {
        console.log("ID de preferencia recibido: " + idPreference);
    }, [idPreference]);

    const getPreferenceMP = async () => {
        try {
            const response: PreferenceMP = await createPreferenceMP({
                id: pedido.id,
                fechaPedido: pedido.fechaPedido,
                totalPedido: pedido.totalPedido,
            });
            console.log("Preference id: " + response.idPreference);
            if (response && response.idPreference) {
                setIdPreference(response.idPreference);
            }
        } catch (error) {
            console.error("Error creating preference: ", error);
            alert(
                "Hubo un error al crear la preferencia. Por favor, inténtelo de nuevo."
            );
        }
    };

    useEffect(() => {
        initMercadoPago("TEST-0666cae6-68fe-476a-852f-d3a0cd255ba8", {
            locale: "es-AR",
        });
    }, []);

    return (
        <div>
            <button onClick={getPreferenceMP} className="btMercadoPago">
                COMPRAR con <br /> Mercado Pago
            </button>
            <div className={idPreference ? "divVisible" : "divInvisible"}>
                {idPreference && (
                    <Wallet
                        initialization={{
                            preferenceId: idPreference,
                            redirectMode: "blank",
                        }}
                        customization={{ texts: { valueProp: "smart_option" } }}
                    />
                )}
            </div>
        </div>
    );
}
