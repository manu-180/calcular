import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "マイル" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "ランニングのペース計算ツール",
    title: tituloQueEntre(`ランニングのペース計算ツール｜${ctx.nombrePais}`, "ランニングのペース計算ツール"),
    description: `1${u}あたりのペース、ゴールタイム、距離を計算します。5km、10km、ハーフマラソン、フルマラソンに対応しています。`,
    intro: [
      "距離、タイム、ペースのうち2つがわかれば、残りの1つが出ます。レースの計画や練習の振り返りに使えます。",
      "5km、10km、ハーフマラソン、フルマラソンの距離はあらかじめ入っています。",
    ],
    comoSeCalcula: [`ペース ＝ タイム ÷ 距離。1${u}あたりの分と秒で表します。`, "タイム ＝ ペース × 距離", "距離 ＝ タイム ÷ ペース。平均速度は距離を時間で割った値です。"],
    ejemplo: imperial
      ? [
          `3マイルを27分で走ると、ペースは1マイル9分00秒、時速${formatearNumero(ctx, 20 / 3, 2)}マイルです。`,
          `ハーフマラソン（${formatearNumero(ctx, media, 2)}マイル）を1マイル${ritmoTexto(ritmoMedia)}で走ると、ゴールタイムは${reloj(ritmoMedia * media)}です。`,
        ]
      : [
          "10kmを50分で走ると、ペースは1km5分00秒、時速12kmです。",
          `ハーフマラソン（${formatearNumero(ctx, media, 1)}km）を1km${ritmoTexto(ritmoMedia)}で走ると、ゴールタイムは${reloj(ritmoMedia * media)}です。`,
        ],
    faq: [
      {
        pregunta: `1${u}あたりのペースはどう計算しますか？`,
        respuesta: imperial
          ? `タイムを分に直して、マイル数で割ります。3マイルを28分30秒なら1マイル${formatearNumero(ctx, 9.5, 1)}分、つまり9分30秒です。`
          : `タイムを分に直して、km数で割ります。10kmを55分なら1km${formatearNumero(ctx, 5.5, 1)}分、つまり5分30秒です。`,
      },
      {
        pregunta: "初心者に合ったペースはどのくらいですか？",
        respuesta: "走りながら会話ができるくらいのペースです。体力がつくにつれて、そのペースは速くなります。",
      },
      {
        pregunta: "フルマラソンの距離は？",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)}km（${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)}マイル）です。ハーフマラソンはその半分です。`,
      },
    ],
    glosario: [
      { termino: "ペース", definicion: "1kmまたは1マイルを走るのにかかる時間です。" },
      { termino: "平均速度", definicion: "1時間あたりに進む距離です。" },
    ],
  };
};
