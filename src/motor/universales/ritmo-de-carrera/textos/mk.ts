import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

// La definición pasa «km»/«mi» y «km/h»/«mph»; en macedonio se escriben «км», «милја», «км/ч» y «милји/ч».
const corta = (u: string) => (u === "mi" ? "милји" : "км");
const una = (u: string) => (u === "mi" ? "милја" : "км");
const velocidad = (u: string) => (u === "mph" ? "милји/ч" : "км/ч");

export const textosMk: TextosUi<UiRitmo> = {
  slug: "kalkulator-za-tempo-na-trchanje",
  ui: () => ({
    calcular: "Што сакате да пресметате?",
    calcRitmo: "Темпо (од растојание и време)",
    calcTiempo: "Време (од растојание и темпо)",
    calcDistancia: "Растојание (од време и темпо)",
    distancia: "Растојание",
    distanciaAyuda: "Изберете трка или „Друго“ за да внесете свое растојание.",
    otra: "Друго",
    cincoK: "5 км",
    diezK: "10 км",
    media: "Полумаратон",
    maraton: "Маратон",
    distanciaOtra: (u) => `Друго растојание (${corta(u)})`,
    horas: "Време: часови",
    minutos: "Време: минути",
    segundos: "Време: секунди",
    ritmoMin: (u) => `Темпо: минути по ${una(u)}`,
    ritmoSeg: "Темпо: секунди",
    ritmo: (u) => `Темпо (мин/${una(u)})`,
    tiempo: "Крајно време",
    distanciaRes: (u) => `Растојание (${corta(u)})`,
    velocidad: (u) => `Просечна брзина (${velocidad(u)})`,
    errorDistancia: "Внесете растојание поголемо од 0.",
    errorTiempo: "Внесете го времето: часови, минути или секунди.",
    errorRitmo: "Внесете го темпото: минути и секунди по единица растојание.",
  }),
};
