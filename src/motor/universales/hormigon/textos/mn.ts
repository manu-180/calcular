import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const unidad = (u: string) =>
  ({ m: "м", ft: "фут", cm: "см", in: "инч", "m³": "м³", "yd³": "куб ярд", "ft³": "куб фут", kg: "кг", lb: "фунт" })[u] ?? u;

export const textosMn: TextosUi<UiHormigon> = {
  slug: "betony-tootsooluur",
  ui: () => ({
    largo: (u) => `Урт (${unidad(u)})`,
    ancho: (u) => `Өргөн (${unidad(u)})`,
    espesor: (u) => `Зузаан (${unidad(u)})`,
    espesorAyuda: "Дэнж эсвэл явган замд ихэвчлэн 10 см (4 инч) байдаг. Машины замд 12 ба 15 см хооронд байна.",
    margen: "Нөөц (%)",
    margenAyuda: "Тэгш бус суурь, асгаралтад зориулсан. Ихэвчлэн 5 ба 10 хувийн хооронд байдаг.",
    bolsa: (u) => `Цементийн шуудайн жин (${unidad(u)})`,
    volumen: (u) => `Яг эзлэхүүн (${unidad(u)})`,
    volumenTotal: (u) => `Шаардлагатай бетон (${unidad(u)})`,
    volumenPies: "Шаардлагатай бетон (куб фут)",
    cemento: (u) => `Цемент (${unidad(u)})`,
    bolsas: "Цементийн шуудай",
    arena: (u) => `Элс (${unidad(u)})`,
    piedra: (u) => `Хайрга (${unidad(u)})`,
    agua: (u) => (u === "L" ? "Ус (литр)" : "Ус (галлон)"),
    errorMedida: "Энэ хэмжээ 0 тооноос их байх ёстой.",
    aviso: "Материалын хэмжээ нь 1:2:3 хольцтой ерөнхий зориулалтын бетонд зориулсан ойролцоо тоо (м³ тутамд 350 кг орчим цемент). Жор, ажлын төрөл, орон нутгийн материалаас хамаарч өөрчлөгддөг тул барилгын ажил удирдаж буй хүнтэй шалгана уу.",
  }),
};
