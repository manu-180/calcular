import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "生活防衛資金の計算ツール",
    title: tituloQueEntre(`生活防衛資金の計算ツール｜${ctx.nombrePais}`, "生活防衛資金の計算ツール"),
    description: "毎月の必要生活費から、生活防衛資金の目安額と、毎月の貯金で何か月あれば用意できるかを計算します。",
    intro: [
      "生活防衛資金は、予定できない出来事に備えるお金です。失業、病気、急な家の修理などに使います。",
      "これがあれば、いちばん苦しいときにクレジットカードに頼らずに済みます。毎月の必要生活費と、何か月分備えたいかを入れてください。",
    ],
    comoSeCalcula: ["目安の資金 ＝ 毎月の必要生活費 × 備える月数", "あと必要な金額 ＝ 目安の資金 − 今ある金額", "貯め終わるまでの月数 ＝ あと必要な金額 ÷ 毎月貯められる金額（切り上げ）"],
    ejemplo: [`毎月の必要生活費が${m(gastos)}なら、6か月分の資金は${m(gastos * 6)}です。`, `毎月${m(aporte)}貯めれば、${Math.ceil((gastos * 6) / aporte)}か月で貯まります。`],
    faq: [
      {
        pregunta: "生活防衛資金は何か月分あればいいですか？",
        respuesta: "一般的な目安は必要生活費の3〜6か月分です。収入に波がある、自営業、世帯の収入源が1つという場合は、6〜12か月分を目指しましょう。",
      },
      {
        pregunta: "生活防衛資金はどこに置けばいいですか？",
        respuesta: "ふだん使う口座とは分けて、その日のうちに引き出せる安全な場所に置きます。値動きのある投資には向きません。必要なときに確実にあることが役目です。",
      },
      {
        pregunta: "資金づくりと借金の返済、どちらが先ですか？",
        respuesta: "よくあるのは、まず1か月分を貯め、次にクレジットカードなど金利の高い借金を返し、そのあと資金を完成させる順番です。",
      },
    ],
    glosario: [
      { termino: "必要生活費", definicion: "収入が止まっても払い続けなければならない支出です（住居費、食費、光熱費、医療費など）。" },
      { termino: "流動性", definicion: "お金を価値を減らさずにどれだけすぐ使えるかです。" },
    ],
  };
};
