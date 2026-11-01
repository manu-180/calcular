import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosLt: TextosUi<UiRitmo> = {
  slug: "begimo-tempo-skaiciuokle",
  ui: () => ({
    calcular: "Ką norite apskaičiuoti?",
    calcRitmo: "Tempą (pagal atstumą ir laiką)",
    calcTiempo: "Laiką (pagal atstumą ir tempą)",
    calcDistancia: "Atstumą (pagal laiką ir tempą)",
    distancia: "Atstumas",
    distanciaAyuda: "Pasirinkite bėgimo rungtį arba „Kitas atstumas“ ir įveskite savo.",
    otra: "Kitas atstumas",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Pusmaratonis",
    maraton: "Maratonas",
    distanciaOtra: (u) => `Kitas atstumas (${u})`,
    horas: "Laikas: valandos",
    minutos: "Laikas: minutės",
    segundos: "Laikas: sekundės",
    ritmoMin: (u) => `Tempas: minutės (min/${u})`,
    ritmoSeg: "Tempas: sekundės",
    ritmo: (u) => `Tempas (min/${u})`,
    tiempo: "Laikas finiše",
    distanciaRes: (u) => `Atstumas (${u})`,
    velocidad: (u) => `Vidutinis greitis (${u})`,
    errorDistancia: "Įveskite didesnį nei 0 atstumą.",
    errorTiempo: "Įveskite laiką: valandas, minutes arba sekundes.",
    errorRitmo: "Įveskite tempą: minutes ir sekundes atstumo vienetui.",
  }),
};
