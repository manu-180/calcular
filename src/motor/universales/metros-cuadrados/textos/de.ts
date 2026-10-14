import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosDe: TextosUi<UiMetrosCuadrados> = {
  slug: "quadratmeter-rechner",
  ui: () => ({
    forma: (n) => `Fläche ${n}: Form`,
    formaAyuda: "Ist der Raum L-förmig oder unregelmäßig, teilen Sie ihn in Teilflächen auf. Der Rechner zählt sie zusammen.",
    ninguna: "Nicht verwendet",
    rectangulo: "Rechteck oder Quadrat",
    triangulo: "Dreieck",
    circulo: "Kreis",
    medidaA: (n, u) => `Fläche ${n}: Länge, Grundseite oder Durchmesser (${u})`,
    medidaAAyuda: "Rechteck: Länge und Breite. Dreieck: Grundseite und Höhe. Kreis: nur der Durchmesser.",
    medidaB: (n, u) => `Fläche ${n}: Breite oder Höhe (${u})`,
    total: (u) => `Gesamtfläche (${u})`,
    equivale: (u) => `Entspricht in ${u}`,
    parcial: (n, u) => `Fläche ${n} (${u})`,
    errorMedida: "Dieses Maß fehlt oder ist 0.",
  }),
};
