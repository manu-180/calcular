import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosIt: TextosUi<UiIva> = {
  slug: "calcolo-iva",
  ui: () => ({
    operacion: "Cosa vuoi fare?",
    agregar: "Aggiungere l'IVA a un prezzo netto",
    quitar: "Scorporare l'IVA da un prezzo ivato",
    monto: "Prezzo",
    montoAyuda: "Netto se vuoi aggiungere l'IVA, IVA inclusa se vuoi scorporarla.",
    otraTasa: "Altra aliquota (%)",
    otraTasaAyuda: "Facoltativo. Se il tuo prodotto ha un'aliquota ridotta, inseriscila qui. Altrimenti si usa quella ordinaria.",
    neto: "Imponibile (prezzo senza IVA)",
    impuesto: "IVA",
    total: "Prezzo IVA inclusa",
    tasaUsada: "Aliquota applicata",
    errorTasa: "L'aliquota IVA non è valida.",
  }),
};
