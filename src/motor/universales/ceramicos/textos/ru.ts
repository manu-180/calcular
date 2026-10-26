import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

const unidad = (u: string) => ({ cm: "см", in: "дюймы", "m²": "м²", "ft²": "кв. футы" })[u] ?? u;

export const textosRu: TextosUi<UiCeramicos> = {
  slug: "kalkulyator-plitki",
  ui: () => ({
    superficie: (u) => `Площадь укладки (${unidad(u)})`,
    largo: (u) => `Длина плитки (${unidad(u)})`,
    ancho: (u) => `Ширина плитки (${unidad(u)})`,
    desperdicio: "Запас на подрезку (%)",
    desperdicioAyuda: "На подрезку и бой. Для прямой укладки берут 10%, для диагональной 15%.",
    porCaja: "Плиток в коробке",
    porCajaAyuda: "Необязательно. Укажите, чтобы узнать, сколько коробок купить.",
    piezas: "Нужно плиток",
    cajas: "Сколько коробок купить",
    conDesperdicio: (u) => `Площадь с запасом (${unidad(u)})`,
    cubre: (u) => `Площадь, которую покроют коробки (${unidad(u)})`,
    errorSuperficie: "Площадь должна быть больше 0.",
    errorPieza: "Размеры плитки должны быть больше 0.",
  }),
};
