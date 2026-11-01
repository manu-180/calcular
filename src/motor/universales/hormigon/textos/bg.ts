import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const unidad = (u: string) =>
  ({ m: "м", ft: "фута", cm: "см", in: "инча", "m³": "м³", "yd³": "куб. ярда", "ft³": "куб. фута", kg: "кг", lb: "фунта" })[u] ?? u;

export const textosBg: TextosUi<UiHormigon> = {
  slug: "kalkulator-za-beton",
  ui: () => ({
    largo: (u) => `Дължина (${unidad(u)})`,
    ancho: (u) => `Ширина (${unidad(u)})`,
    espesor: (u) => `Дебелина (${unidad(u)})`,
    espesorAyuda: "За тераса или пътека обикновено е 10 см (4 инча). За алея за кола е от 12 до 15 см.",
    margen: "Резерв (%)",
    margenAyuda: "За неравна основа и разливане. Обичайно е от 5% до 10%.",
    bolsa: (u) => `Тегло на чувал цимент (${unidad(u)})`,
    volumen: (u) => `Точен обем (${unidad(u)})`,
    volumenTotal: (u) => `Нужен бетон (${unidad(u)})`,
    volumenPies: "Нужен бетон (куб. фута)",
    cemento: (u) => `Цимент (${unidad(u)})`,
    bolsas: "Чували цимент",
    arena: (u) => `Пясък (${unidad(u)})`,
    piedra: (u) => `Чакъл (${unidad(u)})`,
    agua: (u) => (u === "L" ? "Вода (литри)" : "Вода (галона)"),
    errorMedida: "Тази мярка трябва да е по-голяма от 0.",
    aviso: "Материалите са ориентировъчни за бетон с обща употреба и смес 1:2:3 (около 350 кг цимент на м³). Те се променят според рецептата, вида на работата и местните материали: проверете ги с човека, който ръководи строежа.",
  }),
};
