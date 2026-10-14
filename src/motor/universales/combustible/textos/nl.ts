import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosNl: TextosUi<UiCombustible> = {
  slug: "brandstofkosten-berekenen",
  ui: () => ({
    distancia: (u) => `Afstand van de rit (${u})`,
    idaYVuelta: "Heen en terug",
    tipoConsumo: "Hoe geef je het verbruik op?",
    l100: "Liter per 100 km",
    kml: "Kilometer per liter (1 op ...)",
    consumo: "Verbruik",
    consumoMpg: "Verbruik (mijl per gallon)",
    consumoAyuda: "Kijk in het instructieboekje of op de boordcomputer. Op de snelweg verbruik je meestal minder dan in de stad.",
    precio: (u) => (u === "L" ? "Prijs per liter" : "Prijs per gallon"),
    personas: "Aantal mensen dat meebetaalt",
    costo: "Brandstofkosten",
    porPersona: "Per persoon",
    combustible: (u) => (u === "L" ? "Benodigde brandstof (liter)" : "Benodigde brandstof (gallon)"),
    distanciaTotal: (u) => `Totale afstand (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Kosten per mijl" : `Kosten per ${u}`),
    errorConsumo: "Het verbruik moet hoger zijn dan 0.",
    errorPersonas: "Er moet minstens één persoon zijn.",
  }),
};
