import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

const corta = (u: string) => (u === "km" ? "км" : "миль");
const una = (u: string) => (u === "km" ? "км" : "милю");

export const textosRu: TextosUi<UiRitmo> = {
  slug: "temp-bega",
  ui: () => ({
    calcular: "Что рассчитать?",
    calcRitmo: "Темп (по дистанции и времени)",
    calcTiempo: "Время (по дистанции и темпу)",
    calcDistancia: "Дистанцию (по времени и темпу)",
    distancia: "Дистанция",
    distanciaAyuda: "Выберите забег или «Другая дистанция», чтобы ввести свою.",
    otra: "Другая дистанция",
    cincoK: "5 км",
    diezK: "10 км",
    media: "Полумарафон",
    maraton: "Марафон",
    distanciaOtra: (u) => `Другая дистанция (${corta(u)})`,
    horas: "Время: часы",
    minutos: "Время: минуты",
    segundos: "Время: секунды",
    ritmoMin: (u) => `Темп: минут на ${una(u)}`,
    ritmoSeg: "Темп: секунды",
    ritmo: (u) => `Темп (мин/${u === "km" ? "км" : "миля"})`,
    tiempo: "Время на финише",
    distanciaRes: (u) => `Дистанция (${corta(u)})`,
    velocidad: (u) => `Средняя скорость (${u === "km/h" ? "км/ч" : "миль/ч"})`,
    errorDistancia: "Введите дистанцию больше 0.",
    errorTiempo: "Введите время: часы, минуты или секунды.",
    errorRitmo: "Введите темп: минуты и секунды на единицу дистанции.",
  }),
};
