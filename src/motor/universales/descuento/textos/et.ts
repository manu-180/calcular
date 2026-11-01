import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosEt: TextosUi<UiDescuento> = {
  slug: "allahindluse-kalkulaator",
  ui: () => ({
    precio: "Tavahind",
    descuento: "Allahindlus (%)",
    segundoDescuento: "Lisaallahindlus (%)",
    segundoDescuentoAyuda: "Kui saad alandatud hinnalt veel lisaallahindlust, sisesta see siia.",
    ahorro: "Säästad",
    final: "Soodushind",
    descuentoTotal: "Allahindlus kokku",
    errorMayorA100: "Allahindlus ei saa olla üle 100%.",
    observacionDoble: (efectivo) => `Kahte järjestikust allahindlust ei saa lihtsalt kokku liita. Kokku säästad ${efectivo}%.`,
  }),
};
