import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.employment-insurance",
  h1: "雇用保険料の計算（令和8年度）",
  title: "雇用保険料 計算 {{anio}}｜本人負担と事業主負担",
  description:
    "賃金と事業の種類から、令和8年度の雇用保険料を本人負担と事業主負担に分けて計算します。一般の事業、農林水産・清酒製造、建設の事業に対応しています。",
  intro: [
    "雇用保険料は、毎月の賃金に事業の種類ごとの料率をかけて計算します。本人負担分は給与から引かれ、事業主負担分は会社が払います。",
    "令和8年4月1日から令和9年3月31日までの料率を使っています。",
  ],
  comoSeCalcula: [
    "一般の事業の本人負担は賃金の{{jp.employment-insurance-worker[general]}}、事業主負担は{{jp.employment-insurance-employer[general]}}です。",
    "農林水産・清酒製造の事業は本人{{jp.employment-insurance-worker[agriculture]}}、事業主{{jp.employment-insurance-employer[agriculture]}}、建設の事業は本人{{jp.employment-insurance-worker[construction]}}、事業主{{jp.employment-insurance-employer[construction]}}です。",
    "事業主負担には、事業主だけが負担する雇用保険二事業の分が含まれます。",
  ],
  ejemplo: ["一般の事業で賃金が30万円の月は、本人負担1,500円、事業主負担2,550円、合計4,050円です。"],
  faq: [
    {
      pregunta: "令和8年度に料率は変わりましたか？",
      respuesta: "一般の事業の合計は1,000分の14.5から1,000分の13.5に下がり、本人負担は1,000分の5.5から1,000分の5になりました。",
    },
    {
      pregunta: "事業主負担が本人負担より多いのはなぜですか？",
      respuesta: "失業等給付・育児休業給付の分は本人と事業主が同じ率で負担し、雇用保険二事業の分（一般の事業は1,000分の3.5、建設の事業は1,000分の4.5）は事業主だけが負担するためです。",
    },
    {
      pregunta: "園芸サービスや酪農はどの料率ですか？",
      respuesta: "園芸サービス、牛馬の育成、酪農、養鶏、養豚、内水面養殖などの事業は、一般の事業の料率が適用されます。",
    },
  ],
  glosario: [
    { termino: "雇用保険", definicion: "失業したときの給付や育児休業給付などのための公的保険です。" },
    { termino: "雇用保険二事業", definicion: "雇用の安定や能力開発のための事業で、保険料は事業主だけが負担します。" },
  ],
});
