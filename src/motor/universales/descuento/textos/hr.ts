import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosHr: TextosUi<UiDescuento> = {
  slug: "kalkulator-popusta",
  ui: () => ({
    precio: "Početna cijena",
    descuento: "Popust (%)",
    segundoDescuento: "Dodatni popust (%)",
    segundoDescuentoAyuda: "Ako se na sniženu cijenu primjenjuje još jedan popust, unesite ga ovdje.",
    ahorro: "Ušteda",
    final: "Cijena s popustom",
    descuentoTotal: "Ukupan popust",
    errorMayorA100: "Popust ne može biti veći od 100 %.",
    observacionDoble: (efectivo) => `Dva uzastopna popusta se ne zbrajaju: zajedno smanjuju cijenu za ${efectivo} %.`,
  }),
};
