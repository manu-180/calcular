import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosIs: TextosUi<UiDescuento> = {
  slug: "afslattur",
  ui: () => ({
    precio: "Upprunalegt verð",
    descuento: "Afsláttur (%)",
    segundoDescuento: "Aukaafsláttur (%)",
    segundoDescuentoAyuda: "Ef þú færð frekari afslátt af lækkaða verðinu, sláðu hann inn hér.",
    ahorro: "Þú sparar",
    final: "Verð eftir afslátt",
    descuentoTotal: "Heildarafsláttur",
    errorMayorA100: "Afsláttur getur ekki verið meira en 100%.",
    observacionDoble: (efectivo) => `Tveir afslættir í röð leggjast ekki einfaldlega saman. Samtals sparar þú ${efectivo}%.`,
  }),
};
