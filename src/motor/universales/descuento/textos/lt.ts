import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosLt: TextosUi<UiDescuento> = {
  slug: "nuolaidos-skaiciuokle",
  ui: () => ({
    precio: "Pradinė kaina",
    descuento: "Nuolaida (%)",
    segundoDescuento: "Papildoma nuolaida (%)",
    segundoDescuentoAyuda: "Jei taikoma dar viena nuolaida, įveskite ją čia.",
    ahorro: "Sutaupote",
    final: "Kaina su nuolaida",
    descuentoTotal: "Bendra nuolaida",
    errorMayorA100: "Nuolaida negali būti didesnė nei 100 %.",
    observacionDoble: (efectivo) => `Dvi nuolaidos iš eilės nesusideda: kartu jos sumažina kainą ${efectivo} %.`,
  }),
};
