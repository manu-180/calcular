import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosZh: TextosUi<UiPorcentaje> = textosPorEscritura<UiPorcentaje>(
  "percentage",
  () => ({
    modo: "您想計算什麼？",
    modoParte: "Y 的 X% 是多少？",
    modoProporcion: "X 是 Y 的百分之幾？",
    modoAumento: "Y 加上 X%",
    modoRebaja: "Y 減去 X%",
    x: "數字 X",
    xAyuda: "百分比的數值。如果選擇「X 是 Y 的百分之幾？」，這裡填部分的數字。",
    y: "數字 Y",
    resultado: "結果",
    porcentaje: "百分比",
    diferencia: "增加或減少的數量",
    errorYCero: "Y 不能是 0：0 沒有百分比可言。",
    fraseParte: (x, y, r) => `${y} 的 ${x}% 是 ${r}。`,
    fraseProporcion: (x, y, p) => `${x} 是 ${y} 的 ${p}%。`,
    fraseAumento: (x, y, r, d) => `${y} 加上 ${x}% 是 ${r}，增加了 ${d}。`,
    fraseRebaja: (x, y, r, d) => `${y} 減去 ${x}% 是 ${r}，減少了 ${d}。`,
  }),
  () => ({
    modo: "您想计算什么？",
    modoParte: "Y 的 X% 是多少？",
    modoProporcion: "X 是 Y 的百分之几？",
    modoAumento: "Y 加上 X%",
    modoRebaja: "Y 减去 X%",
    x: "数字 X",
    xAyuda: "百分比的数值。如果选择“X 是 Y 的百分之几？”，这里填部分的数字。",
    y: "数字 Y",
    resultado: "结果",
    porcentaje: "百分比",
    diferencia: "增加或减少的数量",
    errorYCero: "Y 不能为 0：0 没有百分比可言。",
    fraseParte: (x, y, r) => `${y} 的 ${x}% 是 ${r}。`,
    fraseProporcion: (x, y, p) => `${x} 是 ${y} 的 ${p}%。`,
    fraseAumento: (x, y, r, d) => `${y} 加上 ${x}% 是 ${r}，增加了 ${d}。`,
    fraseRebaja: (x, y, r, d) => `${y} 减去 ${x}% 是 ${r}，减少了 ${d}。`,
  }),
);
