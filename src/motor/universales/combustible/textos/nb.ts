import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosNb: TextosUi<UiCombustible> = {
  slug: "drivstoffkalkulator",
  ui: () => ({
    distancia: (u) => `Lengden på turen (${u})`,
    idaYVuelta: "Tur-retur",
    tipoConsumo: "Hvordan forbruket er oppgitt",
    l100: "Liter per 100 km",
    kml: "Kilometer per liter (km/l)",
    consumo: "Drivstofforbruk",
    consumoMpg: "Drivstofforbruk (miles per gallon)",
    consumoAyuda: "Se i instruksjonsboken eller på displayet i bilen. Står forbruket i liter per mil, gang med 10 for å få liter per 100 km. På landevei bruker bilen som regel mindre enn i byen.",
    precio: (u) => (u === "L" ? "Pris per liter" : "Pris per gallon"),
    personas: "Antall som deler kostnaden",
    costo: "Drivstoffkostnad",
    porPersona: "Per person",
    combustible: (u) => (u === "L" ? "Drivstoff som går med (liter)" : "Drivstoff som går med (gallon)"),
    distanciaTotal: (u) => `Samlet strekning (${u})`,
    costoPorDistancia: (u) => `Kostnad per ${u}`,
    errorConsumo: "Forbruket må være større enn 0.",
    errorPersonas: "Det må være minst én person.",
  }),
};
