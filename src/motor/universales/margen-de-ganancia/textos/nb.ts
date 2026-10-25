import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosNb: TextosUi<UiMargenDeGanancia> = {
  slug: "fortjenestemargin",
  ui: () => ({
    modo: "Hva vil du regne ut?",
    modoPrecio: "Dekningsgraden ut fra kostpris og salgspris",
    modoMargen: "Salgsprisen for en bestemt dekningsgrad",
    modoMarkup: "Salgsprisen for et bestemt påslag på kostprisen",
    costo: "Kostpris per enhet",
    costoAyuda: "Hva det koster å kjøpe inn eller lage én enhet, eks. mva.",
    precio: "Salgspris",
    precioAyuda: "Bare hvis du regner ut dekningsgraden. Eks. mva.",
    objetivo: "Ønsket dekningsgrad eller påslag (%)",
    objetivoAyuda: "Bare hvis du regner ut salgsprisen.",
    precioResultado: "Salgspris",
    margen: "Dekningsgrad",
    margenAyuda: "Fortjenesten i prosent av salgsprisen.",
    markup: "Påslag på kostprisen",
    markupAyuda: "Fortjenesten i prosent av kostprisen.",
    ganancia: "Fortjeneste per enhet",
    errorCosto: "Fyll inn kostprisen for én enhet.",
    errorFaltaPrecio: "Fyll inn salgsprisen for å regne ut dekningsgraden.",
    errorFaltaObjetivo: "Fyll inn dekningsgraden eller påslaget du vil nå.",
    errorMargen100: "Dekningsgraden må være under 100 %. Ellers ville hele prisen vært fortjeneste uten noen kostnad.",
    observacionPerdida: "Til denne prisen selger du under kostpris og taper penger på hvert salg.",
  }),
};
