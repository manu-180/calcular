import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosCs: TextosUi<UiCombustible> = {
  slug: "kalkulacka-spotreby-paliva",
  ui: () => ({
    distancia: (u) => `Délka cesty (${u})`,
    idaYVuelta: "Tam i zpět",
    tipoConsumo: "Jak je uvedená spotřeba",
    l100: "Litrů na 100 km",
    kml: "Kilometrů na litr",
    consumo: "Spotřeba paliva",
    consumoAyuda: "Najdete ji v technickém průkazu, v návodu k autu nebo v palubním počítači. Na dálnici bývá spotřeba nižší než ve městě.",
    consumoMpg: "Spotřeba paliva (mil na galon)",
    precio: (u) => (u === "L" ? "Cena za litr" : "Cena za galon"),
    personas: "Kolik lidí se dělí o náklady",
    costo: "Náklady na palivo",
    porPersona: "Na osobu",
    combustible: (u) => (u === "L" ? "Potřebné palivo (litry)" : "Potřebné palivo (galony)"),
    distanciaTotal: (u) => `Celková vzdálenost (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Náklady na jednu míli" : "Náklady na jeden kilometr"),
    errorConsumo: "Spotřeba musí být větší než nula.",
    errorPersonas: "Musí to být aspoň jedna osoba.",
  }),
};
