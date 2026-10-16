import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "排卵日の計算ツール",
    title: tituloQueEntre(`排卵日の計算ツール｜${ctx.nombrePais}`, "排卵日の計算ツール"),
    description: "排卵予定日、妊娠しやすい期間、次の月経予定日を計算します。この先3周期分もまとめて確認できます。",
    intro: [
      "最終月経の開始日と月経周期を入れると、排卵予定日、妊娠しやすい日、次の月経予定日がわかります。",
      "周期が規則的な方向けの目安です。避妊の方法ではなく、医師などの専門家への相談に代わるものでもありません。",
    ],
    comoSeCalcula: [
      `排卵はふつう次の月経の${FASE_LUTEA}日前に起こります。最終月経の開始日 ＋ 月経周期 − ${FASE_LUTEA}日で計算します。`,
      "精子は最大5日ほど生きられるため、妊娠しやすい期間は排卵日の5日前から排卵日の翌日までです。",
      "次の月経は、前回の月経から1周期後に来る予定です。",
    ],
    ejemplo: [
      `最終月経の開始日が${f(fum)}で周期が28日なら、排卵予定日は${f(aFecha(v.ovulacion))}です。`,
      `妊娠しやすい期間は${f(aFecha(v.desde))}から${f(aFecha(v.hasta))}まで、次の月経予定日は${f(aFecha(v.proxima))}です。`,
    ],
    faq: [
      {
        pregunta: "いちばん妊娠しやすいのはいつですか？",
        respuesta: "排卵日の2〜3日前と排卵日当日です。妊娠しやすい期間は全体で6日ほどです。",
      },
      {
        pregunta: "周期が不規則でも使えますか？",
        respuesta: "目安にはなりますが、精度は下がります。周期が不規則だと、排卵日が月ごとに数日ずれることがあります。",
      },
      {
        pregunta: "避妊のために使えますか？",
        respuesta: "使えません。計算はおおよそのもので、排卵が早まったり遅れたりすることもあります。妊娠を避けたい場合は避妊法を使ってください。",
      },
    ],
    glosario: [
      { termino: "排卵", definicion: "卵巣から卵子が出ることです。" },
      { termino: "妊娠しやすい期間", definicion: "周期の中で妊娠する可能性がある日です。" },
    ],
  };
};
