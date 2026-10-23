import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionJa } from "../../dias-entre-fechas/textos/ja";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "年齢計算ツール",
    title: tituloQueEntre(`年齢計算ツール（満年齢）｜${ctx.nombrePais}`, `年齢計算ツール｜${ctx.nombrePais}`, "年齢計算ツール"),
    description: "生年月日から満年齢を年・月・日まで計算します。生まれてから何日たったか、次の誕生日まであと何日かもわかります。",
    intro: [
      "生年月日を入れると、今日時点の正確な年齢が、月数、週数、日数とあわせて表示されます。",
      "基準日を変えれば、特定の日の年齢や、将来その日に何歳になるかも調べられます。",
    ],
    comoSeCalcula: [
      "生まれた日から基準日までの、満了した月数を数えます。12か月で1歳です。",
      "最後の満了月のあとに残った日数が、年齢の「日」になります。",
      "うるう年は366日として数えます。",
    ],
    ejemplo: [
      `${fechaLarga(ctx.locale, nac)}生まれの人は、${fechaLarga(ctx.locale, ref)}時点で${duracionJa(Math.floor(meses / 12), meses % 12, dias)}です。`,
      `日数にすると${formatearNumero(ctx, total)}日です。`,
    ],
    faq: [
      {
        pregunta: "正確な年齢はどう計算しますか？",
        respuesta: "まず満了した年数を数え、次に最後の誕生日からの満了月数、最後に残りの日数を数えます。",
      },
      {
        pregunta: "2月29日生まれの場合は？",
        respuesta: "うるう年でない年は、2月28日を誕生日として計算します。法律によっては3月1日とする場合もあります。",
      },
      {
        pregunta: "生まれてから何日たったか知りたいときは？",
        respuesta: "「日数で表すと」の行を見てください。生まれた日から基準日までの日数で、基準日当日は含みません。",
      },
    ],
    glosario: [
      { termino: "満年齢", definicion: "生まれてから満了した年数で数える年齢です。" },
      { termino: "うるう年", definicion: "2月29日がある366日の年です。4年に1度ですが、一部の100の倍数の年は除きます。" },
    ],
  };
};
