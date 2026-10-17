import { contenidoPorEscritura, esHongKong } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    const costo = montoEjemplo(ctx, 60);
    const precio = montoEjemplo(ctx, 100);
    return {
      h1: "毛利率計算機",
      title: tituloQueEntre(`毛利率計算機（加成率）｜${ctx.nombrePais}`, `毛利率計算機｜${ctx.nombrePais}`, "毛利率計算機"),
      description: "由成本和售價算出毛利率和加成率，或反推要達到想要的毛利率，售價該訂多少。",
      intro: ["毛利率和加成率常常被搞混，這個差別可能讓您少賺錢。兩者衡量的是同一筆利潤，只是基準不同。", "輸入成本和售價，兩者都會顯示；或選一個毛利率，我們告訴您該賣多少。"],
      comoSeCalcula: ["利潤 ＝ 售價 − 成本。", "毛利率 ＝ 利潤 ÷ 售價 × 100。", "加成率 ＝ 利潤 ÷ 成本 × 100。", "目標毛利率的售價 ＝ 成本 ÷（1 − 毛利率 ÷ 100）。"],
      ejemplo: [
        `成本 ${m(costo)} 的商品賣 ${m(precio)}，利潤 ${m(precio - costo)}：毛利率 ${p(((precio - costo) / precio) * 100)}，加成率 ${p(((precio - costo) / costo) * 100)}。`,
        `同樣的成本要有 50% 毛利率，得賣 ${m(precioConMargen(costo, 50))}。在成本上加 50%，毛利率只有 ${p(100 / 3)}。`,
      ],
      faq: [
        { pregunta: "毛利率和加成率有什麼不同？", respuesta: "毛利率是利潤除以售價，加成率是利潤除以成本。同樣的利潤，加成率的數字一定比較大。" },
        { pregunta: "怎麼依目標毛利率訂價？", respuesta: `用成本除以（1 − 毛利率）。毛利率 30% 就除以 ${formatearNumero(ctx, 0.7, 2)}。別直接在成本上加 30%，會賺得比想像中少。` },
        { pregunta: "成本要含稅嗎？", respuesta: `請用不含${esHongKong(ctx.locale) ? "" : "營業稅等"}轉嫁給客人的稅金的成本和售價，否則毛利率會看起來比實際高。` },
      ],
      glosario: [
        { termino: "毛利率", definicion: "利潤占售價的百分比。" },
        { termino: "加成率", definicion: "利潤占成本的百分比。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    const costo = montoEjemplo(ctx, 60);
    const precio = montoEjemplo(ctx, 100);
    return {
      h1: "毛利率计算器",
      title: tituloQueEntre(`毛利率计算器（加价率）｜${ctx.nombrePais}`, `毛利率计算器｜${ctx.nombrePais}`, "毛利率计算器"),
      description: "由成本和售价算出毛利率和加价率，或者反推要达到想要的毛利率，售价该定多少。",
      intro: ["毛利率和加价率常常被搞混，这个差别可能让您少赚钱。两者衡量的是同一笔利润，只是基准不同。", "输入成本和售价，两者都会显示；或者选一个毛利率，我们告诉您该卖多少。"],
      comoSeCalcula: ["利润 ＝ 售价 − 成本。", "毛利率 ＝ 利润 ÷ 售价 × 100。", "加价率 ＝ 利润 ÷ 成本 × 100。", "目标毛利率的售价 ＝ 成本 ÷（1 − 毛利率 ÷ 100）。"],
      ejemplo: [
        `成本 ${m(costo)} 的商品卖 ${m(precio)}，利润 ${m(precio - costo)}：毛利率 ${p(((precio - costo) / precio) * 100)}，加价率 ${p(((precio - costo) / costo) * 100)}。`,
        `同样的成本要有 50% 毛利率，得卖 ${m(precioConMargen(costo, 50))}。在成本上加 50%，毛利率只有 ${p(100 / 3)}。`,
      ],
      faq: [
        { pregunta: "毛利率和加价率有什么不同？", respuesta: "毛利率是利润除以售价，加价率是利润除以成本。同样的利润，加价率的数字一定更大。" },
        { pregunta: "怎么按目标毛利率定价？", respuesta: `用成本除以（1 − 毛利率）。毛利率 30% 就除以 ${formatearNumero(ctx, 0.7, 2)}。别直接在成本上加 30%，会比想象中赚得少。` },
        { pregunta: "成本要含税吗？", respuesta: "请用不含增值税等向客户收取的税费的成本和售价，否则毛利率会看起来比实际高。" },
      ],
      glosario: [
        { termino: "毛利率", definicion: "利润占售价的百分比。" },
        { termino: "加价率", definicion: "利润占成本的百分比。" },
      ],
    };
  },
);
