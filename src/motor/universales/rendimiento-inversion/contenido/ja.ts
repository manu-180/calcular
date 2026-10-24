import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "投資利回り計算ツール（ROI・CAGR）",
    title: tituloQueEntre(`投資利回り計算ツール（ROI・CAGR）｜${ctx.nombrePais}`, `投資利回り計算ツール｜${ctx.nombrePais}`, "投資利回り計算ツール"),
    description: "投資した金額、今の評価額、経過年数から、投資の利益率（ROI）と年平均利回り（CAGR）を計算します。",
    intro: [
      "50%の利益は魅力的ですが、2年で得たのか10年で得たのかでは意味が違います。投資を比べるには、1年あたりの利回りが必要です。",
      "投資した金額、今の評価額、経過年数を入れてください。全体の利益率と、複利で見た年平均利回りを表示します。",
    ],
    comoSeCalcula: [
      "ROI ＝ （最終的な評価額 ＋ 受け取った収益 − 投資した金額） ÷ 投資した金額 × 100",
      "CAGR ＝ （（最終的な評価額 ＋ 受け取った収益） ÷ 投資した金額）の （1 ÷ 年数） 乗 − 1",
      "CAGRは複利で見た年平均の利回りで、毎年くり返すと同じ結果になる率です。",
    ],
    ejemplo: [
      `${m(inicial)}を投資して${m(final)}になれば、利益は${m(final - inicial)}、ROIは${p(roi(inicial, final))}です。`,
      `5年かかった場合の年平均利回りは${p(cagr(inicial, final, 5))}、2年なら${p(cagr(inicial, final, 2))}です。`,
    ],
    faq: [
      {
        pregunta: "ROIとCAGRの違いは何ですか？",
        respuesta: "ROIは、期間に関係なく投資額に対する利益の合計です。CAGRはそれを1年あたりにならしたもので、期間の違う投資どうしを比べられます。",
      },
      {
        pregunta: "年平均利回りが、全体の利益率を年数で割った値にならないのはなぜですか？",
        respuesta: `毎年の利益が残高に加わり、それも増えていくからです。5年で50%の利益は、複利で年${p(cagr(1, 1.5, 5))}であり、10%ではありません。`,
      },
      {
        pregunta: "受け取った配当や利息はどう数えますか？",
        respuesta: "引き出したなら「途中で受け取った収益」に入れます。再投資したなら、すでに最終的な評価額に含まれています。",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "投資利益率。投資額に対する利益の合計の割合です。" },
      { termino: "CAGR", definicion: "年平均成長率。複利で見た1年あたりの平均の利回りです。" },
    ],
  };
};
