import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.ihbar-tazminati-hesaplama",
  h1: "İhbar tazminatı hesaplama 2026",
  title: "İhbar Tazminatı Hesaplama 2026: Süre ve Net Tutar",
  description:
    "Çalışma sürenize göre ihbar sürenizi (2, 4, 6 veya 8 hafta) ve ihbar tazminatınızı hesaplayın. Gelir vergisi ve damga vergisi düşülmüş net tutar.",
  intro: [
    "Belirsiz süreli iş sözleşmesini bildirim süresine uymadan fesheden taraf, bu sürenin ücretini ihbar tazminatı olarak öder. Süre, işçinin o işyerindeki çalışma süresine göre belirlenir.",
    "İşe giriş tarihinizi, fesih tarihini ve son brüt ücretinizi girin. Gelir vergisinin doğru dilimden hesaplanması için yıl içindeki kümülatif matrahınızı da yazabilirsiniz.",
  ],
  comoSeCalcula: [
    "İhbar süresi (İş Kanunu md. 17): altı aydan az çalışmada {{tr.ihbar-sureleri[alti-ay-alti]}}, altı ay ile bir buçuk yıl arasında {{tr.ihbar-sureleri[alti-ay-bucuk-yil]}}, bir buçuk ile üç yıl arasında {{tr.ihbar-sureleri[bucuk-yil-uc-yil]}}, üç yıldan fazla çalışmada {{tr.ihbar-sureleri[uc-yil-ustu]}}.",
    "Brüt tazminat: giydirilmiş aylık ücretin otuzda biri olan günlük ücret, ihbar süresinin gün sayısıyla çarpılır.",
    "Kesintiler: ihbar tazminatı ücret sayıldığı için gelir vergisine tabidir; vergi kümülatif matraha {{tr.gv-tarife-ucret[0].tasa}} ile başlayan tarife uygulanarak bulunur. Damga vergisi {{tr.damga-oranlari[ucret]}}. SGK primi kesilmez.",
  ],
  ejemplo: [
    "Üç yıldan uzun çalışan ve aylık brüt 50.000 TL alan bir işçinin ihbar süresi 8 hafta (56 gün) olur. Brüt tazminat 93.333,52 TL; yıl başında %15 dilimde gelir vergisi 14.000,03 TL ve damga vergisi 708,40 TL düşülünce net 78.625,09 TL kalır.",
  ],
  faq: [
    {
      pregunta: "İstifa eden işçi ihbar tazminatı alır mı?",
      respuesta: "Hayır. İşten kendi isteğiyle ayrılan işçiye ihbar tazminatı ödenmez. Bildirim süresine uymadan ayrılırsa işveren ondan ihbar tazminatı isteyebilir.",
    },
    {
      pregunta: "İhbar tazminatından SGK primi kesilir mi?",
      respuesta: "Hayır. SGK'ya göre iş sözleşmesi sona erdikten sonra ödenen ihbar tazminatı ücret niteliğinde olmadığından prime esas kazanca dahil edilmez.",
    },
    {
      pregunta: "Deneme süresinde çıkarılan işçi ihbar tazminatı alır mı?",
      respuesta: "Hayır. Deneme süresi içinde veya İş Kanununun 25. maddesindeki haklı nedenlerle yapılan fesihte ihbar tazminatı ödenmez.",
    },
  ],
  glosario: [
    { termino: "Bildirim süresi", definicion: "İş sözleşmesini feshetmek isteyen tarafın karşı tarafa önceden haber vermesi gereken süre." },
    { termino: "İhbar tazminatı", definicion: "Bildirim süresine uyulmadan yapılan fesihte, bu sürenin ücreti tutarında ödenen tazminat." },
  ],
});
