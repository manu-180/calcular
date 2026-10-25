import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosDa: TextosUi<UiMargenDeGanancia> = {
  slug: "avanceberegner",
  ui: () => ({
    modo: "Hvad vil du beregne?",
    modoPrecio: "Dækningsgraden ud fra kostpris og salgspris",
    modoMargen: "Salgsprisen for en bestemt dækningsgrad",
    modoMarkup: "Salgsprisen for en bestemt avance på kostprisen",
    costo: "Kostpris pr. stk.",
    costoAyuda: "Hvad det koster at købe ind eller fremstille én enhed, uden moms.",
    precio: "Salgspris",
    precioAyuda: "Kun hvis du beregner dækningsgraden. Uden moms.",
    objetivo: "Ønsket dækningsgrad eller avance (%)",
    objetivoAyuda: "Kun hvis du beregner salgsprisen.",
    precioResultado: "Salgspris",
    margen: "Dækningsgrad",
    margenAyuda: "Fortjenesten i procent af salgsprisen.",
    markup: "Avance på kostprisen",
    markupAyuda: "Fortjenesten i procent af kostprisen.",
    ganancia: "Fortjeneste pr. stk.",
    errorCosto: "Skriv kostprisen for én enhed.",
    errorFaltaPrecio: "Skriv salgsprisen for at beregne dækningsgraden.",
    errorFaltaObjetivo: "Skriv den dækningsgrad eller avance, du vil nå.",
    errorMargen100: "Dækningsgraden skal være under 100 %. Ellers ville hele prisen være fortjeneste uden nogen omkostning.",
    observacionPerdida: "Til den pris sælger du under kostprisen og taber penge på hvert salg.",
  }),
};
