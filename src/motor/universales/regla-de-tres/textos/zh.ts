import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosZh: TextosUi<UiReglaDeTres> = textosPorEscritura<UiReglaDeTres>(
  "rule-of-three",
  () => ({
    tipo: "比例類型",
    directa: "正比（A 變大，B 也變大）",
    inversa: "反比（A 變大，B 變小）",
    a: "A",
    aAyuda: "可以理解成「A 比 B 等於 C 比 X」。請填入 A、B、C。",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "這個數值不能是 0：計算時要除以它。",
    fraseDirecta: (a, b, c, x) => `${a} 對應 ${b}，則 ${c} 對應 ${x}。算式：${b} × ${c} ÷ ${a}`,
    fraseInversa: (a, b, c, x) => `${a} 對應 ${b}，則 ${c} 對應 ${x}。算式：${a} × ${b} ÷ ${c}`,
  }),
  () => ({
    tipo: "比例类型",
    directa: "正比（A 变大，B 也变大）",
    inversa: "反比（A 变大，B 变小）",
    a: "A",
    aAyuda: "可以理解成“A 比 B 等于 C 比 X”。请填入 A、B、C。",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "这个数值不能为 0：计算时要除以它。",
    fraseDirecta: (a, b, c, x) => `${a} 对应 ${b}，则 ${c} 对应 ${x}。算式：${b} × ${c} ÷ ${a}`,
    fraseInversa: (a, b, c, x) => `${a} 对应 ${b}，则 ${c} 对应 ${x}。算式：${a} × ${b} ÷ ${c}`,
  }),
);
