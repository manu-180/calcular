import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosZh: TextosUi<UiVariacion> = textosPorEscritura<UiVariacion>(
  "percentage-change",
  () => ({
    inicial: "原本的數值",
    final: "後來的數值",
    variacion: "變動百分比",
    diferencia: "差額",
    vuelta: "要回到原值所需的變動",
    vueltaAyuda: "後來的數值要變動多少百分比，才能回到原本的數值。",
    errorInicialCero: "原本的數值不能是 0：從 0 開始無法計算變動百分比。",
    subio: (p) => `上升了 ${p}%。`,
    bajo: (p) => `下降了 ${p}%。`,
    igual: "沒有變動：兩個數值相同。",
  }),
  () => ({
    inicial: "原来的数值",
    final: "后来的数值",
    variacion: "变化百分比",
    diferencia: "差额",
    vuelta: "要回到原值所需的变化",
    vueltaAyuda: "后来的数值要变化多少百分比，才能回到原来的数值。",
    errorInicialCero: "原来的数值不能为 0：从 0 开始无法计算变化百分比。",
    subio: (p) => `上涨了 ${p}%。`,
    bajo: (p) => `下降了 ${p}%。`,
    igual: "没有变化：两个数值相同。",
  }),
);
