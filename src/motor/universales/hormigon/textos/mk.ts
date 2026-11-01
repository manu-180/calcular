import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const unidad = (u: string) =>
  ({ m: "м", ft: "стапки", cm: "см", in: "инчи", "m³": "м³", "yd³": "куб. јарди", "ft³": "куб. стапки", kg: "кг", lb: "фунти" })[u] ?? u;

export const textosMk: TextosUi<UiHormigon> = {
  slug: "kalkulator-za-beton",
  ui: () => ({
    largo: (u) => `Должина (${unidad(u)})`,
    ancho: (u) => `Ширина (${unidad(u)})`,
    espesor: (u) => `Дебелина (${unidad(u)})`,
    espesorAyuda: "За тераса или патека обично е 10 см (4 инчи). За влез за автомобил е од 12 до 15 см.",
    margen: "Резерва (%)",
    margenAyuda: "За нерамна подлога и истурање. Вообичаено е од 5 % до 10 %.",
    bolsa: (u) => `Тежина на вреќа цемент (${unidad(u)})`,
    volumen: (u) => `Точен волумен (${unidad(u)})`,
    volumenTotal: (u) => `Потребен бетон (${unidad(u)})`,
    volumenPies: "Потребен бетон (куб. стапки)",
    cemento: (u) => `Цемент (${unidad(u)})`,
    bolsas: "Вреќи цемент",
    arena: (u) => `Песок (${unidad(u)})`,
    piedra: (u) => `Чакал (${unidad(u)})`,
    agua: (u) => (u === "L" ? "Вода (литри)" : "Вода (галони)"),
    errorMedida: "Оваа мерка треба да биде поголема од 0.",
    aviso: "Материјалите се ориентациони за бетон за општа намена со мешавина 1:2:3 (околу 350 кг цемент на м³). Тие се менуваат според рецептот, видот на работата и локалните материјали: проверете ги со лицето што раководи со градбата.",
  }),
};
