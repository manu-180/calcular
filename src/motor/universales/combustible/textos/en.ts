import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosEn: TextosUi<UiCombustible> = {
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `Trip distance (${u})`,
    idaYVuelta: "Round trip",
    tipoConsumo: "How fuel economy is measured",
    l100: "Litres per 100 km",
    kml: "Kilometres per litre",
    consumo: "Fuel economy",
    consumoMpg: "Fuel economy (miles per gallon)",
    consumoAyuda: "Check the manual or the trip computer. Highway driving usually uses less than city driving.",
    precio: (u) => (u === "L" ? "Price per litre" : "Price per gallon"),
    personas: "People sharing the cost",
    costo: "Fuel cost",
    porPersona: "Per person",
    combustible: (u) => (u === "L" ? "Fuel needed (litres)" : "Fuel needed (gallons)"),
    distanciaTotal: (u) => `Total distance (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Cost per mile" : `Cost per ${u}`),
    errorConsumo: "Fuel economy has to be more than 0.",
    errorPersonas: "There has to be at least one person.",
  }),
};
