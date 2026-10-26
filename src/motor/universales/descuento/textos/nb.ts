import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosNb: TextosUi<UiDescuento> = {
  slug: "rabattkalkulator",
  ui: () => ({
    precio: "Ordinær pris",
    descuento: "Rabatt (%)",
    segundoDescuento: "Ekstra rabatt (%)",
    segundoDescuentoAyuda: "Får du enda en rabatt på den nedsatte prisen, fyller du den inn her.",
    ahorro: "Du sparer",
    final: "Pris etter rabatt",
    descuentoTotal: "Samlet rabatt",
    errorMayorA100: "En rabatt kan ikke være mer enn 100 %.",
    observacionDoble: (efectivo) => `To rabatter etter hverandre kan ikke bare legges sammen. Til sammen sparer du ${efectivo} %.`,
  }),
};
