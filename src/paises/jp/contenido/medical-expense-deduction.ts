import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.medical-expense-deduction",
  h1: "医療費控除の計算",
  title: "医療費控除 計算｜控除額と戻ってくる税金",
  description:
    "1年間に支払った医療費から、医療費控除の額と、所得税・住民税が減る額の目安を計算します。10万円または総所得金額等の5％の基準と、上限200万円に対応しています。",
  intro: [
    "医療費控除は、自分や生計を一にする家族のために1年間に支払った医療費が一定額を超えたときに受けられる所得控除です。",
    "医療費、保険金などで補てんされる額、所得を入れると、控除額と税金が減る額の目安がわかります。",
  ],
  comoSeCalcula: [
    "医療費控除 ＝ 支払った医療費 － 保険金などで補てんされる額 － {{jp.medical-deduction[threshold]}}",
    "総所得金額等が{{jp.medical-deduction[income-limit]}}未満の人は、{{jp.medical-deduction[threshold]}}の代わりに総所得金額等の{{jp.medical-deduction-income-rate}}を差し引きます。",
    "控除の上限は{{jp.medical-deduction[cap]}}です。所得税は控除額×税率×1.021、住民税は控除額×{{jp.resident-tax-rate}}が減る目安です。",
  ],
  ejemplo: ["医療費を30万円支払い、課税所得が200万円の人なら、医療費控除は20万円です。所得税は20,420円、住民税は20,000円減る目安です。"],
  faq: [
    {
      pregunta: "医療費控除を受けるにはどうすればいいですか？",
      respuesta: "医療費の領収書から「医療費控除の明細書」を作り、確定申告書に添付して提出します。医療保険者から届く医療費通知を添付すると、明細書の記載を簡略化できます。",
    },
    {
      pregunta: "家族の医療費も合算できますか？",
      respuesta: "自分と生計を一にする配偶者やその他の親族のために支払った医療費は、合計して控除を受けられます。",
    },
    {
      pregunta: "セルフメディケーション税制とは何ですか？",
      respuesta: "対象の市販薬の購入費が12,000円を超える部分（上限88,000円）を控除できる特例です。通常の医療費控除とどちらか一方を選んで受けます。",
    },
  ],
  glosario: [
    { termino: "総所得金額等", definicion: "給与所得や事業所得などを合計した金額です。給与だけの人は給与所得控除後の金額です。" },
    { termino: "補てんされる額", definicion: "高額療養費や生命保険の入院給付金など、医療費の支払いのために受け取ったお金です。" },
  ],
});
