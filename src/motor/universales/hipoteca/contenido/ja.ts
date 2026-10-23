import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "住宅ローンシミュレーション",
    title: tituloQueEntre(`住宅ローンシミュレーション｜${ctx.nombrePais}`, "住宅ローンシミュレーション"),
    description: "物件価格、頭金、金利、返済期間から住宅ローンの毎月の返済額を計算します。利息の総額と、年ごとの残高の減り方もわかります。",
    intro: [
      "住宅ローンは、多くの家庭にとって人生でいちばん大きな借金です。金融機関に相談する前に、全体の数字を確認しておきましょう。",
      "物件価格、頭金、金利、返済期間を入れてください。固定資産税や保険料もあわせて払うなら、それも入れると実際の毎月の支払いがわかります。",
    ],
    comoSeCalcula: [
      "借入額 ＝ 物件価格 − 頭金",
      "年利を12で割った月利と、月数にした返済期間で、毎月一定の返済額を計算します。",
      "年ごとに、払った利息と返した元金を合計し、残っている借入額を表示します。",
    ],
    ejemplo: [
      `${m(precio)}の物件に頭金20%を入れると、借入額は${m(prestado)}です。年利7%、30年なら毎月の返済額は${m(cuota30)}です。`,
      `30年間で払う利息は${m(interesesTotales(prestado, 7, 360))}です。15年にすると毎月の返済額は${m(cuota15)}に上がりますが、利息は${m(interesesTotales(prestado, 7, 180))}に下がります。`,
    ],
    faq: [
      {
        pregunta: "頭金はどのくらい必要ですか？",
        respuesta: "金融機関や国によって違います。頭金が多いほど借入額が減り、毎月の返済額も利息も少なくなります。諸費用の分も別に用意しておきましょう。",
      },
      {
        pregunta: "最初の数年で残高がほとんど減らないのはなぜですか？",
        respuesta: "利息は残っている借入額にかかります。最初は残高が大きいので、返済額の多くが利息に回ります。時間がたつと、その割合が逆転します。",
      },
      {
        pregunta: "返済期間は短いほうがいいですか？",
        respuesta: "毎月の返済額が上がっても払えるなら、短いほうが利息を大きく減らせます。難しければ、長めの期間で組み、余裕のあるときに繰り上げ返済する方法もあります。",
      },
      {
        pregunta: "返済額は変わることがありますか？",
        respuesta: "固定金利なら返済額は変わりません。変動金利の場合は変わることがあります。このツールは、返済期間中ずっと金利が同じと仮定しています。",
      },
    ],
    glosario: [
      { termino: "頭金", definicion: "物件価格のうち、自己資金で払う部分です。" },
      { termino: "元金", definicion: "借りたお金のうち、まだ返していない部分です。" },
      { termino: "残高", definicion: "ローンでまだ返していない金額です。" },
    ],
  };
};
