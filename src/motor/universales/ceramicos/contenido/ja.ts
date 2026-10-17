import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [`150平方フィートに12 × 12インチ（1枚1平方フィート）のタイルをロス率10%で張るなら、${piezas}枚必要です。`, `1箱10枚入りなら${Math.ceil(piezas / 10)}箱です。`];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [`20m²に60 × 60cm（1枚${n(pieza)}m²）のタイルをロス率10%で張るなら、${piezas}枚必要です。`, `1箱4枚入りなら${Math.ceil(piezas / 4)}箱です。`];
      })();
  return {
    h1: "タイルの枚数計算ツール",
    title: tituloQueEntre(`タイルの枚数計算ツール｜${ctx.nombrePais}`, "タイルの枚数計算ツール"),
    description: "床や壁に必要なタイルの枚数を、カットや割れのロス分も含めて計算します。買う箱数もわかります。",
    intro: [
      "張る面積、タイル1枚の大きさ、1箱の枚数を入れると、買うべき枚数と箱数がわかります。",
      "ロス率は、端のカットやたまに出る割れの分です。",
    ],
    comoSeCalcula: [
      `タイル1枚の面積 ＝ 縦 × 横（${imperial ? "平方フィート" : "m²"}に換算）`,
      "枚数 ＝ 面積 × （1 ＋ ロス率 ÷ 100） ÷ タイル1枚の面積（切り上げ）",
      "箱数 ＝ 枚数 ÷ 1箱の枚数（切り上げ）",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "ロス率はどのくらい見ればいいですか？",
        respuesta: "まっすぐ張るなら10%です。斜め張りやヘリンボーン、カットの多い部屋なら15〜20%を見てください。",
      },
      {
        pregunta: "目地の幅も計算に入れる必要がありますか？",
        respuesta: "必要ありません。目地は数ミリなので、その差はロス率でカバーできます。",
      },
      {
        pregunta: "予備を買っておくべきですか？",
        respuesta: "はい。同じロットのタイルを数枚取っておきましょう。あとで割れたとき、同じ色味が見つからないことがあります。",
      },
    ],
    glosario: [
      { termino: "ロス率", definicion: "カットや割れに備えて多めに買う割合です。" },
      { termino: "ロット", definicion: "製造された単位のことです。ロットが違うと色味がわずかに異なることがあります。" },
    ],
  };
};
