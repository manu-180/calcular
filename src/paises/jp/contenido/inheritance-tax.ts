import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jp.inheritance-tax",
  h1: "相続税の計算（配偶者と子が相続する場合）",
  title: "相続税 計算｜基礎控除と速算表で総額を計算",
  description:
    "正味の遺産額と法定相続人から、相続税の基礎控除、相続税の総額、子どもが納める税額を計算します。配偶者の税額軽減にも対応しています。",
  intro: [
    "相続税は、遺産額から基礎控除を引いた課税遺産総額を、法定相続分で分けたと仮定して計算します。",
    "配偶者と子ども、または子どもだけが相続する場合に、遺産を法定相続分どおりに分けたときの税額を計算します。",
  ],
  comoSeCalcula: [
    "基礎控除 ＝ {{jp.inheritance-basic-exemption[fixed]}} ＋ {{jp.inheritance-basic-exemption[per-heir]}} × 法定相続人の数",
    "課税遺産総額を法定相続分（配偶者2分の1、残りを子どもで等分）で分け、それぞれに税率（{{jp.inheritance-tax[0].tasa}}から{{jp.inheritance-tax[-1].tasa}}）をかけて合計したものが相続税の総額です。",
    "配偶者は、取得した遺産が{{jp.spouse-tax-relief}}と法定相続分のどちらか多い額までなら、配偶者の税額軽減で相続税がかかりません。",
  ],
  ejemplo: [
    "国税庁の例では、法定相続人が妻と子2人、課税遺産総額が1億5,200万円の場合、妻の分7,600万円に1,580万円、子の分3,800万円にそれぞれ560万円で、相続税の総額は2,700万円です。",
    "遺産を法定相続分どおりに分けると、妻の分は配偶者の税額軽減で0円になり、子2人が675万円ずつ納めます。",
  ],
  faq: [
    {
      pregunta: "相続税の基礎控除はいくらですか？",
      respuesta: "{{jp.inheritance-basic-exemption[fixed]}}に、法定相続人1人あたり{{jp.inheritance-basic-exemption[per-heir]}}を加えた額です。法定相続人が配偶者と子2人なら4,800万円です。",
    },
    {
      pregunta: "養子は法定相続人の数に入りますか？",
      respuesta: "基礎控除の計算に入れる養子の数は、実子がいる場合は1人まで、実子がいない場合は2人までです。",
    },
    {
      pregunta: "配偶者や子以外が相続するとどうなりますか？",
      respuesta: "配偶者、父母、子以外の人が財産を取得した場合は、その人の相続税額に20％が加算されます。このツールは配偶者と子が相続する場合だけを計算します。",
    },
  ],
  glosario: [
    { termino: "正味の遺産額", definicion: "相続財産から債務や葬式費用を引いた額です。" },
    { termino: "法定相続分", definicion: "民法で決められた、相続人ごとの遺産の取り分です。" },
    { termino: "課税遺産総額", definicion: "正味の遺産額から基礎控除を引いた、相続税がかかる部分です。" },
  ],
});
