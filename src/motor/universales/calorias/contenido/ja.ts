import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `35歳、体重180ポンド、身長5フィート10インチの男性の基礎代謝量は約${n(basal)}kcalです。`,
          `ほとんど運動しない場合、体重を維持するカロリーは1日約${n(basal * FACTORES.sedentaria)}kcalです。`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `30歳、体重60kg、身長165cmの女性の基礎代謝量は約${n(basal)}kcalです。`,
          `適度に運動する場合、体重を維持するカロリーは1日約${n(basal * FACTORES.moderada)}kcalです。`,
        ];
      })();
  return {
    h1: "1日の消費カロリー計算ツール",
    title: tituloQueEntre(`消費カロリー計算ツール｜${ctx.nombrePais}`, "消費カロリー計算ツール"),
    description: "年齢、体重、身長、活動量から1日の消費カロリーを計算し、体重を維持、減量、増量するための摂取カロリーの目安を示します。",
    intro: [
      "基本情報と活動量を入れると、基礎代謝量と、ふだんの1日に消費するカロリーがわかります。",
      "あくまで目安です。医師や管理栄養士などの専門家への相談に代わるものではありません。",
    ],
    comoSeCalcula: [
      `基礎代謝量（Mifflin-St Jeorの式）：10 × 体重（kg） ＋ ${n(6.25, 2)} × 身長（cm） − 5 × 年齢に、男性は5を足し、女性は161を引きます。`,
      `維持カロリー ＝ 基礎代謝量 × 活動係数。係数は${n(1.2, 1)}（ほとんど運動しない）から${n(1.9, 1)}（非常に活発）です。`,
      `減量では1日${DEFICIT}kcalを引き、増量では${SUPERAVIT}kcalを足します。無理なく続けられる程度の変化です。`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "基礎代謝量とは何ですか？",
        respuesta: "呼吸、体温の維持、臓器の働きなど、安静にしているだけで体が使うエネルギーのことです。",
      },
      {
        pregunta: "減量するには何kcal摂ればいいですか？",
        respuesta: `維持カロリーより1日約${DEFICIT}kcal少なくするのが一般的な出発点です。専門家と相談して決めるのがおすすめです。`,
      },
      {
        pregunta: "計算式はどのくらい正確ですか？",
        respuesta: "Mifflin-St Jeorの式は広く使われていますが、出てくるのは平均的な値です。遺伝、筋肉量、健康状態によって実際の消費量は変わります。",
      },
    ],
    glosario: [
      { termino: "カロリー（kcal）", definicion: "食べ物に含まれるエネルギーや、体が消費するエネルギーの単位です。" },
      { termino: "基礎代謝量", definicion: "安静にしているときに体が消費するカロリーです。" },
    ],
  };
};
