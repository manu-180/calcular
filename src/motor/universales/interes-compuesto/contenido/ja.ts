import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "複利計算ツール（積立シミュレーション）",
    title: tituloQueEntre(`複利計算ツール｜${ctx.nombrePais}`, "複利計算ツール"),
    description: "複利と毎月の積立でお金がどう増えるかを計算します。最終的な残高、利息の合計、年ごとの推移がわかります。",
    intro: [
      "複利では、利息が残高に組み入れられ、その利息にも利息がつきます。だから貯蓄は、時間がたつほど速く増えていきます。",
      "今ある金額、毎月積み立てられる金額、利回り、年数を入れてください。最終的な残高と、そのうち利息がいくらかを表示します。",
    ],
    comoSeCalcula: [
      "最終的な残高 ＝ 元本 × （1 ＋ i）の n 乗 ＋ 積立額 × （（1 ＋ i）の n 乗 − 1） ÷ i",
      "i は選んだ複利の期間に相当する月利、n は月数です。",
      "積立額は各月の末に加えます。",
    ],
    ejemplo: [`${m(capital)}から始めて毎月${m(aporte)}を年利7%で積み立てると、10年で${m(a10)}になります。`, `さらに10年続けると${m(a20)}です。後半の10年は、前半の10年よりはるかに多く増えます。`],
    faq: [
      {
        pregunta: "単利と複利の違いは何ですか？",
        respuesta: "単利は、いつも最初の元本だけに利息がつきます。複利は、元本にそれまでの利息を加えた額に利息がつきます。",
      },
      {
        pregunta: "72の法則とは何ですか？",
        respuesta: "お金が2倍になるまでの年数を簡単に求める方法です。72を年利で割ります。年利6%なら約12年で2倍になります。",
      },
      {
        pregunta: "利回りはどのくらいで計算すればいいですか？",
        respuesta: "お金の預け先や運用方法に合った、現実的な利回りにしてください。今の価値で結果を見たい場合は、利回りから想定インフレ率を引いた値を使います。",
      },
    ],
    glosario: [
      { termino: "複利", definicion: "利息を元本に組み入れ、その合計に次の利息がつく仕組みです。" },
      { termino: "積立", definicion: "毎月決まった金額を追加していくことです。" },
    ],
  };
};
