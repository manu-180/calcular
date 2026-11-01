import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosSl: TextosUi<UiDescuento> = {
  slug: "izracun-popusta",
  ui: () => ({
    precio: "Začetna cena",
    descuento: "Popust (%)",
    segundoDescuento: "Dodatni popust (%)",
    segundoDescuentoAyuda: "Če se na znižano ceno uveljavi še en popust, ga vnesite tukaj.",
    ahorro: "Prihranek",
    final: "Cena s popustom",
    descuentoTotal: "Skupni popust",
    errorMayorA100: "Popust ne more biti večji od 100 %.",
    observacionDoble: (efectivo) => `Dva zaporedna popusta se ne seštejeta: skupaj znižata ceno za ${efectivo} %.`,
  }),
};
