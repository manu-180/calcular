import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosIs: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "nullpunktur",
  ui: () => ({
    fijos: "Fastur kostnaður á mánuði",
    fijosAyuda: "Það sem þú borgar þótt þú seljir ekkert: leiga, föst laun, rafmagn, hugbúnaður og áskriftir.",
    precio: "Söluverð á einingu",
    variable: "Breytilegur kostnaður á einingu",
    variableAyuda: "Það sem hver seld eining kostar þig: efni, innkaup, þóknun og flutningur.",
    objetivo: "Hagnaður sem þú vilt á mánuði (valfrjálst)",
    objetivoAyuda: "Til að sjá hve mikið þú þarft að selja umfram það sem dekkar kostnaðinn.",
    unidades: "Einingar að núllpunkti",
    facturacion: "Velta við núllpunkt",
    contribucion: "Framlegð á einingu",
    contribucionAyuda: "Það sem hver sala skilar upp í fastan kostnað: verð að frádregnum breytilegum kostnaði.",
    contribucionPct: "Framlegðarhlutfall (%)",
    unidadesObjetivo: "Einingar fyrir hagnaðinn sem þú vilt",
    facturacionObjetivo: "Velta fyrir hagnaðinn sem þú vilt",
    errorPrecio: "Sláðu inn söluverð einnar einingar.",
    errorMargen: "Breytilegi kostnaðurinn er jafnhár verðinu eða hærri. Þú tapar á hverri sölu og nærð aldrei núllpunkti. Athugaðu verð og kostnað.",
    observacionRedondeo: "Fjöldi eininga er hækkaður upp í næstu heilu tölu, því þú getur ekki selt hluta úr einingu.",
  }),
};
