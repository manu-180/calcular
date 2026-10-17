import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "チップ計算ツール",
    title: tituloQueEntre(`チップ計算ツール｜${ctx.nombrePais}`, "チップ計算ツール"),
    description: "チップの金額、チップ込みの合計、割り勘したときの1人あたりの金額を計算します。1人分をきりのいい金額に切り上げることもできます。",
    intro: [
      "会計金額、チップの割合、支払う人数を入れると、チップ、合計、1人あたりの金額がわかります。",
      "きりのいい金額にしたい場合は1人分を切り上げます。切り上げた分はチップに回ります。",
    ],
    comoSeCalcula: ["チップ ＝ 会計金額 × チップの割合 ÷ 100", "合計 ＝ 会計金額 ＋ チップ", "1人あたり ＝ 合計 ÷ 人数"],
    ejemplo: [`${m(cuenta)}の会計に15%のチップを足すと${m(propina)}増え、合計は${m(cuenta + propina)}です。`, `3人で割ると、1人${m((cuenta + propina) / 3)}です。`],
    faq: [
      {
        pregunta: "チップはいくら払えばいいですか？",
        respuesta: `その土地の習慣によります。${ctx.nombrePais}での一般的な習慣と、会計にサービス料がすでに含まれていないかを確認してください。`,
      },
      {
        pregunta: "チップは税抜きと税込みのどちらにかけますか？",
        respuesta: "多くの人は会計に表示された合計金額にかけます。税抜きの金額にかけたい場合は、その金額を入れてください。",
      },
      {
        pregunta: "15%のチップを手早く計算するには？",
        respuesta: "会計を10で割って10%を出し、その半分を足します。40なら4と2で、6です。",
      },
    ],
    glosario: [
      { termino: "チップ", definicion: "料金とは別に、サービスへのお礼として渡す金額です。" },
      { termino: "サービス料", definicion: "お店があらかじめ会計に加えている、サービスに対する料金です。" },
    ],
  };
};
