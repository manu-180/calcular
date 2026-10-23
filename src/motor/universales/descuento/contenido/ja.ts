import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "割引計算ツール",
    title: tituloQueEntre(`割引計算ツール｜${ctx.nombrePais}`, "割引計算ツール"),
    description: "割引後の価格と割引額を計算します。30%オフからさらに10%オフのような、重ねがけの割引にも対応しています。",
    intro: [
      "価格と割引率を入れると、支払う金額と割引額がすぐにわかります。",
      "さらに割引がある場合はそれも入れてください。2回の割引は単純な足し算にはなりません。",
    ],
    comoSeCalcula: [
      "割引後の価格 ＝ 元の価格 × （1 − 割引率 ÷ 100）",
      "追加の割引は、最初の割引をした後の価格にかかります。",
      "割引額は、元の価格から割引後の価格を引いた金額です。",
    ],
    ejemplo: [
      `${m(precio)}の商品が25%オフなら${m(precio * 0.75)}です。`,
      `30%オフからさらに10%オフなら${m(precio * 0.7 * 0.9)}です。合計の割引率は40%ではなく37%です。`,
    ],
    faq: [
      {
        pregunta: "割引額はどう計算しますか？",
        respuesta: "価格に割引率を掛けて100で割ると割引額です。価格からそれを引くと支払う金額になります。",
      },
      {
        pregunta: "30%オフと10%オフを重ねると40%オフですか？",
        respuesta: "いいえ。2回目の割引は値下げ後の価格にかかるので、合計は37%オフです。",
      },
      {
        pregunta: "割引後の価格から元の価格を求めるには？",
        respuesta: `割引後の価格を（1 − 割引率 ÷ 100）で割ります。25%オフなら${formatearNumero(ctx, 0.75, 2)}で割ります。`,
      },
    ],
    glosario: [
      { termino: "割引率", definicion: "元の価格から差し引く割合です。" },
      { termino: "実質の割引率", definicion: "複数の割引が重なったときに、全体で何%安くなったかを表す割合です。" },
    ],
  };
};
