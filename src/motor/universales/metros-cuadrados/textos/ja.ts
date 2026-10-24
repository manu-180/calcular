import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosJa: TextosUi<UiMetrosCuadrados> = {
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `区画${n}：形`,
    formaAyuda: "L字型や不規則な部屋は、いくつかの区画に分けて足してください。",
    ninguna: "使わない",
    rectangulo: "長方形・正方形",
    triangulo: "三角形",
    circulo: "円",
    medidaA: (n, u) => `区画${n}：長さ、底辺、または直径（${u}）`,
    medidaAAyuda: "長方形は縦と横、三角形は底辺と高さ、円は直径だけを入れます。",
    medidaB: (n, u) => `区画${n}：幅または高さ（${u}）`,
    total: (u) => `合計面積（${u}）`,
    equivale: (u) => `${u}に換算すると`,
    parcial: (n, u) => `区画${n}（${u}）`,
    errorMedida: "この寸法が入っていないか、0になっています。",
  }),
};
