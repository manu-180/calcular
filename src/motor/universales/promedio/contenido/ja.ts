import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  return {
    h1: "加重平均の計算ツール",
    title: tituloQueEntre(`加重平均の計算ツール｜${ctx.nombrePais}`, "加重平均の計算ツール"),
    description: "成績の単純平均と加重平均を計算します。最大10個の値と、それぞれの重み（割合、単位数、回数）を入れられます。",
    intro: [
      "点数とその重みを入れると、加重平均と単純平均が並んで表示されます。",
      "学校や大学の成績のほか、値によって重みが違う平均ならどんな場面でも使えます。",
    ],
    comoSeCalcula: [
      "単純平均 ＝ 値の合計 ÷ 値の数",
      "加重平均 ＝ （値 × 重み）の合計 ÷ 重みの合計",
      "重みの合計が100でなくてもかまいません。重みの合計で割るためです。",
    ],
    ejemplo: [
      `重み20%の7点、30%の8点、50%の9点なら、加重平均は${n(8.3)}点です。`,
      `同じ3つの単純平均は${n(8)}点です。重みの大きい9点が加重平均を引き上げています。`,
    ],
    faq: [
      {
        pregunta: "加重平均はどう計算しますか？",
        respuesta: "それぞれの値に重みを掛けて足し合わせ、重みの合計で割ります。",
      },
      {
        pregunta: "重みの合計が100%にならない場合は？",
        respuesta: "問題ありません。6単位の科目と4単位の科目なら、6と4を入れてください。重みの合計で割って計算します。",
      },
      {
        pregunta: "単純平均と加重平均の違いは何ですか？",
        respuesta: "単純平均ではすべての値が同じ重さで数えられます。加重平均では、それぞれの重みに応じて数えられます。",
      },
    ],
    glosario: [
      { termino: "重み", definicion: "その値が最終的な平均にどれだけ影響するかを表す数です。" },
      { termino: "加重平均", definicion: "それぞれの値に重みを掛けて求める平均です。" },
    ],
  };
};
