import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.social-insurance",
  h1: "社会保険料の計算（令和8年度）",
  title: "社会保険料 計算｜健康保険・厚生年金の月額",
  description:
    "月給から健康保険料、介護保険料、子ども・子育て支援金、厚生年金保険料、雇用保険料を計算します。協会けんぽの令和8年度の都道府県別料率に対応しています。",
  intro: [
    "報酬月額と勤務先の都道府県を入れると、毎月の給与から引かれる社会保険料と、会社が負担する額を計算します。",
    "健康保険料率は協会けんぽの令和8年度の料率、厚生年金保険料率は{{jp.pension-insurance-rate}}です。",
  ],
  comoSeCalcula: [
    "報酬月額を等級表に当てはめて標準報酬月額を決めます。健康保険は{{jp.standard-monthly-remuneration[0].cuotaFija}}から{{jp.standard-monthly-remuneration[-1].cuotaFija}}まで、厚生年金は{{jp.pension-remuneration-limits[min]}}から{{jp.pension-remuneration-limits[max]}}までです。",
    "標準報酬月額に、健康保険料率、子ども・子育て支援金率（{{jp.child-support-rate}}）、厚生年金保険料率をかけ、会社と本人で半分ずつ負担します。",
    "40歳以上65歳未満の人は介護保険料率（{{jp.long-term-care-rate}}）も加わります。",
    "雇用保険料は、標準報酬月額ではなく実際の賃金に、本人{{jp.employment-insurance-worker[general]}}、会社{{jp.employment-insurance-employer[general]}}（一般の事業）をかけます。",
  ],
  ejemplo: [
    "東京都で報酬月額30万円、40歳未満の場合、標準報酬月額は30万円です。本人負担は健康保険料14,775円、子ども・子育て支援金345円、厚生年金保険料27,450円、雇用保険料1,500円で、合計44,070円です。",
  ],
  faq: [
    {
      pregunta: "標準報酬月額はいつ決まりますか？",
      respuesta: "毎年9月に、4月から6月の報酬月額をもとに改定されます（定時決定）。その後に報酬が2等級以上変わったときは、途中で改定されます（随時改定）。",
    },
    {
      pregunta: "子ども・子育て支援金とは何ですか？",
      respuesta: "令和8年4月分（5月納付分）から、健康保険料とあわせて徴収されるようになった支援金です。率は全国一律の{{jp.child-support-rate}}で、会社と本人で折半します。",
    },
    {
      pregunta: "賞与にも社会保険料はかかりますか？",
      respuesta: "賞与には、標準賞与額に保険料率をかけた保険料がかかります。このツールは毎月の給与の分だけを計算しています。",
    },
  ],
  glosario: [
    { termino: "報酬月額", definicion: "基本給に通勤手当や残業代などを加えた、1か月の給与の総額です。" },
    { termino: "標準報酬月額", definicion: "報酬月額を区切りのよい等級に当てはめた額で、保険料の計算に使います。" },
    { termino: "労使折半", definicion: "保険料を会社と本人で半分ずつ負担することです。" },
  ],
});
