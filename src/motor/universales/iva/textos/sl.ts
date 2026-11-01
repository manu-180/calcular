import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosSl: TextosUi<UiIva> = {
  slug: "izracun-ddv",
  ui: () => ({
    operacion: "Kaj želite izračunati?",
    agregar: "Dodati DDV ceni brez DDV",
    quitar: "Izločiti DDV iz cene z DDV",
    monto: "Cena",
    montoAyuda: "Brez DDV, če davek dodajate. Z DDV, če ga izločate.",
    otraTasa: "Druga stopnja DDV (%)",
    otraTasaAyuda: "Neobvezno. Če ima blago ali storitev posebno (nižjo) stopnjo, jo vnesite tukaj. Sicer se uporabi splošna stopnja.",
    neto: "Cena brez DDV",
    impuesto: "DDV",
    total: "Cena z DDV",
    tasaUsada: "Uporabljena stopnja",
    errorTasa: "Stopnja DDV ni pravilna.",
  }),
};
