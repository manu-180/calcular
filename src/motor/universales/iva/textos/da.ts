import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosDa: TextosUi<UiIva> = {
  slug: "momsberegner",
  ui: () => ({
    operacion: "Hvad vil du beregne?",
    agregar: "Læg moms til en pris uden moms",
    quitar: "Træk momsen ud af en pris med moms",
    monto: "Pris",
    montoAyuda: "Uden moms, hvis du lægger den til. Med moms, hvis du trækker den ud.",
    otraTasa: "Anden momssats (%)",
    otraTasaAyuda: "Valgfrit. Har varen eller ydelsen en anden momssats, så skriv den her. Ellers bruges standardsatsen.",
    neto: "Pris uden moms",
    impuesto: "Moms",
    total: "Pris med moms",
    tasaUsada: "Momssats, der bruges",
    errorTasa: "Momssatsen er ikke gyldig.",
  }),
};
