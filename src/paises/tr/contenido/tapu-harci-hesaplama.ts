import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.tapu-harci-hesaplama",
  h1: "Tapu harcı hesaplama 2026",
  title: "Tapu Harcı Hesaplama 2026: Alıcı ve Satıcı Payı",
  description:
    "Ev, arsa veya işyeri satışında tapu harcını hesaplayın. Alıcı ve satıcı için ayrı ayrı binde 20, emlak vergisi değerinden az olmamak üzere.",
  intro: [
    "Taşınmaz satışında tapu harcı alıcıdan ve satıcıdan ayrı ayrı alınır. Oran her taraf için satış bedelinin {{tr.tapu-harci}} kadarıdır, yani iki taraf birlikte bedelin yüzde 4 kadarını öder.",
    "Tapuda beyan edeceğiniz satış bedelini girin. Belediyeden aldığınız emlak vergisi değerini de yazarsanız, beyan bu değerin altında kaldığında harç doğru matrahtan hesaplanır.",
  ],
  comoSeCalcula: [
    "Harca esas değer: tapuda beyan edilen satış bedeli. 7566 sayılı Kanunla bu bedel emlak vergisi değerinden az olamaz.",
    "Alıcının harcı: harca esas değerin {{tr.tapu-harci}} kadarı. Satıcının harcı da aynı tutardır.",
    "Harçtan ayrı olarak Tapu ve Kadastro Genel Müdürlüğünün döner sermaye ücreti ödenir.",
  ],
  ejemplo: [
    "3.000.000 TL'ye satılan bir konutta alıcı 60.000 TL, satıcı 60.000 TL tapu harcı öder. Toplam harç 120.000 TL'dir.",
  ],
  faq: [
    {
      pregunta: "Tapu harcını kim öder?",
      respuesta: "Harçlar Kanununa göre alıcı ve satıcı ayrı ayrı öder; her biri için oran {{tr.tapu-harci}}.",
    },
    {
      pregunta: "Tapuda düşük bedel gösterilirse ne olur?",
      respuesta: "Harç, beyan edilen bedel emlak vergisi değerinin altındaysa emlak vergisi değeri üzerinden alınır.",
    },
    {
      pregunta: "Döner sermaye ücreti ne kadar?",
      respuesta: "Döner sermaye ücreti Tapu ve Kadastro Genel Müdürlüğünce ayrıca belirlenir ve tapu harcına dahil değildir. Bu hesaplama yalnızca tapu harcını gösterir.",
    },
  ],
  glosario: [
    { termino: "Tapu harcı", definicion: "Taşınmazın mülkiyet devrinde 492 sayılı Harçlar Kanununa göre alınan harç." },
    { termino: "Emlak vergisi değeri", definicion: "Belediyenin emlak vergisini hesapladığı ve her yıl güncellenen değer." },
  ],
});
