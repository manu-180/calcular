import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.consumption-tax",
  h1: "消費税の計算（10％・8％）",
  title: "消費税 計算｜税込み・税抜き（10％・8％）",
  description:
    "税抜き価格から税込み価格を、税込み価格から税抜き価格と消費税額を計算します。標準税率10％と軽減税率8％、国税と地方消費税の内訳にも対応しています。",
  intro: [
    "本体価格に消費税を加えた税込み価格や、税込み価格に含まれる消費税額を計算します。",
    "標準税率は{{jp.consumption-tax-standard}}、飲食料品（酒類と外食を除く）と定期購読の新聞は軽減税率{{jp.consumption-tax-reduced}}です。",
  ],
  comoSeCalcula: [
    "税込み価格 ＝ 税抜き価格 ×（1＋税率）",
    "税抜き価格 ＝ 税込み価格 ÷（1＋税率）",
    "標準税率{{jp.consumption-tax-standard}}のうち消費税（国税）は{{jp.consumption-tax-national-standard}}、残りが地方消費税です。軽減税率{{jp.consumption-tax-reduced}}では国税が{{jp.consumption-tax-national-reduced}}です。",
  ],
  ejemplo: [
    "税抜き1万円の商品は、標準税率なら税込み11,000円で、消費税額は1,000円（国税780円、地方消費税220円）です。",
    "税込み1,080円の食料品は、税抜き1,000円、消費税額80円です。",
  ],
  faq: [
    {
      pregunta: "軽減税率8％の対象は何ですか？",
      respuesta: "酒類を除く飲食料品の譲渡（外食は含みません）と、定期購読契約で週2回以上発行される新聞の譲渡です。",
    },
    {
      pregunta: "軽減税率の8％と、以前の8％は同じですか？",
      respuesta: "合計は同じ8％ですが内訳が違います。軽減税率は国税{{jp.consumption-tax-national-reduced}}と地方消費税1.76％、令和元年9月までの旧税率は国税6.3％と地方消費税1.7％です。",
    },
    {
      pregunta: "食料品の消費税率は今後変わりますか？",
      respuesta: "令和9年4月1日から令和11年3月31日までの2年間、飲食料品の譲渡について消費税率が引き下げられます。それまでは軽減税率{{jp.consumption-tax-reduced}}です。",
    },
  ],
  glosario: [
    { termino: "標準税率", definicion: "ほとんどの商品とサービスにかかる消費税と地方消費税の合計税率です。" },
    { termino: "軽減税率", definicion: "飲食料品と定期購読の新聞にかかる、標準より低い税率です。" },
    { termino: "地方消費税", definicion: "消費税とあわせて納める地方税で、消費税額の22/78です。" },
  ],
});
