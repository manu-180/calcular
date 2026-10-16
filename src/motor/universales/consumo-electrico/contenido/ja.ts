import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "電気代の計算ツール",
    title: tituloQueEntre(`電気代の計算ツール｜${ctx.nombrePais}`, "電気代の計算ツール"),
    description: "家電の消費電力、使用時間、1kWhあたりの料金から、電気代を1日、1か月、1年ごとに計算します。",
    intro: [
      "家電の消費電力、使う時間、明細に書かれた1kWhあたりの料金を入れると、電力量と電気代がわかります。",
      "エアコン、暖房、冷蔵庫、パソコンなど、どの家電が電気代に大きく影響しているかを調べるのに使えます。",
    ],
    comoSeCalcula: [
      "1日の電力量（kWh） ＝ 消費電力（W） × 使用時間 ÷ 1000",
      "1か月の電力量 ＝ 1日の電力量 × 使用日数。1年は1か月分の12倍です。",
      "電気代 ＝ 電力量（kWh） × 1kWhあたりの料金",
    ],
    ejemplo: [`1000Wの家電を1日4時間使うと、1日4kWh、1か月${formatearNumero(ctx, kwhMes)}kWhです。`, `1kWhあたり${m(precio)}なら、1か月の電気代は${m(kwhMes * precio)}です。`],
    faq: [
      {
        pregunta: "kWhとは何ですか？",
        respuesta: "1000Wの家電を1時間使ったときの電力量で、電気料金の明細に使われている単位です。",
      },
      {
        pregunta: "冷蔵庫は1日中フルパワーで動いていますか？",
        respuesta: "いいえ。コンプレッサーは入ったり切れたりをくり返します。こうした家電は、24時間ではなく1日8〜10時間ほどで計算してください。",
      },
      {
        pregunta: "明細の金額とぴったり合わないのはなぜですか？",
        respuesta: "明細には基本料金、税金、段階料金などが加わるためです。このツールで出るのは、その家電が使う分だけです。",
      },
    ],
    glosario: [
      { termino: "ワット（W）", definicion: "家電が1秒ごとに使うエネルギーの大きさを表す単位です。" },
      { termino: "キロワット時（kWh）", definicion: "1000Wを1時間使った電力量で、電気料金の計算に使われます。" },
    ],
  };
};
