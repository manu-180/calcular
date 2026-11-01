import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.netten-brute-maas-hesaplama",
  h1: "Netten brüte maaş hesaplama {{anio}}",
  title: "Netten Brüte Maaş Hesaplama {{anio}}: Brüt Ne Olmalı?",
  description:
    "Anlaştığınız net maaş için işverenin bordroya yazması gereken brüt tutarı bulun. SGK, işsizlik, gelir ve damga vergisi {{anio}} oranlarıyla, ay seçerek.",
  intro: [
    "İş görüşmelerinde çoğu zaman net maaş konuşulur, bordroda ise brüt tutar yazar. Elinize geçmesini istediğiniz net tutarı ve ayı girin, gereken brüt maaşı görün.",
    "Hesaplama, brütten nete hesabının tersidir: kesintilerin hepsi aynı kurallarla hesaplanır ve sonuçtaki brüt, girdiğiniz neti kuruşuna kadar verir.",
  ],
  comoSeCalcula: [
    "Brüt maaştan işçi SGK primi ({{tr.sgk-oranlari[isci-myo]}} ve {{tr.sgk-oranlari[isci-gss]}}), işsizlik sigortası primi ({{tr.sgk-oranlari[isci-issizlik]}}), gelir vergisi ve damga vergisi ({{tr.damga-oranlari[ucret]}}) düşülür.",
    "Gelir vergisi kümülatif matraha göre hesaplanır ve asgari ücrete isabet eden vergi indirilir. Bu yüzden aynı net için gereken brüt, yıl ilerledikçe ve dilim yükseldikçe artar.",
    "Hesaplama makinesi, seçtiğiniz ayda girdiğiniz neti veren en düşük brüt maaşı arar.",
  ],
  ejemplo: [
    "Ocak ayında 40.207,53 TL net için brüt 50.000 TL gerekir. Temmuz ayında aynı brüt maaş, %20 dilimine geçildiği için 38.408,95 TL net verir.",
  ],
  faq: [
    {
      pregunta: "Net maaşım sabit kalsın istiyorum, brüt her ay değişir mi?",
      respuesta: "Evet. Net sabit tutulursa vergi dilimi yükseldikçe işverenin ödemesi gereken brüt artar. Ayı değiştirerek her ay için gereken brütü görebilirsiniz.",
    },
    {
      pregunta: "Net asgari ücretin brütü ne kadar?",
      respuesta: "Brüt asgari ücret {{tr.asgari-ucret}}. Asgari ücretten gelir ve damga vergisi kesilmediği için yalnızca SGK ve işsizlik primi düşülür.",
    },
    {
      pregunta: "Yemek veya yol yardımı hesaba dahil mi?",
      respuesta: "Hayır. Hesaplama yalnızca nakit ücreti dikkate alır. Ayni yardımların ve istisnaların vergisi ayrıca hesaplanır.",
    },
  ],
  glosario: [
    { termino: "Brüt maaş", definicion: "Kesintilerden önceki ücret, bordroda ve iş sözleşmesinde yazan tutar." },
    { termino: "Net maaş", definicion: "SGK primi, işsizlik primi, gelir vergisi ve damga vergisi düşüldükten sonra hesabınıza yatan tutar." },
  ],
});
