import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosKo: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (u) => `타일 시공 면적(${u})`,
    largo: (u) => `타일 세로(${u})`,
    ancho: (u) => `타일 가로(${u})`,
    desperdicio: "로스율(%)",
    desperdicioAyuda: "재단과 파손에 대비한 여유분이에요. 반듯하게 붙이면 10%, 대각선으로 붙이면 15%가 기준이에요.",
    porCaja: "한 박스당 장수",
    porCajaAyuda: "선택 사항이에요. 넣으면 살 박스 수가 나와요.",
    piezas: "필요한 장수",
    cajas: "살 박스 수",
    conDesperdicio: (u) => `로스 포함 면적(${u})`,
    cubre: (u) => `박스로 시공할 수 있는 면적(${u})`,
    errorSuperficie: "면적은 0보다 커야 해요.",
    errorPieza: "타일 치수는 0보다 커야 해요.",
  }),
};
