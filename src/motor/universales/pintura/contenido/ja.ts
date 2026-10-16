import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `壁の長さ48フィート、高さ8フィート、ドアと窓が40平方フィートの部屋なら、塗る面積は${n(neta, 0)}平方フィートです。`,
          `2回塗りで1ガロン350平方フィート塗れる塗料なら${n(gal, 2)}ガロン、余裕を含めると${n(gal * (1 + MARGEN), 2)}ガロンです。`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `壁の長さ14m、高さ${n(2.6)}m、ドアと窓が4m²の部屋なら、塗る面積は${n(neta)}m²です。`,
          `2回塗りで1リットル10m²塗れる塗料なら${n(litros, 2)}リットル、余裕を含めると${n(litros * (1 + MARGEN), 2)}リットルです。`,
        ];
      })();
  return {
    h1: "ペンキの必要量計算ツール",
    title: tituloQueEntre(`ペンキの必要量計算ツール｜${ctx.nombrePais}`, "ペンキの必要量計算ツール"),
    description: "壁の大きさ、ドアや窓の面積、重ね塗りの回数、缶に書かれた塗布面積から、必要なペンキの量を計算します。",
    intro: [
      "壁の長さと高さ（または面積そのもの）、ドアや窓の面積、重ね塗りの回数を入れてください。",
      "途中で足りなくならないよう、10%多めに計算します。",
    ],
    comoSeCalcula: ["面積 ＝ 壁の長さの合計 × 高さ − ドアと窓の面積", "塗料の量 ＝ 面積 × 塗る回数 ÷ 塗布面積", `最後に${MARGEN * 100}%の余裕を足します。`],
    ejemplo,
    faq: [
      {
        pregunta: "ペンキ1リットルでどのくらい塗れますか？",
        respuesta: "室内の壁用塗料なら、1回塗りで1リットルあたり8〜12m²ほどが一般的です。正確な値は缶に書かれています。",
      },
      {
        pregunta: "何回塗ればいいですか？",
        respuesta: "2回塗りが基本です。新しい下地や吸い込みの多い壁、色を大きく変える場合は3回必要なこともあります。",
      },
      {
        pregunta: "ドアや窓の面積は差し引くべきですか？",
        respuesta: "大きいものは差し引いてください。小さいものは引かないほうが安心です。端や細かい部分を塗る分に回せます。",
      },
    ],
    glosario: [
      { termino: "塗布面積", definicion: "塗料1リットルまたは1ガロンで、1回塗りで塗れる面積です。" },
      { termino: "重ね塗り", definicion: "壁に塗料を塗る1層1層のことです。" },
    ],
  };
};
