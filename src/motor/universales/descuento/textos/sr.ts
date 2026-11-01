import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosSr: TextosUi<UiDescuento> = {
  slug: "kalkulator-popusta",
  ui: () => ({
    precio: "Početna cena",
    descuento: "Popust (%)",
    segundoDescuento: "Dodatni popust (%)",
    segundoDescuentoAyuda: "Ako se na sniženu cenu primenjuje još jedan popust, unesite ga ovde.",
    ahorro: "Ušteda",
    final: "Cena sa popustom",
    descuentoTotal: "Ukupan popust",
    errorMayorA100: "Popust ne može biti veći od 100%.",
    observacionDoble: (efectivo) => `Dva uzastopna popusta se ne sabiraju: zajedno smanjuju cenu za ${efectivo}%.`,
  }),
};
