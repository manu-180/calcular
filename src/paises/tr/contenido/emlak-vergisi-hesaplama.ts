import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.emlak-vergisi-hesaplama",
  h1: "Emlak vergisi hesaplama 2026",
  title: "Emlak Vergisi Hesaplama 2026: Konut, İşyeri ve Arsa",
  description:
    "Konut, işyeri, arsa ve arazinin yıllık emlak vergisini hesaplayın. Büyükşehirde artırımlı oranlar, hisse payı ve iki taksit tutarı.",
  intro: [
    "Emlak vergisi, bina ve araziler için her yıl belediyeye ödenir. Vergi, belediyenin belirlediği emlak vergisi değeri üzerinden hesaplanır.",
    "Vergi değerini, taşınmazın türünü ve büyükşehir sınırları içinde olup olmadığını seçin. Hisseli bir taşınmazda payınızı yazın.",
  ],
  comoSeCalcula: [
    "Oranlar: mesken {{tr.emlak-vergisi[mesken]}}, diğer binalar {{tr.emlak-vergisi[diger-bina]}}, arsa {{tr.emlak-vergisi[arsa]}}, arazi {{tr.emlak-vergisi[arazi]}}.",
    "Büyükşehir belediye sınırları ve mücavir alanlar içinde bu oranlar {{tr.emlak-buyuksehir-artis}} artırımlı uygulanır: meskende binde 2, işyerinde binde 4 gibi.",
    "Yıllık vergi, vergi değeri ile oranın çarpımıdır. Birinci taksit mart, nisan ve mayıs aylarında, ikinci taksit kasım ayında olmak üzere iki eşit taksitte ödenebilir.",
  ],
  ejemplo: [
    "Büyükşehirdeki bir konutun emlak vergisi değeri 2.000.000 TL ise yıllık vergi binde 2 ile 4.000 TL olur. Her taksit 2.000 TL'dir.",
  ],
  faq: [
    {
      pregunta: "Emlak vergisi değerini nereden öğrenirim?",
      respuesta: "Taşınmazın bulunduğu belediyeden. Bu değer satış bedeli değildir.",
    },
    {
      pregunta: "Emlak vergisi ne zaman ödenir?",
      respuesta: "İki eşit taksitte: birincisi mart, nisan ve mayıs aylarında, ikincisi kasım ayında.",
    },
    {
      pregunta: "Tek konutu olan emekliler emlak vergisi öder mi?",
      respuesta: "Kanundaki şartları taşıyan emekliler, engelliler ve geliri olmayanlar için tek meskende indirimli (sıfır) oran uygulanabilir. Şartları belediyenize sorun.",
    },
  ],
  glosario: [
    { termino: "Mesken", definicion: "Konut olarak kullanılan bina." },
    { termino: "Mücavir alan", definicion: "Belediye sınırları dışında olup belediyenin imar denetimine bırakılan alan." },
  ],
});
