import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosSv: TextosUi<UiDescuento> = {
  slug: "rabattkalkylator",
  ui: () => ({
    precio: "Ordinarie pris",
    descuento: "Rabatt (%)",
    segundoDescuento: "Extra rabatt (%)",
    segundoDescuentoAyuda: "Får du ytterligare rabatt på det nedsatta priset, fyll i den här.",
    ahorro: "Du sparar",
    final: "Pris efter rabatt",
    descuentoTotal: "Total rabatt",
    errorMayorA100: "En rabatt kan inte vara mer än 100 %.",
    observacionDoble: (efectivo) => `Två rabatter efter varandra läggs inte ihop rakt av. Tillsammans sparar du ${efectivo} %.`,
  }),
};
