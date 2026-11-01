import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

// La definición pasa «km»/«mi» y «km/h»/«mph»; en búlgaro se escriben «км», «миля», «км/ч» y «мили/ч».
const corta = (u: string) => (u === "mi" ? "мили" : "км");
const una = (u: string) => (u === "mi" ? "миля" : "км");
const velocidad = (u: string) => (u === "mph" ? "мили/ч" : "км/ч");

export const textosBg: TextosUi<UiRitmo> = {
  slug: "tempo-na-byagane",
  ui: () => ({
    calcular: "Какво искате да изчислите?",
    calcRitmo: "Темпо (от разстояние и време)",
    calcTiempo: "Време (от разстояние и темпо)",
    calcDistancia: "Разстояние (от време и темпо)",
    distancia: "Разстояние",
    distanciaAyuda: "Изберете състезание или „Друго“, за да въведете свое разстояние.",
    otra: "Друго",
    cincoK: "5 км",
    diezK: "10 км",
    media: "Полумаратон",
    maraton: "Маратон",
    distanciaOtra: (u) => `Друго разстояние (${corta(u)})`,
    horas: "Време: часове",
    minutos: "Време: минути",
    segundos: "Време: секунди",
    ritmoMin: (u) => `Темпо: минути на ${una(u)}`,
    ritmoSeg: "Темпо: секунди",
    ritmo: (u) => `Темпо (мин/${una(u)})`,
    tiempo: "Крайно време",
    distanciaRes: (u) => `Разстояние (${corta(u)})`,
    velocidad: (u) => `Средна скорост (${velocidad(u)})`,
    errorDistancia: "Въведете разстояние над 0.",
    errorTiempo: "Въведете времето: часове, минути или секунди.",
    errorRitmo: "Въведете темпото: минути и секунди на единица разстояние.",
  }),
};
