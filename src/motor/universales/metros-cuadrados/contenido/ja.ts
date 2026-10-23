import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "フィート" : "m";
  const us = imperial ? "平方フィート" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "面積計算ツール（平方メートル）",
    title: tituloQueEntre(`面積計算ツール（平方メートル）｜${ctx.nombrePais}`, `面積計算ツール｜${ctx.nombrePais}`, "面積計算ツール"),
    description: "部屋、床、土地の面積を計算します。長方形、三角形、円に対応し、最大5つの区画を合計できます。",
    intro: [
      "形を選んで寸法を入れてください。単純な長方形でない場合は、区画に分けて入れると合計してくれます。",
      imperial ? "結果は平方メートルでも表示します。" : "結果は平方フィートでも表示します。",
    ],
    comoSeCalcula: [
      "長方形：縦 × 横",
      "三角形：底辺 × 高さ ÷ 2",
      `円：π × 半径 × 半径（半径は直径の半分）。1m²は${n(FT2_POR_M2)}平方フィートです。`,
    ],
    ejemplo: [
      imperial
        ? `L字型のリビングは、16 × 12フィートと10 × 6フィートの長方形に分けられます。合計${n(enL, 0)}平方フィートです。`
        : `L字型のリビングは、5 × 4mと3 × 2mの長方形に分けられます。合計${n(enL, 0)}m²です。`,
      `直径2${u}の丸いテーブルの面積は${n(area("circulo", 2, 0))}${us}です。`,
    ],
    faq: [
      {
        pregunta: "部屋の面積はどう計算しますか？",
        respuesta: "縦と横の長さをメートルで測って掛けます。4 × 3mの部屋なら12m²です。",
      },
      {
        pregunta: "寸法がセンチメートルの場合は？",
        respuesta: `先にメートルに直してください。センチメートルを100で割ります。350cmは${n(3.5, 1)}mです。`,
      },
      {
        pregunta: "坪や畳との関係は？",
        respuesta: `1坪は約${n(400 / 121)}m²です。畳は地域や建物によって大きさが違うので、正確な面積はm²で確認してください。`,
      },
    ],
    glosario: [
      { termino: "平方メートル（m²）", definicion: "1辺が1mの正方形の面積です。" },
      { termino: "平方フィート（ft²）", definicion: "1辺が1フィートの正方形の面積です。" },
    ],
  };
};
