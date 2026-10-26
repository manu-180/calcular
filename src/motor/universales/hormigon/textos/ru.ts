import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const unidad = (u: string) =>
  ({ m: "м", ft: "футы", cm: "см", in: "дюймы", "m³": "м³", "yd³": "куб. ярды", "ft³": "куб. футы", kg: "кг", lb: "фунты" })[u] ?? u;

export const textosRu: TextosUi<UiHormigon> = {
  slug: "kalkulyator-betona",
  ui: () => ({
    largo: (u) => `Длина (${unidad(u)})`,
    ancho: (u) => `Ширина (${unidad(u)})`,
    espesor: (u) => `Толщина (${unidad(u)})`,
    espesorAyuda: "Для площадки или дорожки обычно берут 10 см (4 дюйма), для въезда во двор от 12 до 15 см.",
    margen: "Запас (%)",
    margenAyuda: "На неровности основания и потери. Обычно от 5 до 10%.",
    bolsa: (u) => `Вес мешка цемента (${unidad(u)})`,
    volumen: (u) => `Точный объем (${unidad(u)})`,
    volumenTotal: (u) => `Нужно бетона (${unidad(u)})`,
    volumenPies: "Нужно бетона (куб. футы)",
    cemento: (u) => `Цемент (${unidad(u)})`,
    bolsas: "Мешков цемента",
    arena: (u) => `Песок (${unidad(u)})`,
    piedra: (u) => `Щебень (${unidad(u)})`,
    agua: (u) => (u === "L" ? "Вода (литров)" : "Вода (галлонов)"),
    errorMedida: "Это значение должно быть больше 0.",
    aviso: "Материалы рассчитаны ориентировочно для смеси общего назначения 1:2:3 (около 350 кг цемента на м³). Они зависят от марки бетона, вида работ и местных материалов, поэтому уточните их у прораба или мастера.",
  }),
};
