import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosIt: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "calcolo-punto-di-pareggio",
  ui: () => ({
    fijos: "Costi fissi al mese",
    fijosAyuda: "Quello che paghi anche se non vendi niente: affitto, stipendi fissi, utenze, software.",
    precio: "Prezzo di vendita unitario",
    variable: "Costo variabile unitario",
    variableAyuda: "Quanto ti costa ogni unità venduta: materiali, merce, provvigioni, spedizioni.",
    objetivo: "Utile che vuoi ottenere al mese (facoltativo)",
    objetivoAyuda: "Per vedere quanto vendere oltre a coprire i costi.",
    unidades: "Unità per andare in pareggio",
    facturacion: "Fatturato per andare in pareggio",
    contribucion: "Margine di contribuzione unitario",
    contribucionAyuda: "Quello che ogni vendita lascia per pagare i costi fissi: prezzo meno costo variabile.",
    contribucionPct: "Margine di contribuzione (%)",
    unidadesObjetivo: "Unità per l'utile che vuoi",
    facturacionObjetivo: "Fatturato per l'utile che vuoi",
    errorPrecio: "Inserisci il prezzo di vendita di un'unità.",
    errorMargen: "Il costo variabile è uguale o superiore al prezzo: ogni vendita ti fa perdere soldi e non arrivi mai al pareggio. Controlla prezzo o costo.",
    observacionRedondeo: "Le unità sono arrotondate per eccesso, perché non si può vendere un pezzo di unità.",
  }),
};
