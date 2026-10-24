import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `${ctx.nombrePais}の消費税計算ツール`,
    title: tituloQueEntre(`消費税計算ツール（${tasa}）｜${ctx.nombrePais}`, `消費税計算ツール（${tasa}）`, "消費税計算ツール"),
    description: `どんな価格でも${tasa}の消費税を1回で足したり抜いたりできます。税抜き価格、税額、税込み価格を1円単位で表示します。`,
    intro: [`${ctx.nombrePais}で使う標準税率は${tasa}です。`, "税抜き価格に税を足すか、税込み価格から税を抜くかを選んで、金額を入れてください。"],
    comoSeCalcula: [
      "税を足す場合：税額 ＝ 税抜き価格 × 税率 ÷ 100、税込み価格 ＝ 税抜き価格 ＋ 税額",
      "税を抜く場合：税抜き価格 ＝ 税込み価格 ÷ （1 ＋ 税率 ÷ 100）、税額はその差です。",
      "軽減税率が適用される商品は、「別の税率」に入れて計算できます。",
    ],
    ejemplo: [`${precio}に税を足すには、${tasa}を掛けた額を価格に足します。`, `税込み${precio}に含まれる税額を知るには、1に税率を足した数で割り、元の金額から引きます。`],
    faq: [
      {
        pregunta: "税込み価格から消費税を抜くには？",
        respuesta: "価格を、1に税率を小数で足した数で割ります。残りが税抜き価格で、その差が税額です。",
      },
      {
        pregunta: "税込み価格から税率分を引くだけではだめなのですか？",
        respuesta: "税は、それより小さい税抜き価格をもとに計算されているからです。税込み価格から税率分を引くと、引きすぎになります。",
      },
      {
        pregunta: `すべての商品に${tasa}がかかりますか？`,
        respuesta: "そうとは限りません。食料品などには軽減税率があったり、非課税のものもあったりします。その場合は「別の税率」を使ってください。",
      },
    ],
    glosario: [
      { termino: "消費税", definicion: "商品やサービスの価格に上乗せされる税です。国によっては付加価値税やGSTと呼ばれます。" },
      { termino: "税抜き価格", definicion: "税を足す前の価格です。" },
    ],
  };
};
