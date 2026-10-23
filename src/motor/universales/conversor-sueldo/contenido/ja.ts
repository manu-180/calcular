import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "時給・月給・年収の換算ツール",
    title: tituloQueEntre(`時給・月給・年収の換算ツール｜${ctx.nombrePais}`, "時給・年収の換算ツール"),
    description: "実際の労働時間と有給の週数をもとに、給与を時給、日給、週給、月給、年収のあいだで換算します。",
    intro: [
      "今の給料は時給にするといくらか。時給で提示された仕事は年収でいくらになるか。金額と単位を選ぶと、ほかの単位をすべて表示します。",
      "求人の比較、残業代の見積もり、自分の時間の価値を知るのに使えます。",
    ],
    comoSeCalcula: [
      "まず、すべてを年額に直します。",
      "時給 ＝ 年収 ÷ （週の労働時間 × 有給の週数）",
      "日給 ＝ 年収 ÷ （週の勤務日数 × 有給の週数）、週給 ＝ 年収 ÷ 有給の週数",
      "月給 ＝ 年収 ÷ 12、半月ごと ＝ 年収 ÷ 24",
    ],
    ejemplo: [`年収${m(anual)}で週40時間働くと、時給${m(anual / 2080)}、月給${m(anual / 12)}です。`, `時給${m(hora)}でフルタイムで働くと、年収は${m(hora * 2080)}です。`],
    faq: [
      {
        pregunta: "1年の労働時間は何時間ですか？",
        respuesta: `週40時間、有給の週が52週なら${formatearNumero(ctx, 2080)}時間です。そのため、時給に約${formatearNumero(ctx, 2000)}を掛けるのが手早い目安になります。`,
      },
      {
        pregunta: "週給を4倍しても月給にならないのはなぜですか？",
        respuesta: `1か月は平均${formatearNumero(ctx, 52 / 12, 2)}週で、4週ではないからです。週給から月給を出すには、52を掛けて12で割ります。`,
      },
      {
        pregunta: "賞与や税金は含まれますか？",
        respuesta: "含まれません。同じ金額を単位のあいだで換算するだけです。賞与がある場合は、求人を比べるときに別に足してください。",
      },
    ],
    glosario: [
      { termino: "額面", definicion: "税金や社会保険料が引かれる前の給与です。" },
      { termino: "有給の週数", definicion: "1年のうち給与が支払われる週の数です。" },
    ],
  };
};
