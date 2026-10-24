import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `10 × 10フィート、厚さ4インチのテラスには、コンクリートが${n(ft3)}立方フィート（${n(ft3 / 27)}立方ヤード）必要です。`,
          `基準の配合なら、セメントは約${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)}ポンドです。`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `4 × 3m、厚さ10cmの土間には、コンクリートが${n(volumen, 1)}m³必要です。`,
          `基準の配合なら、セメント約${n(MEZCLA.cementoKg * volumen, 0)}kg、砂${n(MEZCLA.arenaM3 * volumen)}m³、砂利${n(MEZCLA.piedraM3 * volumen)}m³です。`,
        ];
      })();
  return {
    h1: "コンクリートの量の計算ツール",
    title: tituloQueEntre(`コンクリート計算ツール｜${ctx.nombrePais}`, "コンクリート計算ツール"),
    description: `土間やスラブに必要なコンクリートの量を${imperial ? "立方ヤード" : "m³"}で計算し、セメント、砂、砂利のおおよその量も表示します。`,
    intro: [
      "長さ、幅、厚さを入れると、コンクリートの体積と、練るのに必要な材料のおおよその量がわかります。",
      "材料の量は配合によって変わります。このツールは汎用的な1：2：3の配合を基準にしています。",
    ],
    comoSeCalcula: [
      imperial ? "体積 ＝ 長さ × 幅 × 厚さ（厚さはフィート）。立方フィートを27で割ると立方ヤードです。" : "体積 ＝ 長さ × 幅 × 厚さ（厚さはメートル）",
      "地面の凹凸やこぼれる分として、余裕分を足します。",
      `1m³あたり、セメント約${MEZCLA.cementoKg}kg、砂${n(MEZCLA.arenaM3)}m³、砂利${n(MEZCLA.piedraM3, 1)}m³、水${MEZCLA.aguaL}リットルです。`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "1立方ヤードは何立方フィートですか？",
        respuesta: "27立方フィートです。1立方ヤードは3 × 3 × 3フィートの立方体です。",
      },
      {
        pregunta: "コンクリート1m³にセメントはどのくらい必要ですか？",
        respuesta: `1：2：3の配合なら約${MEZCLA.cementoKg}kgです。強度の高いコンクリートほどセメントを多く使います。`,
      },
      {
        pregunta: "生コンを注文したほうがいいですか？",
        respuesta: "量が多い場合は、品質が安定していて早く済むことが多いです。小さな作業なら、この量を目安に現場で練るのも一般的です。",
      },
    ],
    glosario: [
      { termino: "配合", definicion: "セメント、砂、砂利、水を混ぜる割合です。" },
      { termino: "立方ヤード（yd³）", definicion: "1辺が1ヤードの立方体の体積で、27立方フィートです。" },
    ],
  };
};
