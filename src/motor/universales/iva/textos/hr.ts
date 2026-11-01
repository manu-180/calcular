import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosHr: TextosUi<UiIva> = {
  slug: "pdv-kalkulator",
  ui: () => ({
    operacion: "Što želite izračunati?",
    agregar: "Dodati PDV na cijenu bez PDV-a",
    quitar: "Izdvojiti PDV iz cijene s PDV-om",
    monto: "Cijena",
    montoAyuda: "Bez PDV-a ako porez dodajete. S PDV-om ako ga izdvajate.",
    otraTasa: "Druga stopa PDV-a (%)",
    otraTasaAyuda: "Nije obvezno. Ako roba ili usluga ima posebnu (nižu) stopu, unesite je ovdje. U suprotnom se koristi opća stopa.",
    neto: "Cijena bez PDV-a",
    impuesto: "PDV",
    total: "Cijena s PDV-om",
    tasaUsada: "Primijenjena stopa",
    errorTasa: "Stopa PDV-a nije ispravna.",
  }),
};
