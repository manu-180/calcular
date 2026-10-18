import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "老後資金の計算ツール",
    title: tituloQueEntre(`老後資金の計算ツール｜${ctx.nombrePais}`, "老後資金の計算ツール"),
    description: "毎月の積立で老後までにいくら貯まるか、そこから毎月いくら使えるかを、今のお金の価値で計算します。",
    intro: [
      "公的年金だけでは、今の生活水準を保てないことがよくあります。自分で貯める資金は、少額でも早く始めれば大きな差になります。",
      "現在の年齢、引退したい年齢、今ある貯金、毎月の積立額を入れてください。引退時の資金と、そこから毎月使える金額を表示します。",
    ],
    comoSeCalcula: [
      "資金は毎月、実質利回り（利回りからインフレ率を引いたもの）で増えます。そのため、結果は今のお金の価値で表されます。",
      "引退後は、選んだ年数のあいだ毎月同じ金額を取り崩します。残りの資金はその間も運用されます。",
      "公的年金、税金、運用手数料は含まれていません。",
    ],
    ejemplo: [
      `30歳で${m(actual)}あり、毎月${m(aporte)}を実質4%で積み立てると、65歳で${m(capital30)}になります。25年間、毎月${m(rentaMensual(capital30, 4, 25))}を使えます。`,
      `同じ条件で40歳から始めると${m(capital40)}です。10年の差はとても大きいです。`,
    ],
    faq: [
      {
        pregunta: "実質利回りとは何ですか？",
        respuesta: "インフレ分を差し引いたあとの利回りです。運用の利回りが7%でインフレ率が3%なら、実質利回りは約4%です。",
      },
      {
        pregunta: "公的年金のかわりになりますか？",
        respuesta: "なりません。これは公的年金や企業年金に上乗せする、自分の貯蓄です。公的年金の見込み額は、お住まいの国の担当機関で確認してください。",
      },
      {
        pregunta: "老後のためにいくら貯めればいいですか？",
        respuesta: "決まった答えはありません。よく使われる目安は収入の10〜15%です。何より大切なのは、できるだけ早く始めることです。",
      },
    ],
    glosario: [
      { termino: "実質利回り", definicion: "インフレ率を上回る分の利回りです。" },
      { termino: "今のお金の価値", definicion: "将来の金額を、今それで何が買えるかで表したものです。" },
    ],
  };
};
