import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.kidem-tazminati-hesaplama",
  h1: "Kıdem tazminatı hesaplama 2026",
  title: "Kıdem Tazminatı Hesaplama 2026: Tavan ve Net Tutar",
  description:
    "İşe giriş ve çıkış tarihinizle kıdem tazminatınızı hesaplayın. 2026 kıdem tavanı {{tr.kidem-tavan}}, giydirilmiş ücret, damga vergisi ve net tutar.",
  intro: [
    "Kıdem tazminatı, aynı işverende en az bir yıl çalışan işçiye iş sözleşmesi kanunda sayılan bir nedenle sona erdiğinde ödenir. Her tam yıl için 30 günlük brüt ücret ödenir, artan süreler oranlanır.",
    "Tarihleri ve son brüt ücretinizi girin. Yol, yemek gibi düzenli ödemeleri de eklerseniz hesap giydirilmiş ücretle yapılır. Bir yıl için ödenecek tutar, çıkış tarihindeki tavanı aşamaz.",
  ],
  comoSeCalcula: [
    "Giydirilmiş ücret: son brüt ücrete düzenli olarak ödenen yol, yemek, ikramiye gibi para ve para ile ölçülebilen menfaatler eklenir.",
    "Bir yıl için esas alınan tutar: {{tr.kidem-gun}} günlük giydirilmiş ücret, yani aylık giydirilmiş ücret. Bu tutar kıdem tazminatı tavanını ({{tr.kidem-tavan}}, {{tr.kidem-tavan#desde}} tarihinden itibaren) aşamaz.",
    "Süre: tam yıllar tam tutarla, kalan aylar on ikide biri, kalan günler üç yüz altmış beşte biri oranında eklenir.",
    "Kesinti: kıdem tazminatından yalnızca damga vergisi kesilir ({{tr.damga-oranlari[ucret]}}). Gelir vergisi ve SGK primi alınmaz.",
  ],
  ejemplo: [
    "1 Mart 2021 tarihinde işe girip 16 Eylül 2026 tarihinde ayrılan, aylık brüt 50.000 TL alan bir işçinin süresi 5 yıl 6 ay 15 gündür. Brüt tazminat 277.054,79 TL, damga vergisi 2.102,85 TL, net tutar 274.951,94 TL olur.",
  ],
  faq: [
    {
      pregunta: "Kıdem tazminatı tavanı 2026 yılında ne kadar?",
      respuesta: "{{tr.kidem-tavan#desde}} tarihinden itibaren bir hizmet yılı için en çok {{tr.kidem-tavan}} ödenir. Tavan her altı ayda bir yeniden belirlenir ve iş sözleşmesinin sona erdiği tarihteki tutar uygulanır.",
    },
    {
      pregunta: "İstifa eden işçi kıdem tazminatı alır mı?",
      respuesta: "Kural olarak alamaz. Ancak askerlik, emeklilik için gereken süre ve prim gününün dolması, kadın işçinin evlendikten sonraki bir yıl içinde ayrılması ve sağlık gibi haklı nedenlerle ayrılan işçi kıdem tazminatı alır.",
    },
    {
      pregunta: "Kıdem tazminatından vergi kesilir mi?",
      respuesta: "Yalnızca damga vergisi kesilir. Çalışma ve Sosyal Güvenlik Bakanlığına göre kıdem tazminatından başka kesinti yapılmaz.",
    },
    {
      pregunta: "Kıdem tazminatına hangi ödemeler eklenir?",
      respuesta: "Ücrete ek olarak düzenli sağlanan tüm para ve para ile ölçülebilen menfaatler: yol parası, yemek parası, düzenli ödenen ikramiye ve primler gibi.",
    },
  ],
  glosario: [
    { termino: "Giydirilmiş brüt ücret", definicion: "Çıplak brüt ücrete düzenli ek ödemelerin eklenmesiyle bulunan ve kıdem tazminatında esas alınan ücret." },
    { termino: "Kıdem tazminatı tavanı", definicion: "Bir hizmet yılı için ödenebilecek en yüksek kıdem tazminatı. En yüksek devlet memuruna ödenen emeklilik ikramiyesine göre her altı ayda bir belirlenir." },
  ],
});
