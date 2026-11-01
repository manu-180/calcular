import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosUk: TextosUi<UiRitmo> = {
  slug: "temp-bihu",
  ui: () => ({
    calcular: "Що ви хочете розрахувати?",
    calcRitmo: "Темп (за дистанцією і часом)",
    calcTiempo: "Час (за дистанцією і темпом)",
    calcDistancia: "Дистанцію (за часом і темпом)",
    distancia: "Дистанція",
    distanciaAyuda: "Оберіть забіг або варіант «Інша дистанція», щоб ввести її вручну.",
    otra: "Інша дистанція",
    cincoK: "5 км",
    diezK: "10 км",
    media: "Напівмарафон",
    maraton: "Марафон",
    distanciaOtra: (u) => `Інша дистанція (${u})`,
    horas: "Час: години",
    minutos: "Час: хвилини",
    segundos: "Час: секунди",
    ritmoMin: (u) => `Темп: хвилини (на 1 ${u})`,
    ritmoSeg: "Темп: секунди",
    ritmo: (u) => `Темп (хв/${u})`,
    tiempo: "Час на фініші",
    distanciaRes: (u) => `Дистанція (${u})`,
    velocidad: (u) => `Середня швидкість (${u})`,
    errorDistancia: "Введіть дистанцію, більшу за нуль.",
    errorTiempo: "Введіть час: години, хвилини або секунди.",
    errorRitmo: "Введіть темп: хвилини й секунди на одиницю дистанції.",
  }),
};
