import { percento } from "../../comun/italiano";
import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

const comeNumero = (s: string) => new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 }).format(Number(s));

export const textosIt: TextosUi<UiDescuento> = {
  slug: "calcolo-sconto",
  ui: () => ({
    precio: "Prezzo originale",
    descuento: "Sconto (%)",
    segundoDescuento: "Sconto aggiuntivo (%)",
    segundoDescuentoAyuda: "Se c'è un altro sconto oltre al primo, inseriscilo qui.",
    ahorro: "Quanto risparmi",
    final: "Prezzo scontato",
    descuentoTotal: "Sconto totale",
    errorMayorA100: "Lo sconto non può superare il 100%.",
    observacionDoble: (efectivo) =>
      `Due sconti di fila non si sommano: insieme fanno uno sconto ${percento(comeNumero(efectivo), "di")}.`,
  }),
};
