import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosEn: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "What do you want to work out?",
    calcRitmo: "Pace (from distance and time)",
    calcTiempo: "Time (from distance and pace)",
    calcDistancia: "Distance (from time and pace)",
    distancia: "Distance",
    distanciaAyuda: "Pick a race, or “Other” to type in a distance.",
    otra: "Other distance",
    cincoK: "5K",
    diezK: "10K",
    media: "Half marathon",
    maraton: "Marathon",
    distanciaOtra: (u) => `Other distance (${u})`,
    horas: "Time: hours",
    minutos: "Time: minutes",
    segundos: "Time: seconds",
    ritmoMin: (u) => `Pace: minutes per ${u}`,
    ritmoSeg: "Pace: seconds",
    ritmo: (u) => `Pace (min/${u})`,
    tiempo: "Finish time",
    distanciaRes: (u) => `Distance (${u})`,
    velocidad: (u) => `Average speed (${u})`,
    errorDistancia: "Enter a distance above 0.",
    errorTiempo: "Enter the time: hours, minutes or seconds.",
    errorRitmo: "Enter the pace: minutes and seconds per unit of distance.",
  }),
};
