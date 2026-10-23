import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "50/30/20の家計予算計算ツール",
    title: tituloQueEntre(`50/30/20の家計予算計算ツール｜${ctx.nombrePais}`, "家計予算の計算ツール"),
    description: "毎月の手取りを50/30/20のルールで分けます。生活に必要な支出、楽しみのための支出、貯蓄にいくら回すかがわかり、割合も変えられます。",
    intro: [
      "50/30/20のルールは、毎月の家計を簡単に組み立てる方法です。半分を必需品に、30%を楽しみに、20%を貯蓄に回します。",
      "手取りを入れると、それぞれにいくら回せるかがわかります。家賃が高いなど事情が違う場合は、割合を調整してください。",
    ],
    comoSeCalcula: ["生活に必要な支出 ＝ 手取り × 50%", "楽しみのための支出 ＝ 手取り × 30%", "貯蓄 ＝ 手取り × 20%。3つの割合の合計は100%にします。"],
    ejemplo: [
      `手取りが月${m(ingreso)}なら、生活費に${m(ingreso * 0.5)}、楽しみに${m(ingreso * 0.3)}、貯蓄に${m(ingreso * 0.2)}です。`,
      `1年でその20%を積み重ねると、${m(ingreso * 0.2 * 12)}貯まります。`,
    ],
    faq: [
      {
        pregunta: "必要な支出と楽しみのための支出は、どう分けますか？",
        respuesta: "必要な支出は、払わなければならないものです（住居費、基本的な食費、光熱費、交通費、医療費、ローンの最低返済）。楽しみのための支出は、いざというときに削れるものです。",
      },
      {
        pregunta: "必要な支出が50%を超える場合は？",
        respuesta: "とくに家賃が高いと、よくあることです。60/20/20や70/20/10を試してみてください。貯蓄をゼロにするのは避けましょう。",
      },
      {
        pregunta: "ローンの返済は貯蓄に入りますか？",
        respuesta: "最低返済は必要な支出に入れます。早く返すために上乗せする分は、貯金と同じように純資産を増やすので、貯蓄に数えます。",
      },
    ],
    glosario: [
      { termino: "手取り", definicion: "税金や社会保険料を引いたあとに受け取る金額です。" },
      { termino: "50/30/20のルール", definicion: "収入を必需品、楽しみ、貯蓄に分ける方法です。" },
    ],
  };
};
