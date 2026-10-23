import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "比例計算ツール",
    title: tituloQueEntre(`比例計算ツール（正比例・反比例）｜${ctx.nombrePais}`, `比例計算ツール｜${ctx.nombrePais}`, "比例計算ツール"),
    description: "正比例と反比例の計算がすぐにできます。3つの値を入れると、4つ目の値を計算式つきで表示します。",
    intro: [
      "2つの量が一緒に変わり、4つの値のうち3つがわかっているときに使えます。",
      "正比例か反比例かを選んでA、B、Cを入れると、Xが求められます。",
    ],
    comoSeCalcula: [
      "正比例：X ＝ B × C ÷ A。両方の量が一緒に増えるときに使います（重さが増えると値段も上がる）。",
      "反比例：X ＝ A × B ÷ C。一方が増えるともう一方が減るときに使います（人数が増えると日数は減る）。",
    ],
    ejemplo: [`3kgで${m(precio3)}なら、5kgでは${m((precio3 * 5) / 3)}です。`, "4人で12日かかる塗装作業は、6人なら8日で終わります。"],
    faq: [
      {
        pregunta: "正比例か反比例かは、どう見分けますか？",
        respuesta: "一方が増えるともう一方も増えるなら正比例、一方が増えるともう一方が減るなら反比例です。",
      },
      {
        pregunta: "正比例を手で計算するには？",
        respuesta: `わかっている2つの値を掛けて、残りの1つで割ります。3に対して600なら、5に対しては600 × 5 ÷ 3 ＝ ${formatearNumero(ctx, 1000)}です。`,
      },
      {
        pregunta: "パーセントの計算にも使えますか？",
        respuesta: "使えます。200が100%なら、50は25%です。A ＝ 200、B ＝ 100、C ＝ 50の正比例として計算できます。",
      },
    ],
    glosario: [
      { termino: "正比例", definicion: "2つの量が一緒に増えたり減ったりする関係です。" },
      { termino: "反比例", definicion: "一方が増えると、もう一方が減る関係です。" },
    ],
  };
};
