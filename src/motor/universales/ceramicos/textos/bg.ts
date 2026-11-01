import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosBg: TextosUi<UiCeramicos> = {
  slug: "kalkulator-za-plochki",
  ui: () => ({
    superficie: (u) => `Площ за облицоване (${u})`,
    largo: (u) => `Дължина на плочката (${u})`,
    ancho: (u) => `Ширина на плочката (${u})`,
    desperdicio: "Резерв за фира (%)",
    desperdicioAyuda: "За рязане и счупени плочки. Сложете 10% при право редене и 15% при диагонално.",
    porCaja: "Плочки в кашон",
    porCajaAyuda: "По желание. Попълнете го, за да видите колко кашона да купите.",
    piezas: "Нужни плочки",
    cajas: "Кашони за купуване",
    conDesperdicio: (u) => `Площ с резерв (${u})`,
    cubre: (u) => `Площ, която покриват кашоните (${u})`,
    errorSuperficie: "Площта трябва да е повече от 0.",
    errorPieza: "Размерите на плочката трябва да са повече от 0.",
  }),
};
