import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "利益率の計算ツール",
    title: tituloQueEntre(`利益率の計算ツール（粗利・値入率）｜${ctx.nombrePais}`, `利益率の計算ツール｜${ctx.nombrePais}`, "利益率の計算ツール"),
    description: "原価と売価から利益率と値入率を計算します。目標の利益率を達成するための売価も逆算できます。",
    intro: [
      "利益率と値入率はよく混同され、その違いで損をすることもあります。どちらも同じ利益を測りますが、基準が違います。",
      "原価と売価を入れると両方を表示します。目標の利益率を選べば、いくらで売ればいいかもわかります。",
    ],
    comoSeCalcula: ["利益 ＝ 売価 − 原価", "利益率 ＝ 利益 ÷ 売価 × 100", "値入率 ＝ 利益 ÷ 原価 × 100", "目標の利益率になる売価 ＝ 原価 ÷ （1 − 利益率 ÷ 100）"],
    ejemplo: [
      `原価${m(costo)}の商品を${m(precio)}で売ると、利益は${m(precio - costo)}です。利益率は${p(((precio - costo) / precio) * 100)}、値入率は${p(((precio - costo) / costo) * 100)}です。`,
      `同じ原価で利益率50%にするには、${m(precioConMargen(costo, 50))}で売る必要があります。原価に50%上乗せするだけだと、利益率は${p(100 / 3)}にしかなりません。`,
    ],
    faq: [
      {
        pregunta: "利益率と値入率の違いは？",
        respuesta: "利益率は売価に対する利益、値入率は原価に対する利益です。同じ利益なら、値入率のほうが必ず大きい数字になります。",
      },
      {
        pregunta: "目標の利益率から売価を決めるには？",
        respuesta: `原価を（1 − 利益率）で割ります。利益率30%なら、原価を${formatearNumero(ctx, 0.7, 2)}で割ります。原価に30%足すだけでは、思っているより利益が少なくなります。`,
      },
      {
        pregunta: "原価に税金を含めるべきですか？",
        respuesta: "消費税のようにお客さんに転嫁する税金を除いた、税抜きの原価と売価を使ってください。含めると、利益率が実際より大きく見えます。",
      },
    ],
    glosario: [
      { termino: "利益率（粗利率）", definicion: "売価に対する利益の割合です。" },
      { termino: "値入率", definicion: "原価に対する利益の割合です。" },
    ],
  };
};
