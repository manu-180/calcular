import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosJa: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (u) => `タイルを張る面積（${u}）`,
    largo: (u) => `タイルの縦（${u}）`,
    ancho: (u) => `タイルの横（${u}）`,
    desperdicio: "ロス率（%）",
    desperdicioAyuda: "カットや割れの分です。まっすぐ張るなら10%、斜め張りなら15%が目安です。",
    porCaja: "1箱あたりの枚数",
    porCajaAyuda: "任意です。入れると、買う箱数がわかります。",
    piezas: "必要な枚数",
    cajas: "買う箱数",
    conDesperdicio: (u) => `ロスを含めた面積（${u}）`,
    cubre: (u) => `買う箱で張れる面積（${u}）`,
    errorSuperficie: "面積は0より大きい値を入れてください。",
    errorPieza: "タイルの寸法は0より大きい値を入れてください。",
  }),
};
