import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "割り勘計算ツール",
    title: tituloQueEntre(`割り勘計算ツール｜${ctx.nombrePais}`, "割り勘計算ツール"),
    description: "最大8人で費用を分けるときの1人あたりの負担額と、誰が誰にいくら払えばいいかを、できるだけ少ない支払い回数で計算します。",
    intro: [
      "旅行、食事会、パーティー、共同の宿泊など、それぞれが違う金額を立て替えたときに使えます。",
      "各自が払った金額を入れると、1人あたりの負担額と、精算に必要な支払いがわかります。",
    ],
    comoSeCalcula: [
      "1人あたりの負担額 ＝ 費用の合計 ÷ 人数",
      "負担額より少なく払った人は差額を払い、多く払った人は差額を受け取ります。",
      "支払いは、払う額が一番多い人から受け取る額が一番多い人へと組むので、余計な送金が生まれません。",
    ],
    ejemplo: [
      `Aさんが${m(a)}、Bさんが${m(b)}払い、Cさんは払っていません。合計は${m(a + b)}なので、1人あたり${m(cuota)}です。`,
      `CさんはAさんに${m(cuota)}、BさんはAさんに${m(cuota - b)}払います。`,
    ],
    faq: [
      {
        pregunta: "立て替えた金額がばらばらのときは、どう割り勘しますか？",
        respuesta: "全部を足して人数で割り、各自が払った金額と比べます。その差が、払う額または受け取る額です。",
      },
      {
        pregunta: "何も払っていない人がいる場合は？",
        respuesta: "その人の欄に0を入れると、割り勘の人数に含まれます。空欄のままだと計算から外れます。",
      },
      {
        pregunta: "支払いの回数が人数より少ないのはなぜですか？",
        respuesta: "貸し借りをまとめているからです。一番多く払うべき人が一番多く立て替えた人に払う、という順に組むので、支払いは「人数 − 1」回を超えません。",
      },
    ],
    glosario: [
      { termino: "負担額", definicion: "費用の合計のうち、1人が払うべき金額です。" },
      { termino: "差額", definicion: "実際に払った金額と負担額との差です。" },
    ],
  };
};
