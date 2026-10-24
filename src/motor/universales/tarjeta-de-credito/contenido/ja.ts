import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "クレジットカード返済シミュレーション",
    title: tituloQueEntre(`クレジットカード返済シミュレーション｜${ctx.nombrePais}`, "カード返済シミュレーション"),
    description: "クレジットカードの残高を完済するまでの月数と、払う利息を計算します。毎月一定額で返す場合と、最低支払額だけ払う場合を比べられます。",
    intro: [
      "クレジットカードは、ふつう手持ちの借金のなかでもっとも金利の高いものです。最低支払額だけを払っていると、返済が何年も続き、利息がふくらみます。",
      "残高、年利、毎月返せる金額を入れてください。完済時期、払う利息、月ごとの返済計画を表示します。",
    ],
    comoSeCalcula: [
      "毎月、利息が加わります：残高 × 年利 ÷ 12",
      "そこから返済額を差し引きます。最低支払額の場合は、残高に対する割合で、下限があります。",
      "残高が0になるまでくり返します。返済額が利息以下だと、借金は減りません。",
    ],
    ejemplo: [
      `残高${m(saldo)}、年利22%で毎月${m(fijo)}返すと、${conFijo.meses}か月で完済し、利息は${m(conFijo.intereses)}です。`,
      `3%の最低支払額だけを払うと${conMinimo.meses}か月かかり、利息は${m(conMinimo.intereses)}に増えます。`,
    ],
    faq: [
      {
        pregunta: "最低支払額だけ払うとどうなりますか？",
        respuesta: "残高が減るにつれて最低支払額も小さくなるので、毎月の負担は減りますが、返済は何年も続きます。できれば、少しでも多い一定額で返しましょう。",
      },
      {
        pregunta: "残高を低金利のローンに借り換えるべきですか？",
        respuesta: "ローンの金利がカードの年利よりかなり低ければ、たいていは得です。手数料を含めた利息の総額で、両方を比べてください。",
      },
      {
        pregunta: "どのカードから返せばいいですか？",
        respuesta: "すべてのカードで最低支払額を払い、残りを金利がいちばん高いカードに回します。そうすると、払う利息の合計がもっとも少なくなります。",
      },
    ],
    glosario: [
      { termino: "最低支払額", definicion: "延滞にならずに済む、その月の最低限の支払いです。これだけでは借金は減りにくいです。" },
      { termino: "年利", definicion: "カードが残高に対して1年あたりにかける金利です。" },
    ],
  };
};
