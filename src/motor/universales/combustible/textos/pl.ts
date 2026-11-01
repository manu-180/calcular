import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosPl: TextosUi<UiCombustible> = {
  slug: "kalkulator-kosztow-przejazdu",
  ui: () => ({
    distancia: (u) => `Długość trasy (${u})`,
    idaYVuelta: "Tam i z powrotem",
    tipoConsumo: "Jak podajesz spalanie",
    l100: "Litry na 100 km",
    kml: "Kilometry na litr",
    consumo: "Spalanie",
    consumoMpg: "Spalanie (mile na galon)",
    consumoAyuda: "Sprawdź w instrukcji albo w komputerze pokładowym. Na trasie auto zwykle pali mniej niż w mieście.",
    precio: (u) => (u === "L" ? "Cena za litr" : "Cena za galon"),
    personas: "Liczba osób, które dzielą koszt",
    costo: "Koszt paliwa",
    porPersona: "Na osobę",
    combustible: (u) => (u === "L" ? "Potrzebne paliwo (litry)" : "Potrzebne paliwo (galony)"),
    distanciaTotal: (u) => `Łączna trasa (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Koszt za milę" : `Koszt za 1 ${u}`),
    errorConsumo: "Spalanie musi być większe od 0.",
    errorPersonas: "Musi być co najmniej jedna osoba.",
  }),
};
