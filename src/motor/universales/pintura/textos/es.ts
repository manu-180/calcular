import { segunTrato, type TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litros" : "galones");

export const textosEs: TextosUi<UiPintura> = {
  slug: "cuanta-pintura-necesito",
  ui: (trato) => {
    const t = (tu: string, usted: string, vos: string) => segunTrato(trato, { tu, usted, vos });
    return {
      modo: t("¿Qué medidas tienes?", "¿Qué medidas tiene?", "¿Qué medidas tenés?"),
      modoMedidas: "Largo y alto de las paredes",
      modoSuperficie: "La superficie total",
      largo: (u) => `Largo total de las paredes (${u})`,
      largoAyuda: t(
        "La suma de todas las paredes que vas a pintar. En un cuarto, el perímetro.",
        "La suma de todas las paredes que va a pintar. En un cuarto, el perímetro.",
        "La suma de todas las paredes que vas a pintar. En un cuarto, el perímetro.",
      ),
      alto: (u) => `Alto de las paredes (${u})`,
      superficie: (u) => `Superficie a pintar (${u})`,
      aberturas: (u) => `Puertas y ventanas a descontar (${u})`,
      aberturasAyuda: "Una puerta mide unos 2 m² (21 ft²) y una ventana común, entre 1 y 2 m².",
      manos: "Cantidad de manos",
      rendimiento: (u) => `Rendimiento de la pintura (${u})`,
      rendimientoAyuda: t(
        "Viene en la lata: cuánta superficie cubre por mano. Si no lo sabes, deja el valor sugerido.",
        "Viene en la lata: cuánta superficie cubre por mano. Si no lo sabe, deje el valor sugerido.",
        "Viene en la lata: cuánta superficie cubre por mano. Si no lo sabés, dejá el valor sugerido.",
      ),
      recomendado: (u) => `Pintura a comprar (${volumen(u)})`,
      recomendadoAyuda: "Incluye un 10 % extra para retoques y lo que queda en el rodillo.",
      necesario: (u) => `Pintura justa (${volumen(u)})`,
      neta: (u) => `Superficie a pintar (${u})`,
      errorMedidas: t("Completa el largo y el alto de las paredes.", "Complete el largo y el alto de las paredes.", "Completá el largo y el alto de las paredes."),
      errorSuperficie: t("Completa la superficie a pintar.", "Complete la superficie a pintar.", "Completá la superficie a pintar."),
      errorAberturas: "Las puertas y ventanas no pueden ocupar toda la pared.",
      errorRendimiento: "El rendimiento tiene que ser mayor que 0.",
    };
  },
};
