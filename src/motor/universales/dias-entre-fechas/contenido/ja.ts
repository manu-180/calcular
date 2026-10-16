import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "日数計算ツール",
    title: tituloQueEntre(`日数計算ツール（日付から日付まで）｜${ctx.nombrePais}`, `日数計算ツール｜${ctx.nombrePais}`, "日数計算ツール"),
    description: "2つの日付のあいだの日数を数えます。暦日、週、月のほか、月曜から金曜までの営業日もわかります。",
    intro: [
      "開始日と終了日を選ぶと、暦日の日数、それを週や月で表した期間、営業日の数がわかります。",
      "締め切り、支払期日、休暇、出産予定、カウントダウンなどに使えます。",
    ],
    comoSeCalcula: [
      "暦日は、2つの日付のあいだのすべての日です。開始日は数え、終了日はオプションを選ばない限り数えません。",
      "営業日は、同じ期間にある月曜から金曜の日数です。祝日は差し引いていません。",
      "うるう年は2月29日も含めて数えます。",
    ],
    ejemplo: [`${f(desde)}から${f(hasta)}までは${dias}日です。`, `そのうち月曜から金曜は${habiles}日です。`],
    faq: [
      {
        pregunta: "初日と最終日は数えますか？",
        respuesta: "初期設定では、日付の引き算と同じく初日を数えて最終日は数えません。両方数えたい場合は「終了日も数える」を選んでください。",
      },
      {
        pregunta: "営業日から祝日は除かれますか？",
        respuesta: "除かれません。月曜から金曜を数えています。祝日は国、地域、年によって変わるので、別に差し引いてください。",
      },
      {
        pregunta: "1年は何日ですか？",
        respuesta: "365日、うるう年は366日です。そのため、同じ月日の組み合わせでも年が違うと日数が変わることがあります。",
      },
    ],
    glosario: [
      { termino: "暦日", definicion: "土日や祝日も含めた、カレンダー上のすべての日です。" },
      { termino: "営業日", definicion: "このツールでは月曜から金曜までの日です。" },
    ],
  };
};
