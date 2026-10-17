import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

const textos: TextosUi<UiCombustible> = {
  slug: "spritkosten-rechner",
  ui: () => ({
    distancia: (u) => `Strecke (${u})`,
    idaYVuelta: "Hin- und Rückfahrt",
    tipoConsumo: "Wie wird der Verbrauch angegeben?",
    l100: "Liter pro 100 km",
    kml: "Kilometer pro Liter",
    consumo: "Verbrauch",
    consumoMpg: "Verbrauch (Meilen pro Gallone)",
    consumoAyuda: "Steht in der Bedienungsanleitung oder im Bordcomputer. Auf der Autobahn ist er meist niedriger als in der Stadt.",
    precio: (u) => (u === "L" ? "Preis pro Liter" : "Preis pro Gallone"),
    personas: "Personen, die sich die Kosten teilen",
    costo: "Spritkosten",
    porPersona: "Pro Person",
    combustible: (u) => (u === "L" ? "Benötigter Kraftstoff (Liter)" : "Benötigter Kraftstoff (Gallonen)"),
    distanciaTotal: (u) => `Gesamtstrecke (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Kosten pro Meile" : `Kosten pro ${u}`),
    errorConsumo: "Der Verbrauch muss über 0 liegen.",
    errorPersonas: "Es muss mindestens eine Person sein.",
  }),
};

export const textosDe = textosConSuiza(textos);
