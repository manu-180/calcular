import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.childcare-leave-benefit",
  h1: "育児休業給付金の計算",
  title: "育児休業給付金 計算｜67％と50％の月額",
  description:
    "休業前の賃金から、雇用保険の育児休業給付金の月額と、休業期間全体の合計の目安を計算します。令和8年8月1日からの上限額と下限額に対応しています。",
  intro: [
    "育児休業給付金は、雇用保険の被保険者が子を養育するために育児休業をしたときに支給されます。",
    "休業開始から180日までは休業開始時の賃金月額の{{jp.childcare-benefit-rate[first]}}、その後は{{jp.childcare-benefit-rate[after]}}が支給されます。",
  ],
  comoSeCalcula: [
    "休業開始時の賃金月額は、上限{{jp.childcare-benefit-wage[max]}}、下限{{jp.childcare-benefit-wage[min]}}の範囲で計算します。",
    "月額 ＝ 休業開始時の賃金月額 × 支給率（180日までは{{jp.childcare-benefit-rate[first]}}、181日目からは{{jp.childcare-benefit-rate[after]}}）",
    "180日を6か月として、休業期間全体の合計を出しています。",
  ],
  ejemplo: ["休業前の賃金が月30万円なら、最初の6か月は月201,000円、その後は月150,000円です。12か月休むと合計2,106,000円です。"],
  faq: [
    {
      pregunta: "上限額はいくらですか？",
      respuesta: "令和8年8月1日から、支給率67％のときの支給上限額は332,454円、50％のときは248,100円です。上限額は毎年8月1日に見直されます。",
    },
    {
      pregunta: "休業中に会社から賃金が出たらどうなりますか？",
      respuesta: "休業中に支払われた賃金の額によって、給付金が減ったり支給されなかったりすることがあります。このツールは休業中に賃金がない場合を計算しています。",
    },
    {
      pregunta: "出生時育児休業給付金とは違いますか？",
      respuesta: "出生時育児休業給付金（産後パパ育休）は別の給付で、令和8年8月1日からの支給上限額は67％で310,290円です。",
    },
  ],
  glosario: [
    { termino: "休業開始時賃金月額", definicion: "育児休業を始める前6か月の賃金をもとにした月額で、給付金の計算の基準になります。" },
    { termino: "支給単位期間", definicion: "給付金を計算する単位で、休業開始日から1か月ごとに区切った期間です。" },
  ],
});
