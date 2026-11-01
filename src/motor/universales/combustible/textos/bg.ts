import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosBg: TextosUi<UiCombustible> = {
  slug: "razhod-na-gorivo",
  ui: () => ({
    distancia: (u) => `Разстояние на пътуването (${u})`,
    idaYVuelta: "Отиване и връщане",
    tipoConsumo: "Как се измерва разходът",
    l100: "Литри на 100 km",
    kml: "Километри с един литър",
    consumo: "Разход на гориво",
    consumoMpg: "Разход на гориво (мили на галон)",
    consumoAyuda: "Вижте в ръководството или в бордовия компютър. Извън града колата обикновено харчи по-малко, отколкото в града.",
    precio: (u) => (u === "L" ? "Цена на литър" : "Цена на галон"),
    personas: "Колко души делят разхода",
    costo: "Разход за гориво",
    porPersona: "На човек",
    combustible: (u) => (u === "L" ? "Нужно гориво (литри)" : "Нужно гориво (галони)"),
    distanciaTotal: (u) => `Общо разстояние (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Цена на миля" : `Цена на ${u}`),
    errorConsumo: "Разходът на гориво трябва да е повече от 0.",
    errorPersonas: "Трябва да има поне един човек.",
  }),
};
