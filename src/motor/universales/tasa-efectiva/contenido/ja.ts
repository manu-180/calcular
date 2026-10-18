import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "名目年利と実効年利の換算ツール",
    title: tituloQueEntre(`名目年利と実効年利の換算ツール｜${ctx.nombrePais}`, `実効年利の換算ツール｜${ctx.nombrePais}`, "実効年利の換算ツール"),
    description: "名目年利を実効年利に、実効年利を名目年利に換算します。複利の期間は毎月、四半期、半年、毎日から選べます。",
    intro: [
      "同じ金利の2つの商品でも、かかる金額が違うことがあります。違いは、利息をどのくらいの頻度で計算するかです。",
      "実効年利にそろえると、1年で実際に払う、または受け取る利息で比べられます。わかっている金利を選ぶと、もう一方を表示します。",
    ],
    comoSeCalcula: [
      "実効年利 ＝ （1 ＋ 名目年利 ÷ m）の m 乗 − 1。m は1年の複利の回数で、毎月なら12、四半期なら4です。",
      "名目年利 ＝ m × （（1 ＋ 実効年利）の 1 ÷ m 乗 − 1）",
      "1期間あたりの金利は、名目年利を m で割った値です。",
    ],
    ejemplo: [`名目年利12%を毎月複利で計算すると、実効年利は${p(aEfectiva(12, 12))}です。`, `実効年利10%は、毎月複利なら名目年利${p(aNominal(10, 12))}にあたります。`],
    faq: [
      {
        pregunta: "名目年利と実効年利の違いは何ですか？",
        respuesta: "名目年利は複利を考える前の年利です。実効年利は、利息に利息がつく効果を含めた年利です。そのため、実効年利は名目年利と同じか、それより高くなります。",
      },
      {
        pregunta: "商品を比べるときはどちらを使えばいいですか？",
        respuesta: "預金なら、実際に受け取る利息がわかる実効年利です。ローンは実効年利に加えて、手数料を含めた総支払額も比べてください。",
      },
      {
        pregunta: "複利の回数が多いと実効年利が上がるのはなぜですか？",
        respuesta: "利息が早く元本に組み入れられ、その利息にも利息がつき始めるからです。年1回の複利なら、名目年利と実効年利は同じです。",
      },
    ],
    glosario: [
      { termino: "名目年利", definicion: "複利を含めない、表示上の年利です。" },
      { termino: "実効年利", definicion: "複利の効果を含めた、実際の年利です。" },
      { termino: "複利", definicion: "利息が元本に組み入れられ、その利息にも利息がつく仕組みです。" },
    ],
  };
};
