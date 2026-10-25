import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosFi: TextosUi<UiIva> = {
  slug: "alv-laskuri",
  ui: () => ({
    operacion: "Mitä haluat laskea?",
    agregar: "Lisää alv verottomaan hintaan",
    quitar: "Poista alv verollisesta hinnasta",
    monto: "Hinta",
    montoAyuda: "Veroton hinta, jos lisäät alv:n, tai verollinen hinta, jos poistat sen.",
    otraTasa: "Muu verokanta (%)",
    otraTasaAyuda: "Valinnainen. Jos tuotteeseen tai palveluun sovelletaan alennettua verokantaa, syötä se tähän. Muuten käytetään yleistä verokantaa.",
    neto: "Veroton hinta",
    impuesto: "Arvonlisävero",
    total: "Verollinen hinta",
    tasaUsada: "Käytetty verokanta",
    errorTasa: "Verokanta ei kelpaa.",
  }),
};
