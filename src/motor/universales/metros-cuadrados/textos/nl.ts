import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosNl: TextosUi<UiMetrosCuadrados> = {
  slug: "oppervlakte-berekenen",
  ui: () => ({
    forma: (n) => `Deel ${n}: vorm`,
    formaAyuda: "Is de ruimte L-vormig of onregelmatig? Verdeel hem in stukken en tel ze op.",
    ninguna: "Niet gebruikt",
    rectangulo: "Rechthoek of vierkant",
    triangulo: "Driehoek",
    circulo: "Cirkel",
    medidaA: (n, u) => `Deel ${n}: lengte, basis of diameter (${u})`,
    medidaAAyuda: "Rechthoek: lengte en breedte. Driehoek: basis en hoogte. Cirkel: alleen de diameter.",
    medidaB: (n, u) => `Deel ${n}: breedte of hoogte (${u})`,
    total: (u) => `Totale oppervlakte (${u})`,
    equivale: (u) => `Omgerekend in ${u}`,
    parcial: (n, u) => `Deel ${n} (${u})`,
    errorMedida: "Deze maat ontbreekt of is 0.",
  }),
};
