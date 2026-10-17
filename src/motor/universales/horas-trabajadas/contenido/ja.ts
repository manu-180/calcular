import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "勤務時間の計算ツール",
    title: tituloQueEntre(`勤務時間の計算ツール（タイムカード）｜${ctx.nombrePais}`, `勤務時間の計算ツール｜${ctx.nombrePais}`, "勤務時間の計算ツール"),
    description: "出勤・退勤時刻と休憩から1週間の労働時間を合計し、残業代を含めた給与を計算します。",
    intro: [
      "毎日の出勤と退勤の時刻、無給の休憩、時給を入れると、合計の労働時間、残業時間、1週間の給与がわかります。",
      "給与明細の確認、勤務表の記入、時間単位の仕事の請求に使えます。",
    ],
    comoSeCalcula: [
      "1日の労働時間 ＝ 退勤 − 出勤 − 休憩。退勤が出勤より早い時刻なら、翌日に終わった勤務として数えます。",
      "残業時間 ＝ 週の合計 − 所定労働時間（合計がそれを超えた場合）",
      "給与 ＝ 所定時間 × 時給 ＋ 残業時間 × 時給 × （1 ＋ 割増率）",
    ],
    ejemplo: [
      `${hora("09:00")}から${hora("17:30")}まで、休憩30分なら1日${n(jornada)}時間です。月曜から金曜で${n(jornada * 5)}時間、時給${m(pago)}なら${m(jornada * 5 * pago)}です。`,
      `${hora("08:00")}から${hora("18:00")}まで、休憩1時間なら週${n(larga * 5)}時間で、そのうち${n(extra)}時間が残業です。割増50%なら、給与は${m(40 * pago + extra * pago * 1.5)}です。`,
    ],
    faq: [
      {
        pregunta: "労働時間はどう計算しますか？",
        respuesta: "退勤時刻から出勤時刻を引き、休憩を差し引きます。それを1週間分足します。",
      },
      {
        pregunta: "分を時間の小数にするには？",
        respuesta: `分を60で割ります。30分は${n(0.5, 1)}、15分は${n(0.25, 2)}、45分は${n(0.75, 2)}です。7時間45分なら${n(7.75, 2)}時間です。`,
      },
      {
        pregunta: "残業はどこまでできて、どう支払われますか？",
        respuesta: "働く場所の法律と雇用契約によります。このツールは、入力した割増率と所定労働時間を使い、特定のルールは当てはめていません。",
      },
    ],
    glosario: [
      { termino: "残業", definicion: "所定労働時間を超えて働いた時間で、割増した賃金が支払われます。" },
      { termino: "割増率", definicion: "残業1時間に、通常の時給へ上乗せされる割合です。" },
    ],
  };
};
