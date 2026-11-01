import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.damga-vergisi-hesaplama",
  h1: "Damga vergisi hesaplama {{anio}}",
  title: "Damga Vergisi Hesaplama {{anio}}: Sözleşme ve Kira",
  description:
    "Sözleşme, kira sözleşmesi ve ücret makbuzlarının damga vergisini hesaplayın. Binde 9,48, binde 1,89 ve binde 7,59 oranları, {{anio}} üst sınırıyla.",
  intro: [
    "Damga vergisi, belli bir parayı içeren sözleşmeler, kira sözleşmeleri ve makbuzlar gibi kağıtlardan alınır. Oran kağıdın türüne göre değişir.",
    "Kağıdın türünü ve tutarı seçin. Kira sözleşmesinde aylık kirayı ve sözleşme süresini girin; vergi süre boyunca ödenecek toplam kira üzerinden hesaplanır.",
  ],
  comoSeCalcula: [
    "Belli parayı içeren sözleşmeler, taahhütnameler ve temliknameler: {{tr.damga-oranlari[mukavele]}}.",
    "Kira sözleşmeleri: sözleşme süresine göre kira bedeli üzerinden {{tr.damga-oranlari[kira]}}.",
    "Maaş, ücret, ikramiye, tazminat gibi ödemeler için verilen makbuzlar: {{tr.damga-oranlari[ucret]}}.",
    "Bir kağıttan alınacak damga vergisi {{tr.damga-ust-sinir}} tutarını aşamaz ({{tr.damga-ust-sinir#desde}} tarihinden itibaren).",
  ],
  ejemplo: [
    "1.000.000 TL bedelli bir sözleşmenin damga vergisi 9.480 TL'dir. Aylık 20.000 TL kiralı, 12 aylık bir kira sözleşmesinde vergi 240.000 TL üzerinden 453,60 TL olur.",
  ],
  faq: [
    {
      pregunta: "Kira sözleşmesinin damga vergisi nasıl hesaplanır?",
      respuesta: "Sözleşme süresince ödenecek toplam kira bedeli {{tr.damga-oranlari[kira]}} ile çarpılır. Bir yıllık sözleşmede aylık kiranın on iki katı esas alınır.",
    },
    {
      pregunta: "Maaştan kesilen damga vergisi ne kadar?",
      respuesta: "Brüt ücretin {{tr.damga-oranlari[ucret]}} kadarıdır. Asgari ücrete isabet eden kısım istisnadır; bunun için brütten nete maaş hesaplama sayfasını kullanın.",
    },
    {
      pregunta: "Damga vergisinin üst sınırı var mı?",
      respuesta: "Evet. 2026 için bir kağıttan alınacak damga vergisi en çok {{tr.damga-ust-sinir}} olabilir.",
    },
  ],
  glosario: [
    { termino: "Damga vergisi", definicion: "488 sayılı Kanuna ekli tablodaki kağıtlardan alınan vergi." },
    { termino: "Nispi vergi", definicion: "Kağıttaki tutarın belli bir oranı olarak alınan vergi (binde olarak ifade edilir)." },
  ],
});
