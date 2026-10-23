import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "マイル" : "km";
  return {
    h1: "車の維持費の計算ツール",
    title: tituloQueEntre(`車の維持費の計算ツール｜${ctx.nombrePais}`, "車の維持費の計算ツール"),
    description: `燃料代、保険料、メンテナンス、駐車場代、価値の目減りまで含めて、車の本当のコストを1か月、1年、1${unidad}あたりで計算します。`,
    intro: [
      "燃料代は把握していても、保険料、メンテナンス、駐車場代、そして毎年下がっていく車の価値まで足している人は多くありません。",
      "かかっている費用を入れると、車に実際いくらかかっているかがわかります。買うか、乗り換えるか、ほかの移動手段にするかを決める参考になります。",
    ],
    comoSeCalcula: [
      imperial ? "1か月の燃料代 ＝ 月の走行マイル ÷ 燃費（マイル／ガロン） × 1ガロンの価格" : "1か月の燃料代 ＝ 月の走行距離（km） × 100kmあたりのリットル数 ÷ 100 × 1リットルの価格",
      "1か月で下がる価値 ＝ 車の価値 × 1年で下がる割合 ÷ 12",
      "実際のコスト ＝ 燃料代 ＋ 保険料 ＋ メンテナンス費 ＋ 駐車場代 ＋ そのほかの費用 ＋ 下がった価値",
      `1${unidad}あたりのコスト ＝ 1か月の実際のコスト ÷ その月の走行距離`,
    ],
    ejemplo: [
      `${m(g.precio)}の車で月に${formatearNumero(ctx, g.distancia)}${imperial ? "マイル" : "km"}走ると、価値の目減りも含めて1か月${m(mensual)}かかります。`,
      `1年では${m(mensual * 12)}、1${unidad}あたり${formatearMonto(ctx, mensual / g.distancia)}です。`,
    ],
    faq: [
      {
        pregunta: "車の価値の目減りとは何ですか？",
        respuesta: "時間とともに車の価値が下がっていく分です。毎月払うものではありませんが、売るときに実感します。新車では、いちばん大きなコストになることがよくあります。",
      },
      {
        pregunta: "ローンの返済額を足さないのはなぜですか？",
        respuesta: "返済の一部は車そのものの代金で、それはすでに価値の目減りとして数えています。両方を足すと車を2回数えることになります。ローンの利息は別のコストです。",
      },
      {
        pregunta: "車にかかる費用を減らすには？",
        respuesta: "保険は毎年見直して比べ、タイヤの空気圧と点検をきちんと保ち、頻繁な乗り換えは避けましょう。価値がいちばん大きく下がるのは最初の数年です。",
      },
    ],
    glosario: [
      { termino: "価値の目減り", definicion: "時間と使用によって車の価値が下がる分です。" },
      { termino: `1${unidad}あたりのコスト`, definicion: `すべての費用を含めた、1${unidad}走るごとの平均コストです。` },
    ],
  };
};
