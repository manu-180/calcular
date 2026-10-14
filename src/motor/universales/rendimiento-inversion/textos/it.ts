import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosIt: TextosUi<UiRendimientoInversion> = {
  slug: "calcolo-rendimento-investimento",
  ui: () => ({
    inicial: "Capitale investito",
    final: "Valore finale",
    finalAyuda: "Quanto vale oggi l'investimento, o quanto hai incassato quando l'hai venduto.",
    cobrado: "Proventi incassati nel frattempo (facoltativo)",
    cobradoAyuda: "Dividendi, cedole, interessi o affitti che hai incassato e non hai reinvestito.",
    anios: "Anni di investimento",
    aniosAyuda: "Puoi usare i decimali per le frazioni di anno, per esempio 1,5 per un anno e mezzo.",
    ganancia: "Guadagno",
    roi: "Rendimento totale (ROI)",
    cagr: "Rendimento annuo (CAGR)",
    cagrAyuda: "Il rendimento annuo che, composto anno dopo anno, porta allo stesso risultato.",
    errorInicial: "Inserisci quanto hai investito all'inizio.",
    observacionCorto: "Per meno di un anno, il rendimento annuo allunga un risultato breve come se si ripetesse per tutto l'anno. Leggilo con cautela.",
    observacionInflacion: "Per capire se hai guadagnato potere d'acquisto, confronta il rendimento annuo con l'inflazione dello stesso periodo.",
  }),
};
