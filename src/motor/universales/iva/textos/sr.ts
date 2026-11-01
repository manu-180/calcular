import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosSr: TextosUi<UiIva> = {
  slug: "pdv-kalkulator",
  ui: () => ({
    operacion: "Šta želite da izračunate?",
    agregar: "Dodati PDV na cenu bez PDV-a",
    quitar: "Izdvojiti PDV iz cene sa PDV-om",
    monto: "Cena",
    montoAyuda: "Bez PDV-a ako porez dodajete. Sa PDV-om ako ga izdvajate.",
    otraTasa: "Druga stopa PDV-a (%)",
    otraTasaAyuda: "Nije obavezno. Ako roba ili usluga ima posebnu (nižu) stopu, unesite je ovde. U suprotnom se koristi opšta stopa.",
    neto: "Cena bez PDV-a",
    impuesto: "PDV",
    total: "Cena sa PDV-om",
    tasaUsada: "Primenjena stopa",
    errorTasa: "Stopa PDV-a nije ispravna.",
  }),
};
