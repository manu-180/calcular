import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosMk: TextosUi<UiCombustible> = {
  slug: "kalkulator-za-potroshuvachka-na-gorivo",
  ui: () => ({
    distancia: (u) => `Растојание на патувањето (${u})`,
    idaYVuelta: "Во двата правца",
    tipoConsumo: "Како се мери потрошувачката",
    l100: "Литри на 100 km",
    kml: "Километри со еден литар",
    consumo: "Потрошувачка на гориво",
    consumoMpg: "Потрошувачка на гориво (милји на галон)",
    consumoAyuda: "Видете во упатството или во патниот компјутер. Надвор од град автомобилот обично троши помалку отколку во град.",
    precio: (u) => (u === "L" ? "Цена на литар" : "Цена на галон"),
    personas: "Колку луѓе го делат трошокот",
    costo: "Трошок за гориво",
    porPersona: "По лице",
    combustible: (u) => (u === "L" ? "Потребно гориво (литри)" : "Потребно гориво (галони)"),
    distanciaTotal: (u) => `Вкупно растојание (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Цена по милја" : `Цена по ${u}`),
    errorConsumo: "Потрошувачката на гориво мора да биде поголема од 0.",
    errorPersonas: "Мора да има барем едно лице.",
  }),
};
