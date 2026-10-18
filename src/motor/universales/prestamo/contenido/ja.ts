import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "ローン返済シミュレーション",
    title: tituloQueEntre(`ローン返済シミュレーション｜${ctx.nombrePais}`, "ローン返済シミュレーション"),
    description: "ローンの毎月の返済額、利息の総額、返済予定表を計算します。繰り上げ返済でどれだけ利息を減らせるかもわかります。",
    intro: [
      "ローンを組む前に大切なのは、毎月いくら返すかと、利息が全部でいくらかかるかの2つです。",
      "借入額、年利、返済期間を入れてください。毎月少し多めに返す予定なら、その金額も入れると、どれだけ早く返し終わるかがわかります。",
    ],
    comoSeCalcula: [
      "毎月の返済額が一定の元利均等返済で計算します。個人ローン、自動車ローン、住宅ローンで一般的な方式です。",
      "月利 ＝ 年利 ÷ 12",
      "毎月の返済額 ＝ 借入額 × 月利 ÷ （1 − （1 ＋ 月利）の −返済回数 乗）",
      "毎月、残っている元金に利息がかかり、返済額の残りが元金の返済に回ります。",
    ],
    ejemplo: [
      `${m(monto)}を年利12%、36か月で借りると、毎月の返済額は${m(cuota36)}です。利息は全部で${m(interesesTotales(monto, 12, 36))}です。`,
      `60か月にすると毎月の返済額は${m(cuota60)}に下がりますが、利息は${m(interesesTotales(monto, 12, 60))}に増えます。`,
    ],
    faq: [
      {
        pregunta: "ローンの返済額はどう計算しますか？",
        respuesta: "元利均等返済の計算式を使います。毎回の返済額は同じですが、最初のうちは利息の割合が大きく、後になるほど元金の割合が大きくなります。そのため、はじめは残高がなかなか減りません。",
      },
      {
        pregunta: "繰り上げ返済はしたほうがいいですか？",
        respuesta: "高い手数料がかからなければ、たいていは得です。上乗せした分はそのまま元金の返済に回り、その分の利息がかからなくなります。早く返すほど効果が大きくなります。",
      },
      {
        pregunta: "返済期間は長いほうがいいですか？",
        respuesta: "毎月の返済額は下がりますが、利息の総額はかなり増えます。両方の数字を比べてから決めてください。",
      },
      {
        pregunta: "金融機関の提示額と違うのはなぜですか？",
        respuesta: "金融機関は保険料、手数料、税金を加えたり、広告とは違う金利を使ったりすることがあります。金利だけでなく、総支払額で比べてください。",
      },
    ],
    glosario: [
      { termino: "元金", definicion: "借りたお金のうち、まだ返していない部分です。" },
      { termino: "年利", definicion: "1年あたりの金利で、12で割ると毎月の利息の計算に使う月利になります。" },
      { termino: "元利均等返済", definicion: "毎回の返済額（元金と利息の合計）が一定になる返済方法です。" },
    ],
  };
};
