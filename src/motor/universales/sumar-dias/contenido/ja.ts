import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "日付計算ツール（○日後・○日前）",
    title: tituloQueEntre(`日付計算ツール（○日後・○日前）｜${ctx.nombrePais}`, `日付計算ツール｜${ctx.nombrePais}`, "日付計算ツール"),
    description: "ある日付から暦日や営業日を足したり引いたりして、何日後・何日前が何月何日の何曜日かを計算します。期限の確認に便利です。",
    intro: [
      "日付、日数、足すか引くかを選ぶと、計算後の日付と曜日がわかります。",
      "営業日を選ぶと、土曜と日曜を飛ばして数えます。",
    ],
    comoSeCalcula: [
      "暦日の場合は、入れた日数の分だけカレンダーを1日ずつ進めます。",
      "営業日の場合は、月曜から金曜だけを数えます。基準日そのものは数えません。",
      "祝日は国や地域で違うため、差し引いていません。",
    ],
    ejemplo: [`${f(inicio)}の90日後は${f(mas90)}です。`, `${f(inicio)}の15営業日後は${f(aFecha(habil))}です。`],
    faq: [
      {
        pregunta: "基準日は1日目に数えますか？",
        respuesta: "数えません。月曜日に1日足すと火曜日です。多くの期限はこの数え方です。",
      },
      {
        pregunta: "土曜日から営業日を足すとどうなりますか？",
        respuesta: "最初の営業日は次の月曜日です。土曜日に1営業日足すと月曜日になります。",
      },
      {
        pregunta: "うるう年にも対応していますか？",
        respuesta: "対応しています。期間に2月29日が入る場合は、その日も1日として数えます。",
      },
    ],
    glosario: [
      { termino: "暦日", definicion: "飛ばす日のない、カレンダー上のすべての日です。" },
      { termino: "営業日", definicion: "このツールでは月曜から金曜までの日です。" },
    ],
  };
};
