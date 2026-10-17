import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "フリーランスの単価計算ツール",
    title: tituloQueEntre(`フリーランスの単価計算ツール｜${ctx.nombrePais}`, "フリーランスの単価計算ツール"),
    description: "手元に残したい金額、経費、税金、休日、請求できる時間から、フリーランスの時間単価と日当を計算します。",
    intro: [
      "フリーランスによくある失敗は、会社員として欲しい給料を160時間で割ってしまうことです。それでは税金、経費、休暇、請求できない時間が抜け落ちます。",
      "このツールは、手元に残したい金額から出発して、そのためにいくら請求すればいいかを示します。",
    ],
    comoSeCalcula: [
      "必要な売上 ＝ 手元に残したい金額 ÷ （1 − 税率） ＋ 事業経費",
      "稼働日数 ＝ 52週 × 週の稼働日数 − 休日数",
      "1年の請求できる時間 ＝ 稼働日数 × 1日の請求できる時間",
      "時間単価 ＝ 必要な売上 ÷ 1年の請求できる時間",
    ],
    ejemplo: [
      `経費${m(gastos)}、税率25%で、1年に${m(ingreso)}を手元に残すには、${m(r.facturado)}の売上が必要です。`,
      `休日30日、週25時間請求できるなら、1年で${Math.round(r.horas)}時間です。時間単価は${m(r.hora)}、日当は${m(r.dia)}になります。`,
    ],
    faq: [
      {
        pregunta: "週に何時間請求できますか？",
        respuesta: "働く時間よりは少なくなります。営業、メール、請求書作成、勉強には誰もお金を払ってくれません。40時間のうち20〜30時間が一般的です。",
      },
      {
        pregunta: "時間単位と案件単位、どちらで請求すべきですか？",
        respuesta: "どちらでもかまいません。案件単位で見積もる場合も、かかる時間を見積もってこの単価を掛けると、足りなくなるのを防げます。",
      },
      {
        pregunta: "税率はいくつにすればいいですか？",
        respuesta: "国や事業の形態によって違います。所得税と社会保険料を合わせて考えてください。わからなければ税理士に確認しましょう。",
      },
    ],
    glosario: [
      { termino: "請求できる時間", definicion: "クライアントに請求できる作業時間です。" },
      { termino: "手取り", definicion: "税金と事業経費を引いたあとに残る金額です。" },
    ],
  };
};
