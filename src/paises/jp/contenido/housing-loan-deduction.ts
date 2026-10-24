import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.housing-loan-deduction",
  h1: "住宅ローン控除の計算（令和8年・令和9年入居）",
  title: "住宅ローン控除 計算 2026｜控除額と限度額",
  description:
    "住宅ローンの年末残高と住宅の区分から、住宅ローン控除の1年分の控除額を計算します。令和8年・令和9年に新築住宅へ入居した場合の限度額に対応しています。",
  intro: [
    "住宅ローン控除は、住宅ローンの年末残高の{{jp.housing-loan-rate}}を、所得税から差し引く制度です。住宅の省エネ性能によって控除限度額と控除期間が変わります。",
    "令和8年・令和9年に新築または建築後使用されたことのない住宅に入居した場合の控除額を計算します。",
  ],
  comoSeCalcula: [
    "控除額 ＝ 年末残高 × {{jp.housing-loan-rate}}（100円未満切り捨て）。ただし住宅の区分ごとの控除限度額までです。",
    "控除限度額は、認定住宅{{jp.housing-loan-limit[certified]}}、ZEH水準省エネ住宅{{jp.housing-loan-limit[zeh]}}、省エネ基準適合住宅{{jp.housing-loan-limit[energy]}}です。",
    "特例対象個人は、認定住宅{{jp.housing-loan-limit[certified-family]}}、ZEH水準省エネ住宅{{jp.housing-loan-limit[zeh-family]}}、省エネ基準適合住宅{{jp.housing-loan-limit[energy-family]}}に上乗せされます。",
  ],
  ejemplo: [
    "ZEH水準省エネ住宅で年末残高が3,000万円なら、3,000万円×0.7％＝21万円が控除額です。控除期間は13年です。",
  ],
  faq: [
    {
      pregunta: "特例対象個人とはだれですか？",
      respuesta: "40歳未満で配偶者がいる人、40歳以上で40歳未満の配偶者がいる人、または19歳未満の扶養親族がいる人です。判定は入居した年の12月31日の状況で行います。",
    },
    {
      pregunta: "省エネ基準を満たさない新築住宅は控除を受けられますか？",
      respuesta: "令和6年以降に入居したその他の住宅は、原則として対象外です。令和5年12月31日までに建築確認を受けたもの（または令和6年6月30日までに建築されたもの）は、控除限度額{{jp.housing-loan-limit[other]}}で10年間の控除が受けられます。",
    },
    {
      pregunta: "最初の年は確定申告が必要ですか？",
      respuesta: "会社員でも、控除を受ける最初の年は確定申告が必要です。2年目以後は年末調整で受けられます。",
    },
    {
      pregunta: "所得の要件はありますか？",
      respuesta: "床面積50平方メートル以上の住宅では、控除を受ける年の合計所得金額が2,000万円以下であることが必要です。",
    },
  ],
  glosario: [
    { termino: "年末残高", definicion: "その年の12月31日時点で残っている住宅ローンの元本です。金融機関の残高証明書で確認できます。" },
    { termino: "ZEH水準省エネ住宅", definicion: "断熱等性能等級5以上かつ一次エネルギー消費量等級6以上の住宅です。" },
  ],
});
