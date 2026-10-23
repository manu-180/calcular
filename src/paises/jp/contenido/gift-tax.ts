import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.gift-tax",
  h1: "贈与税の計算（暦年課税）",
  title: "贈与税 計算｜一般税率と特例税率の速算表",
  description:
    "1年間にもらった財産の額から、暦年課税の贈与税を計算します。基礎控除110万円、一般税率と特例税率（親や祖父母から18歳以上の子や孫へ）に対応しています。",
  intro: [
    "贈与税は、1月1日から12月31日までの1年間にもらった財産の合計から、基礎控除を引いた額にかかります。",
    "父母や祖父母から18歳以上の子や孫への贈与は特例税率、それ以外は一般税率で計算します。",
  ],
  comoSeCalcula: [
    "1年間にもらった財産の合計から基礎控除{{jp.gift-tax-basic-exemption}}を引きます。",
    "残りの額に税率をかけます。税率は{{jp.gift-tax-general[0].tasa}}から{{jp.gift-tax-general[-1].tasa}}までの超過累進です。",
    "特例税率は、一般税率より区切りが広く設定されていて、{{jp.gift-tax-special[-1].desde}}を超える部分が{{jp.gift-tax-special[-1].tasa}}です。一般税率では{{jp.gift-tax-general[-1].desde}}を超える部分が{{jp.gift-tax-general[-1].tasa}}です。",
  ],
  ejemplo: [
    "500万円の贈与を受けた場合、基礎控除後の課税価格は390万円です。一般税率なら390万円×20％－25万円＝53万円、特例税率なら390万円×15％－10万円＝48万5千円です。",
  ],
  faq: [
    {
      pregunta: "110万円以下なら申告はいりませんか？",
      respuesta: "1年間にもらった財産の合計が基礎控除の{{jp.gift-tax-basic-exemption}}以下なら、贈与税はかかりません。",
    },
    {
      pregunta: "特例税率を使えるのはどんな場合ですか？",
      respuesta: "贈与を受けた年の1月1日時点で18歳以上の人が、父母や祖父母などの直系尊属から受けた贈与です。夫の父からの贈与などには使えません。",
    },
    {
      pregunta: "一般贈与と特例贈与の両方があるときは？",
      respuesta: "すべての財産を一般税率で計算した税額と特例税率で計算した税額を、それぞれの財産の割合であん分して合計します。このツールはどちらか一方の場合を計算します。",
    },
  ],
  glosario: [
    { termino: "暦年課税", definicion: "1年ごとに、その年にもらった財産の合計に贈与税をかける方式です。" },
    { termino: "直系尊属", definicion: "父母や祖父母など、自分より前の世代の直系の親族です。" },
  ],
});
