import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "出産予定日の計算ツール",
    title: tituloQueEntre(`出産予定日の計算ツール｜${ctx.nombrePais}`, "出産予定日の計算ツール"),
    description: "最終月経の開始日または受精日から出産予定日を計算し、今日の時点で妊娠何週何日かを表示します。",
    intro: [
      "最終月経の開始日（わかる場合は受精日）を入れると、出産予定日、今日の妊娠週数、妊娠時期がわかります。",
      "あくまで目安です。もっとも正確な日付は、医師や助産師による健診と超音波検査で確認できます。",
    ],
    comoSeCalcula: [
      "ネーゲレの概算法を使っています。出産予定日は、最終月経の開始日に280日（40週）を足した日です。",
      "月経周期が28日より長い、または短い場合は、その差の日数だけ予定日がずれます。",
      "受精日から計算する場合は、266日（38週）を足します。",
      "妊娠週数は、受精日ではなく最終月経の開始日から数えます。",
    ],
    ejemplo: [`最終月経の開始日が${f(fum)}で周期が28日なら、出産予定日は${f(fpp)}です。`, `周期が32日なら4日後ろにずれて、${f(fpp32)}になります。`],
    faq: [
      {
        pregunta: "出産予定日はどう計算しますか？",
        respuesta: "最終月経の開始日に280日を足します。ほぼ同じ日付になる簡単な方法として、月から3を引き（または9を足し）、日に7を足すやり方もあります。",
      },
      {
        pregunta: "妊娠週数を最終月経から数えるのはなぜですか？",
        respuesta: "ほとんどの人が覚えている日付だからです。そのため、妊娠2週の時点ではまだ受精していません。",
      },
      {
        pregunta: "予定日ちょうどに生まれる赤ちゃんはどのくらいいますか？",
        respuesta: "多くありません。ほとんどは37週から42週のあいだに生まれるので、予定日は正確な日ではなく目安です。",
      },
    ],
    glosario: [
      { termino: "最終月経", definicion: "最後の月経のことで、計算には出血が始まった日を使います。" },
      { termino: "ネーゲレの概算法", definicion: "最終月経の開始日に280日を足して出産予定日を出す方法です。" },
    ],
  };
};
