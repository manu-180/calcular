import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const precio = montoEjemplo(ctx, 50);
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "百分比計算機",
      title: tituloQueEntre(`百分比計算機｜${ctx.nombrePais}`, "百分比計算機"),
      description: "算出一個數的百分之幾、一個數占另一個數的百分比，以及加上或減去百分比後的結果。",
      intro: ["選擇想知道的項目，輸入兩個數字，馬上就有答案。", "涵蓋日常最常用的四種百分比計算：部分、占比、增加和減少。"],
      comoSeCalcula: [
        "Y 的 X% ＝ X × Y ÷ 100。",
        "X 占 Y 的百分比 ＝ X ÷ Y × 100。",
        "Y 加上 X% ＝ Y × (1 ＋ X ÷ 100)；Y 減去 X% ＝ Y × (1 − X ÷ 100)。",
      ],
      ejemplo: ["200 的 15% 是 30。", "30 是 120 的 25%。", `售價 ${m(precio)} 的商品漲價 10% 後是 ${m(precio * 1.1)}。`],
      faq: [
        { pregunta: "怎麼算一個數的百分之幾？", respuesta: "把這個數乘以百分比，再除以 100。350 的 20% 就是 350 × 20 ÷ 100 ＝ 70。" },
        { pregunta: "怎麼算一個數占另一個數的百分比？", respuesta: "用部分除以整體，再乘以 100。60 題答對 45 題，就是 45 ÷ 60 × 100 ＝ 75%。" },
        { pregunta: "價格要加上百分比該怎麼算？", respuesta: `乘以 1 加上百分比的小數。加 10% 就乘以 ${formatearNumero(ctx, 1.1, 2)}。` },
        { pregunta: "先漲 10% 再跌 10%，會回到原價嗎？", respuesta: "不會。100 加 10% 是 110，110 減 10% 是 99，因為下跌時是以變大後的數字為基準。" },
      ],
      glosario: [
        { termino: "百分比", definicion: "把整體當作 100 份來表示數量的方式。" },
        { termino: "基數", definicion: "計算百分比時作為基準的數（在這個計算機中是 Y）。" },
      ],
    };
  },
  (ctx) => {
    const precio = montoEjemplo(ctx, 50);
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "百分比计算器",
      title: tituloQueEntre(`百分比计算器｜${ctx.nombrePais}`, "百分比计算器"),
      description: "算出一个数的百分之几、一个数占另一个数的百分比，以及加上或减去百分比后的结果。",
      intro: ["选择想知道的项目，输入两个数字，马上就能得到答案。", "涵盖日常最常用的四种百分比计算：部分、占比、增加和减少。"],
      comoSeCalcula: [
        "Y 的 X% ＝ X × Y ÷ 100。",
        "X 占 Y 的百分比 ＝ X ÷ Y × 100。",
        "Y 加上 X% ＝ Y × (1 ＋ X ÷ 100)；Y 减去 X% ＝ Y × (1 − X ÷ 100)。",
      ],
      ejemplo: ["200 的 15% 是 30。", "30 是 120 的 25%。", `售价 ${m(precio)} 的商品涨价 10% 后是 ${m(precio * 1.1)}。`],
      faq: [
        { pregunta: "怎么算一个数的百分之几？", respuesta: "把这个数乘以百分比，再除以 100。350 的 20% 就是 350 × 20 ÷ 100 ＝ 70。" },
        { pregunta: "怎么算一个数占另一个数的百分比？", respuesta: "用部分除以整体，再乘以 100。60 道题答对 45 道，就是 45 ÷ 60 × 100 ＝ 75%。" },
        { pregunta: "价格要加上百分比该怎么算？", respuesta: `乘以 1 加上百分比的小数。加 10% 就乘以 ${formatearNumero(ctx, 1.1, 2)}。` },
        { pregunta: "先涨 10% 再跌 10%，会回到原价吗？", respuesta: "不会。100 加 10% 是 110，110 减 10% 是 99，因为下跌时是以变大后的数字为基准。" },
      ],
      glosario: [
        { termino: "百分比", definicion: "把整体当作 100 份来表示数量的方式。" },
        { termino: "基数", definicion: "计算百分比时作为基准的数（在这个计算器中是 Y）。" },
      ],
    };
  },
);
