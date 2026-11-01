import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosLv: TextosUi<UiCombustible> = {
  slug: "degvielas-kalkulators",
  ui: () => ({
    distancia: (u) => `Brauciena attālums (${u})`,
    idaYVuelta: "Turp un atpakaļ",
    tipoConsumo: "Kā norādīts patēriņš",
    l100: "Litri uz 100 km",
    kml: "Kilometri ar vienu litru",
    consumo: "Degvielas patēriņš",
    consumoAyuda: "To atradīsiet transportlīdzekļa dokumentos, auto rokasgrāmatā vai borta datorā. Uz šosejas patēriņš parasti ir mazāks nekā pilsētā.",
    consumoMpg: "Degvielas patēriņš (jūdzes ar galonu)",
    precio: (u) => (u === "L" ? "Litra cena" : "Galona cena"),
    personas: "Cik cilvēku dala izmaksas",
    costo: "Degvielas izmaksas",
    porPersona: "Vienam cilvēkam",
    combustible: (u) => (u === "L" ? "Vajadzīgā degviela (litros)" : "Vajadzīgā degviela (galonos)"),
    distanciaTotal: (u) => `Kopējais attālums (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Izmaksas uz vienu jūdzi" : "Izmaksas uz vienu kilometru"),
    errorConsumo: "Patēriņam jābūt lielākam par nulli.",
    errorPersonas: "Jābūt vismaz vienam cilvēkam.",
  }),
};
