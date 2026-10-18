import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosZh: TextosUi<UiCeramicos> = textosPorEscritura<UiCeramicos>(
  "tile-calculator",
  () => ({
    superficie: (u) => `鋪貼面積（${u}）`,
    largo: (u) => `磁磚長度（${u}）`,
    ancho: (u) => `磁磚寬度（${u}）`,
    desperdicio: "損耗率（%）",
    desperdicioAyuda: "用於切割和破損。直鋪抓 10%，斜鋪抓 15%。",
    porCaja: "每箱片數",
    porCajaAyuda: "選填。填了就能看到要買幾箱。",
    piezas: "需要的片數",
    cajas: "要買的箱數",
    conDesperdicio: (u) => `含損耗面積（${u}）`,
    cubre: (u) => `這些箱數可鋪面積（${u}）`,
    errorSuperficie: "面積必須大於 0。",
    errorPieza: "磁磚尺寸必須大於 0。",
  }),
  () => ({
    superficie: (u) => `铺贴面积（${u}）`,
    largo: (u) => `瓷砖长度（${u}）`,
    ancho: (u) => `瓷砖宽度（${u}）`,
    desperdicio: "损耗率（%）",
    desperdicioAyuda: "用于切割和破损。正铺按 10%，斜铺按 15%。",
    porCaja: "每箱片数",
    porCajaAyuda: "选填。填了就能看到要买几箱。",
    piezas: "需要的片数",
    cajas: "要买的箱数",
    conDesperdicio: (u) => `含损耗面积（${u}）`,
    cubre: (u) => `这些箱数可铺面积（${u}）`,
    errorSuperficie: "面积必须大于 0。",
    errorPieza: "瓷砖尺寸必须大于 0。",
  }),
);
