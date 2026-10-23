import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "昇給の計算ツール",
    title: tituloQueEntre(`昇給の計算ツール｜${ctx.nombrePais}`, "昇給の計算ツール"),
    description: "昇給後の月給、1か月と1年の差額、物価上昇を差し引いた実質の昇給率を計算します。",
    intro: [
      "昇給を提示された、またはこれから交渉する。今の給料と昇給を割合か金額で入れると、毎月と毎年どれだけ変わるかがわかります。",
      "期間中の物価上昇率も入れると、本当に買えるものが増えたのか、追いついただけなのかがわかります。",
    ],
    comoSeCalcula: ["昇給後の月給 ＝ 今の月給 × （1 ＋ 昇給率 ÷ 100）", "1年の差 ＝ 1か月の差 × 1年の支給回数", "実質の昇給率 ＝ （1 ＋ 昇給率） ÷ （1 ＋ 物価上昇率） − 1"],
    ejemplo: [
      `月給${m(sueldo)}が5%上がると${m(sueldo * 1.05)}になります。1か月で${m(sueldo * 0.05)}、1年で${m(sueldo * 0.05 * 12)}増えます。`,
      `期間中の物価上昇率が3%なら、実質の昇給率は${p(aumentoReal(5, 3))}です。物価上昇率が6%なら${p(aumentoReal(5, 6))}です。`,
    ],
    faq: [
      {
        pregunta: "実質の昇給とは何ですか？",
        respuesta: "物価上昇を差し引いたあとの昇給です。新しい給料で、前より多く買えるか少なく買えるかがわかります。",
      },
      {
        pregunta: "昇給率から物価上昇率を引くだけではだめなのですか？",
        respuesta: `2つの割合は足し引きではなく掛け合わせになるからです。昇給5%、物価上昇3%なら、実質の昇給率は2%ではなく${p(aumentoReal(5, 3))}です。物価上昇が大きいほど差は広がります。`,
      },
      {
        pregunta: "どのくらいの昇給を求めればいいですか？",
        respuesta: "少なくとも前回の昇給からの物価上昇分は求めましょう。そうしないと実質的に下がります。それ以上は、同じような仕事の相場と、自分の役割の広がりが目安です。",
      },
    ],
    glosario: [
      { termino: "名目の昇給", definicion: "給与明細に表れる昇給で、物価上昇を考える前の値です。" },
      { termino: "購買力", definicion: "給料で買えるものの量です。" },
    ],
  };
};
