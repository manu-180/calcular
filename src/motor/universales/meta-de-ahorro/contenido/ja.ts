import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "貯金目標の計算ツール",
    title: tituloQueEntre(`貯金目標の計算ツール｜${ctx.nombrePais}`, "貯金目標の計算ツール"),
    description: "目標の金額を期限までに貯めるには毎月いくら必要かを、今ある貯金とその利回りも含めて計算します。",
    intro: [
      "旅行、車、住宅の頭金、もしものための備え。金額と期限を決めた目標は、ずっと達成しやすくなります。",
      "貯めたい金額と月数を入れると、毎月と毎週いくら貯めればいいかがわかります。",
    ],
    comoSeCalcula: [
      "まず、今ある貯金が期間の終わりまでにいくらに増えるかを計算します。",
      "足りない分を、毎月同じ金額の積立に分けます。",
      "貯金に利息がつく場合は積立分にも利息がつくので、入れる金額は少し少なくて済みます。",
    ],
    ejemplo: [`利息なしで24か月に${m(meta)}貯めるには、毎月${m(meta / 24)}必要です。`, `すでに${m(actual)}あり、年5%の利回りがあれば、毎月${m(aporteNecesario(meta, actual, 24, 5))}で足ります。`],
    faq: [
      {
        pregunta: "目標どおりに貯め続けるコツは？",
        respuesta: "給料が入ったら、何かに使う前にすぐ移しましょう。できれば、別の口座への自動振替を設定するのがおすすめです。",
      },
      {
        pregunta: "毎月の金額が大きすぎる場合は？",
        respuesta: "期間を延ばすか、目標額を下げてください。無理のない金額から始めて、収入が増えたら上げる方法もあります。",
      },
      {
        pregunta: "インフレも考えたほうがいいですか？",
        respuesta: "目標が数年先なら、想定されるインフレ分を金額に上乗せしてください。今100で買えるものが、その頃にはもっと高くなっているかもしれません。",
      },
    ],
    glosario: [
      { termino: "積立", definicion: "目標のために毎月取り分けるお金です。" },
      { termino: "利回り", definicion: "口座や運用で貯金が生む利益の割合です。" },
    ],
  };
};
