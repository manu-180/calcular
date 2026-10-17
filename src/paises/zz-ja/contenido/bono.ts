import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-ja.bono",
  h1: "ゼータランドの半期賞与計算ツール",
  title: "ゼータランドの半期賞与：受け取れる金額を計算",
  description: "地域の最低賃金と{{zz.bonificacion}}の加算金をもとに、半期賞与を計算します。公的な数値を日付と出典つきで使います。",
  intro: ["半期賞与は、年2回支払われる1か月分の追加の給与です。", "半期を通して働いた場合は、1か月分の給与に加えて{{zz.bonificacion}}の加算金を受け取れます。"],
  comoSeCalcula: [
    "額面の月給から計算します。地域の最低賃金を下回る場合は、最低賃金を使います。",
    "その給与に働いた月数を掛け、6で割ります。",
    "小規模の会社では賞与は半分になります。",
    "賞与に{{zz.bonificacion}}の加算金を上乗せします。",
  ],
  faq: [
    { pregunta: "北部地域の最低賃金はいくらですか？", respuesta: "{{zz.minimo@norte}}で、{{zz.minimo@norte#desde}}から適用されています。" },
    { pregunta: "半期を通して働いていない場合は？", respuesta: "働いた月数に応じた分を受け取れます。" },
    { pregunta: "加算金は必ず支払われますか？", respuesta: "はい。賞与の{{zz.bonificacion}}で、会社が賞与とあわせて支払います。" },
  ],
  glosario: [
    { termino: "半期賞与", definicion: "法律で7月と12月に支払うことが定められた追加の給与です。" },
    { termino: "最低賃金", definicion: "各地域で1日フルタイムで働いた場合に支払うべき最低限の給与です。" },
  ],
});
