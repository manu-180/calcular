import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosRu: TextosUi<UiCombustible> = {
  slug: "raskhod-topliva",
  ui: () => ({
    distancia: (u) => `Расстояние поездки (${u === "km" ? "км" : "мили"})`,
    idaYVuelta: "Туда и обратно",
    tipoConsumo: "Как указан расход",
    l100: "Литров на 100 км",
    kml: "Километров на литр",
    consumo: "Расход топлива",
    consumoMpg: "Расход топлива (миль на галлон)",
    consumoAyuda: "Посмотрите в инструкции или на бортовом компьютере. На трассе машина обычно расходует меньше, чем в городе.",
    precio: (u) => (u === "L" ? "Цена за литр" : "Цена за галлон"),
    personas: "Сколько человек делят расходы",
    costo: "Стоимость топлива",
    porPersona: "На одного человека",
    combustible: (u) => (u === "L" ? "Нужно топлива (литров)" : "Нужно топлива (галлонов)"),
    distanciaTotal: (u) => `Общее расстояние (${u === "km" ? "км" : "мили"})`,
    costoPorDistancia: (u) => (u === "mi" ? "Стоимость одной мили" : "Стоимость одного километра"),
    errorConsumo: "Расход топлива должен быть больше 0.",
    errorPersonas: "Нужен хотя бы один человек.",
  }),
};
