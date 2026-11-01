import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosRo: TextosUi<UiDescuento> = {
  slug: "calculator-reducere",
  ui: () => ({
    precio: "Prețul inițial",
    descuento: "Reducere (%)",
    segundoDescuento: "Reducere suplimentară (%)",
    segundoDescuentoAyuda: "Dacă se mai aplică o reducere peste prima, introduceți-o aici.",
    ahorro: "Economisiți",
    final: "Prețul final",
    descuentoTotal: "Reducerea totală",
    errorMayorA100: "O reducere nu poate fi mai mare de 100%.",
    observacionDoble: (efectivo) => `Două reduceri succesive nu se adună: împreună scad prețul cu ${efectivo}%.`,
  }),
};
