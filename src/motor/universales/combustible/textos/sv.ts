import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosSv: TextosUi<UiCombustible> = {
  slug: "bensinkostnad",
  ui: () => ({
    distancia: (u) => `Resans längd (${u})`,
    idaYVuelta: "Tur och retur",
    tipoConsumo: "Hur förbrukningen anges",
    l100: "Liter per 100 km",
    kml: "Kilometer per liter",
    consumo: "Bränsleförbrukning",
    consumoMpg: "Bränsleförbrukning (miles per gallon)",
    consumoAyuda: "Titta i instruktionsboken eller färddatorn. På landsväg drar bilen oftast mindre än i stan. Liter per mil gånger 10 ger liter per 100 km.",
    precio: (u) => (u === "L" ? "Pris per liter" : "Pris per gallon"),
    personas: "Antal som delar på kostnaden",
    costo: "Bränslekostnad",
    porPersona: "Per person",
    combustible: (u) => (u === "L" ? "Bränsle som går åt (liter)" : "Bränsle som går åt (gallon)"),
    distanciaTotal: (u) => `Total sträcka (${u})`,
    costoPorDistancia: (u) => `Kostnad per ${u}`,
    errorConsumo: "Förbrukningen måste vara större än 0.",
    errorPersonas: "Det måste vara minst en person.",
  }),
};
