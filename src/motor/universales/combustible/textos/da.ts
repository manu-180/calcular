import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosDa: TextosUi<UiCombustible> = {
  slug: "braendstofberegner",
  ui: () => ({
    distancia: (u) => `Turens længde (${u})`,
    idaYVuelta: "Tur retur",
    tipoConsumo: "Hvordan forbruget er angivet",
    l100: "Liter pr. 100 km",
    kml: "Kilometer pr. liter (km/l)",
    consumo: "Brændstofforbrug",
    consumoMpg: "Brændstofforbrug (miles per gallon)",
    consumoAyuda: "Se i instruktionsbogen eller på bilens display. I Danmark står forbruget oftest i km/l. På landevej bruger bilen som regel mindre end i byen.",
    precio: (u) => (u === "L" ? "Pris pr. liter" : "Pris pr. gallon"),
    personas: "Antal, der deler udgiften",
    costo: "Brændstofudgift",
    porPersona: "Pr. person",
    combustible: (u) => (u === "L" ? "Brændstof, der går til (liter)" : "Brændstof, der går til (gallon)"),
    distanciaTotal: (u) => `Samlet strækning (${u})`,
    costoPorDistancia: (u) => `Udgift pr. ${u}`,
    errorConsumo: "Forbruget skal være større end 0.",
    errorPersonas: "Der skal være mindst én person.",
  }),
};
