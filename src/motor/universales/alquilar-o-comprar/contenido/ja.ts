import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "購入" : "賃貸");
  return {
    h1: "賃貸と購入の比較シミュレーション",
    title: tituloQueEntre(`賃貸と購入の比較シミュレーション｜${ctx.nombrePais}`, `賃貸か購入か｜${ctx.nombrePais}`, "賃貸か購入か"),
    description: "家を借り続ける場合と買う場合を、選んだ年数で比べます。どちらが資産を多く残せるか、何年目から、いくら差がつくかがわかります。",
    intro: [
      "ローンの返済額と家賃を比べるだけでは足りません。買う人は利息、修繕費、固定資産税を払いますが、最後に家が手元に残ります。借りる人は頭金を運用し続けられます。",
      "このツールは、それらを1年ずつ積み上げて、どちらが純資産を多く残せるかを示します。",
    ],
    comoSeCalcula: [
      "購入：毎月ローンと所有費用を払います。純資産は、物件の価値から残っているローンを引いた額です。",
      "賃貸：頭金と諸費用をほかの運用先で運用し続け、家賃は毎年上がります。",
      "毎月、支出の少ないほうが差額を運用するので、どちらも同じ予算で比べられます。",
      "最後に純資産が多いほうが有利です。",
    ],
    ejemplo: [
      `${m(precio)}の物件を頭金20%、金利7%、25年のローンで買う場合と、家賃${m(alquiler)}で借りる場合を比べます。`,
      `10年なら${quien(a10)}が${m(Math.abs(a10.comprar - a10.alquilar))}有利です。3年なら${quien(a3)}が${m(Math.abs(a3.comprar - a3.alquilar))}有利です。`,
    ],
    faq: [
      {
        pregunta: "家賃はお金を捨てているのと同じですか？",
        respuesta: "そうとは限りません。買う人も、利息、固定資産税、修繕費など、戻ってこない費用を払っています。大切なのは、最後にそれぞれどれだけの資産が残るかです。",
      },
      {
        pregunta: "年数によって結果が変わるのはなぜですか？",
        respuesta: "購入には最初に大きな費用（諸費用と最初のうちの利息）がかかり、取り戻すのに時間がかかります。近いうちに引っ越す予定なら、たいていは賃貸が有利です。",
      },
      {
        pregunta: "いちばん影響の大きい項目はどれですか？",
        respuesta: "物件価格と家賃の比率、ローン金利、物件価格の上昇率です。上昇率と運用利回りを変えて、結果がどれだけ動くか試してみてください。",
      },
    ],
    glosario: [
      { termino: "純資産", definicion: "持っている資産から借金を引いた額です。" },
      { termino: "物件価格の上昇率", definicion: "物件の価値が1年でどれだけ上がるかです。" },
      { termino: "機会費用", definicion: "頭金を運用していれば得られたはずの利益です。" },
    ],
  };
};
