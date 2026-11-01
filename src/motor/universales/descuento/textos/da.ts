import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosDa: TextosUi<UiDescuento> = {
  slug: "rabatberegner",
  ui: () => ({
    precio: "Normalpris",
    descuento: "Rabat (%)",
    segundoDescuento: "Ekstra rabat (%)",
    segundoDescuentoAyuda: "Får du endnu en rabat på den nedsatte pris, så skriv den her.",
    ahorro: "Du sparer",
    final: "Pris efter rabat",
    descuentoTotal: "Samlet rabat",
    errorMayorA100: "En rabat kan ikke være mere end 100 %.",
    observacionDoble: (efectivo) => `To rabatter efter hinanden lægges ikke bare sammen. Tilsammen sparer du ${efectivo} %.`,
  }),
};
