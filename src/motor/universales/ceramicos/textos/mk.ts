import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosMk: TextosUi<UiCeramicos> = {
  slug: "kalkulator-za-plochki",
  ui: () => ({
    superficie: (u) => `Површина за поплочување (${u})`,
    largo: (u) => `Должина на плочката (${u})`,
    ancho: (u) => `Ширина на плочката (${u})`,
    desperdicio: "Резерва за отпад (%)",
    desperdicioAyuda: "За сечење и скршени плочки. Ставете 10 % при право редење и 15 % при дијагонално.",
    porCaja: "Плочки во кутија",
    porCajaAyuda: "По желба. Пополнете го за да видите колку кутии да купите.",
    piezas: "Потребни плочки",
    cajas: "Кутии за купување",
    conDesperdicio: (u) => `Површина со резерва (${u})`,
    cubre: (u) => `Површина што ја покриваат кутиите (${u})`,
    errorSuperficie: "Површината мора да биде поголема од 0.",
    errorPieza: "Димензиите на плочката мора да бидат поголеми од 0.",
  }),
};
