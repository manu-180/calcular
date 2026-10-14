import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosIt: TextosUi<UiMargenDeGanancia> = {
  slug: "calcolo-margine-e-ricarico",
  ui: () => ({
    modo: "Cosa vuoi calcolare?",
    modoPrecio: "Il margine, da costo e prezzo",
    modoMargen: "Il prezzo per avere un certo margine",
    modoMarkup: "Il prezzo per avere un certo ricarico",
    costo: "Costo unitario",
    costoAyuda: "Quanto ti costa comprare o produrre un'unità, senza l'IVA che fai pagare al cliente.",
    precio: "Prezzo di vendita",
    precioAyuda: "Solo se calcoli il margine. IVA esclusa.",
    objetivo: "Margine o ricarico desiderato (%)",
    objetivoAyuda: "Solo se calcoli il prezzo.",
    precioResultado: "Prezzo di vendita",
    margen: "Margine di guadagno",
    margenAyuda: "Il guadagno in percentuale sul prezzo di vendita.",
    markup: "Ricarico",
    markupAyuda: "Il guadagno in percentuale sul costo.",
    ganancia: "Guadagno per unità",
    errorCosto: "Inserisci il costo di un'unità.",
    errorFaltaPrecio: "Inserisci il prezzo di vendita per calcolare il margine.",
    errorFaltaObjetivo: "Inserisci il margine o il ricarico che vuoi ottenere.",
    errorMargen100: "Il margine deve essere sotto il 100%: altrimenti tutto il prezzo sarebbe guadagno, senza nessun costo.",
    observacionPerdida: "A questo prezzo vendi sotto costo: ci perdi su ogni vendita.",
  }),
};
