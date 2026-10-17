import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `体重160ポンド、身長5フィート9インチの人のBMIは${n((160 * KG_POR_LB) / (m * m))}で、普通体重です。`,
        `この身長の適正体重は${n((18.5 * m * m) / KG_POR_LB)}から${n((24.9 * m * m) / KG_POR_LB)}ポンドです。`,
      ]
    : [
        `体重70kg、身長${n(1.75, 2)}mの人のBMIは${n(70 / (1.75 * 1.75))}で、普通体重です。`,
        `この身長の適正体重は${n(18.5 * 1.75 * 1.75)}から${n(24.9 * 1.75 * 1.75)}kgです。`,
      ];
  return {
    h1: "BMI計算ツール",
    title: tituloQueEntre(`BMI計算ツール（適正体重）｜${ctx.nombrePais}`, `BMI計算ツール｜${ctx.nombrePais}`, "BMI計算ツール"),
    description: "体重と身長からBMI（体格指数）を計算し、WHO基準の判定と、身長に合った適正体重の範囲を表示します。",
    intro: [
      "体重と身長を入れると、BMI、世界保健機関（WHO）の基準による判定、身長に合った適正体重の範囲がわかります。",
      "成人向けのおおまかな目安です。医師などの専門家への相談に代わるものではありません。",
    ],
    comoSeCalcula: [
      imperial ? "BMI ＝ 体重（ポンド） × 703 ÷ （身長（インチ） × 身長（インチ））" : "BMI ＝ 体重（kg） ÷ （身長（m） × 身長（m））",
      `${n(18.5)}未満は低体重、${n(18.5)}から${n(24.9)}は普通体重、25から${n(29.9)}は過体重、30以上は肥満です。`,
      `適正体重の範囲は、その身長でBMIが${n(18.5)}から${n(24.9)}になる体重です。`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "BMIの標準はどのくらいですか？",
        respuesta: `WHOの基準では、成人で${n(18.5)}から${n(24.9)}が普通体重です。男女で同じ範囲です。`,
      },
      {
        pregunta: "BMIは誰にでも当てはまりますか？",
        respuesta: "当てはまりません。筋肉と脂肪を区別できないため、筋肉が多い人は高めに出ることがあります。妊娠中の方や子ども、10代では別の見方をします。",
      },
      {
        pregunta: "ポンドとインチでBMIを計算するには？",
        respuesta: "体重（ポンド）に703を掛け、身長（インチ）の2乗で割ります。5フィート9インチなら69 × 69です。",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "体格指数。身長に対して体重がどのくらいかを表す数値です。" },
      { termino: "WHO", definicion: "世界保健機関。成人のBMIの判定区分を定めています。" },
    ],
  };
};
