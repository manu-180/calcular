import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "パーセント計算ツール",
    title: tituloQueEntre(`パーセント計算ツール｜${ctx.nombrePais}`, "パーセント計算ツール"),
    description: "ある数の何%か、ある数が別の数の何%にあたるか、%を足したり引いたりした結果をすぐに計算できます。",
    intro: [
      "知りたい内容を選んで2つの数を入れると、すぐに答えが出ます。",
      "日常でよく使う4つの計算（一部分、割合、増加、減少）に対応しています。",
    ],
    comoSeCalcula: [
      "YのX% ＝ X × Y ÷ 100",
      "XがYの何%か ＝ X ÷ Y × 100",
      "YにX%を足す ＝ Y × (1 ＋ X ÷ 100)、YからX%を引く ＝ Y × (1 − X ÷ 100)",
    ],
    ejemplo: ["200の15%は30です。", "30は120の25%です。", `${m(precio)}の商品が10%値上がりすると${m(precio * 1.1)}になります。`],
    faq: [
      {
        pregunta: "ある数の何%かは、どう計算しますか？",
        respuesta: "その数にパーセントを掛けて100で割ります。350の20%は、350 × 20 ÷ 100 ＝ 70です。",
      },
      {
        pregunta: "ある数が別の数の何%にあたるかは、どう求めますか？",
        respuesta: "部分を全体で割って100を掛けます。60問中45問正解なら、45 ÷ 60 × 100 ＝ 75%です。",
      },
      {
        pregunta: "価格に%を上乗せするには？",
        respuesta: `1にパーセントを小数にした値を足して掛けます。10%上乗せするなら${formatearNumero(ctx, 1.1, 2)}倍です。`,
      },
      {
        pregunta: "10%上がってから10%下がると、元に戻りますか？",
        respuesta: "戻りません。100に10%を足すと110、110から10%を引くと99です。下がるときは、大きくなった数が基準になるためです。",
      },
    ],
    glosario: [
      { termino: "パーセント（%）", definicion: "全体を100としたときの量の表し方です。" },
      { termino: "基準の数", definicion: "パーセントを計算するもとになる数です（このツールではY）。" },
    ],
  };
};
