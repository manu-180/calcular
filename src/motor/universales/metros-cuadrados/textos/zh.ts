import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosZh: TextosUi<UiMetrosCuadrados> = textosPorEscritura<UiMetrosCuadrados>(
  "square-footage",
  () => ({
    forma: (n) => `區塊 ${n}：形狀`,
    formaAyuda: "如果房間是 L 形或不規則形狀，請拆成幾個區塊再相加。",
    ninguna: "不使用",
    rectangulo: "長方形或正方形",
    triangulo: "三角形",
    circulo: "圓形",
    medidaA: (n, u) => `區塊 ${n}：長度、底邊或直徑（${u}）`,
    medidaAAyuda: "長方形填長和寬，三角形填底和高，圓形只要填直徑。",
    medidaB: (n, u) => `區塊 ${n}：寬度或高度（${u}）`,
    total: (u) => `總面積（${u}）`,
    equivale: (u) => `換算成 ${u}`,
    parcial: (n, u) => `區塊 ${n}（${u}）`,
    errorMedida: "這個尺寸沒有填，或是 0。",
  }),
  () => ({
    forma: (n) => `区域 ${n}：形状`,
    formaAyuda: "如果房间是 L 形或不规则形状，请拆成几个区域再相加。",
    ninguna: "不使用",
    rectangulo: "长方形或正方形",
    triangulo: "三角形",
    circulo: "圆形",
    medidaA: (n, u) => `区域 ${n}：长度、底边或直径（${u}）`,
    medidaAAyuda: "长方形填长和宽，三角形填底和高，圆形只要填直径。",
    medidaB: (n, u) => `区域 ${n}：宽度或高度（${u}）`,
    total: (u) => `总面积（${u}）`,
    equivale: (u) => `换算成 ${u}`,
    parcial: (n, u) => `区域 ${n}（${u}）`,
    errorMedida: "这个尺寸没有填，或者是 0。",
  }),
);
