import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "単利計算ツール",
    title: tituloQueEntre(`単利計算ツール｜${ctx.nombrePais}`, "単利計算ツール"),
    description: "元本と年利から、日・月・年単位の期間でつく単利の利息を計算します。1年を365日か360日で数えるかも選べます。",
    intro: [
      "単利では、利息はいつも最初の元本に対して計算され、期間中に元本へ組み入れられることはありません。",
      "短期の預金、個人間の貸し借り、学校の問題などでよく使われます。",
    ],
    comoSeCalcula: ["利息 ＝ 元本 × 年利 × 期間（年）", "月数なら12で割り、日数なら金融機関の数え方に合わせて365か360で割ります。", "合計 ＝ 元本 ＋ 利息"],
    ejemplo: [
      `${m(capital)}を年利10%で6か月預けると、利息は${m(capital * 0.1 * 0.5)}です。`,
      `同じ元本を90日預けると、1年365日なら${m((capital * 0.1 * 90) / 365)}、360日なら${m((capital * 0.1 * 90) / 360)}です。`,
    ],
    faq: [
      {
        pregunta: "単利の計算式は？",
        respuesta: `利息 ＝ 元本 × 年利 × 年数です。年利は小数にします（10%なら${formatearNumero(ctx, 0.1, 2)}）。`,
      },
      {
        pregunta: "複利とは何が違いますか？",
        respuesta: "単利はいつも同じ元本に利息がつきます。複利では利息が元本に組み入れられ、その利息にも利息がつきます。",
      },
      {
        pregunta: "1年を360日で数える金融機関があるのはなぜですか？",
        respuesta: "計算を簡単にするための金融の慣習です。360日で数えると利息が少し多くなります。利用する金融機関がどちらを使っているか確認してください。",
      },
    ],
    glosario: [
      { termino: "元本", definicion: "貸したり預けたりする、もとのお金です。" },
      { termino: "単利", definicion: "最初の元本だけに利息がつく計算方法です。" },
    ],
  };
};
