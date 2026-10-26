import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosNb: TextosUi<UiIva> = {
  slug: "mva-kalkulator",
  ui: () => ({
    operacion: "Hva vil du regne ut?",
    agregar: "Legg mva. til en pris eks. mva.",
    quitar: "Trekk ut mva. fra en pris inkl. mva.",
    monto: "Pris",
    montoAyuda: "Eks. mva. hvis du legger den til. Inkl. mva. hvis du trekker den ut.",
    otraTasa: "Annen mva-sats (%)",
    otraTasaAyuda: "Valgfritt. Har varen eller tjenesten en annen mva-sats, fyll den inn her. Ellers brukes den alminnelige satsen.",
    neto: "Pris eks. mva.",
    impuesto: "Mva.",
    total: "Pris inkl. mva.",
    tasaUsada: "Mva-sats som brukes",
    errorTasa: "Mva-satsen er ikke gyldig.",
  }),
};
