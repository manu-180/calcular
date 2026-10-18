import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "増減率の計算ツール",
    title: tituloQueEntre(`増減率の計算ツール｜${ctx.nombrePais}`, "増減率の計算ツール"),
    description: "価格、給与、売上など、時間とともに変わった数値が何%増えたか、何%減ったかを計算します。",
    intro: [
      "変化前と変化後の値を入れると、増減率と差がわかります。",
      "元の値に戻るには何%変わる必要があるかも表示します。同じ%になることはほとんどありません。",
    ],
    comoSeCalcula: [
      "増減率 ＝ （変化後の値 − 変化前の値） ÷ 変化前の値 × 100",
      "結果がプラスなら増加、マイナスなら減少です。",
      "変化前の値がマイナスのときは絶対値で割るので、符号を見れば改善したかどうかがわかります。",
    ],
    ejemplo: [`${m(antes)}だったものが${m(despues)}になったら、25%の値上がりです。`, "元の価格に戻るには、25%ではなく20%下がる必要があります。"],
    faq: [
      {
        pregunta: "増加率はどう計算しますか？",
        respuesta: "変化後の値から変化前の値を引き、変化前の値で割って100を掛けます。80から100なら、20 ÷ 80 × 100 ＝ 25%です。",
      },
      {
        pregunta: "減少率はどう計算しますか？",
        respuesta: "計算式は同じです。100から80なら、−20 ÷ 100 × 100 ＝ −20%で、20%の減少です。",
      },
      {
        pregunta: "25%上がって25%下がっても元に戻らないのはなぜですか？",
        respuesta: "基準になる数が違うからです。80の25%増しは100ですが、100の25%減は75です。",
      },
      {
        pregunta: "%と%ポイントの違いは何ですか？",
        respuesta: "金利が10%から12%になった場合、上がったのは2%ポイントです。増減率で表すと20%の上昇です。",
      },
    ],
    glosario: [
      { termino: "増減率", definicion: "値がどれだけ変わったかを、もとの値に対する%で表したものです。" },
      { termino: "%ポイント", definicion: "2つのパーセントの単純な差です。" },
    ],
  };
};
