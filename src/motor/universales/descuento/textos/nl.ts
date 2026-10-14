import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosNl: TextosUi<UiDescuento> = {
  slug: "korting-berekenen",
  ui: () => ({
    precio: "Oorspronkelijke prijs",
    descuento: "Korting (%)",
    segundoDescuento: "Extra korting (%)",
    segundoDescuentoAyuda: "Krijg je nog een korting bovenop de eerste? Vul die hier in.",
    ahorro: "Je bespaart",
    final: "Prijs na korting",
    descuentoTotal: "Totale korting",
    errorMayorA100: "Een korting kan niet hoger zijn dan 100%.",
    observacionDoble: (efectivo) => `Twee kortingen na elkaar tel je niet zomaar op: samen gaat er ${efectivo}% af.`,
  }),
};
