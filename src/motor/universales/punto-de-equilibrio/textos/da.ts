import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosDa: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "nulpunktsberegner",
  ui: () => ({
    fijos: "Faste omkostninger om måneden",
    fijosAyuda: "Det, du betaler, selv om du ikke sælger noget: husleje, faste lønninger, el, software og abonnementer.",
    precio: "Salgspris pr. stk.",
    variable: "Variable omkostninger pr. stk.",
    variableAyuda: "Hvad hver solgt enhed koster dig: materialer, indkøb, provision og fragt.",
    objetivo: "Ønsket overskud om måneden (valgfrit)",
    objetivoAyuda: "Så du kan se, hvor meget du skal sælge ud over det, der dækker omkostningerne.",
    unidades: "Antal enheder til nulpunktet",
    facturacion: "Nulpunktsomsætning",
    contribucion: "Dækningsbidrag pr. stk.",
    contribucionAyuda: "Det, hvert salg bidrager med til de faste omkostninger: salgspris minus variable omkostninger.",
    contribucionPct: "Dækningsgrad (%)",
    unidadesObjetivo: "Antal enheder for dit ønskede overskud",
    facturacionObjetivo: "Omsætning for dit ønskede overskud",
    errorPrecio: "Skriv salgsprisen for én enhed.",
    errorMargen: "De variable omkostninger er lige så høje som prisen eller højere. Hvert salg giver underskud, og du når aldrig nulpunktet. Tjek pris og omkostninger.",
    observacionRedondeo: "Antallet af enheder rundes op, fordi du ikke kan sælge en del af en enhed.",
  }),
};
