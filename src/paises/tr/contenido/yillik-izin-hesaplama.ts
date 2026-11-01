import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.yillik-izin-hesaplama",
  h1: "Yıllık izin hesaplama",
  title: "Yıllık İzin Hesaplama: Kaç Gün İzin Hakkınız Var?",
  description:
    "İşe giriş tarihinize ve yaşınıza göre yıllık ücretli izin hakkınızı hesaplayın: 14, 20 veya 26 gün, yaş ve yer altı ekleri, izin ücreti.",
  intro: [
    "Aynı işverende deneme süresi dahil en az bir yıl çalışan işçi yıllık ücretli izne hak kazanır. İzin süresi tamamlanan hizmet yılına göre artar.",
    "İşe giriş tarihinizi girin. Yaşınızı ve brüt ücretinizi yazarsanız yaş kuralını ve izin süresine düşen ücreti de görürsünüz.",
  ],
  comoSeCalcula: [
    "Bir yıldan beş yıla kadar (beş yıl dahil) en az {{tr.yillik-izin[bir-bes]}}, beş yıldan fazla on beş yıldan az en az {{tr.yillik-izin[bes-onbes]}}, on beş yıl ve daha fazlasında en az {{tr.yillik-izin[onbes-ustu]}} izin verilir.",
    "18 yaş ve altındaki işçiler ile 50 yaş ve üstündekilerin izni {{tr.yillik-izin[yas-siniri]}} sürenin altında olamaz. Yer altı işlerinde çalışanların izni {{tr.yillik-izin[yeralti-ek]}} artırılır.",
    "İzin süresine denk gelen hafta tatili ile ulusal bayram ve genel tatil günleri izinden sayılmaz, süreye eklenir.",
  ],
  ejemplo: [
    "2023 yılının Mayıs ayında işe başlayan 30 yaşındaki bir işçi 2026 yılının Ekim ayında üç tam yılını doldurmuştur ve 14 gün izin hakkı vardır. Aylık brüt ücreti 30.000 TL ise izin süresine düşen ücret 14.000 TL'dir.",
  ],
  faq: [
    {
      pregunta: "Yıllık izin hakkı ne zaman doğar?",
      respuesta: "İşe başladığınız günden itibaren, deneme süresi dahil bir yıl doldurduğunuzda. Bir yıldan az süren mevsimlik veya kampanya işlerinde yıllık izin hükümleri uygulanmaz.",
    },
    {
      pregunta: "Yıllık izinden vazgeçilebilir mi?",
      respuesta: "Hayır. İş Kanununa göre yıllık ücretli izin hakkından vazgeçilemez. Sözleşmeyle kanundaki sürelerden daha uzun izin verilebilir.",
    },
    {
      pregunta: "Yarı zamanlı çalışanların izni farklı mı?",
      respuesta: "Hayır. Kısmi süreli çalışanlar yıllık ücretli izinden tam süreli çalışanlar gibi yararlanır.",
    },
  ],
  glosario: [
    { termino: "Hizmet yılı", definicion: "İşe başlama tarihinden itibaren dolan her bir yıl. İzin hakkı her yıldönümünde doğar." },
    { termino: "Yıllık ücretli izin", definicion: "İşçinin ücreti ödenerek çalışmadan geçirdiği, kanunla güvence altına alınmış dinlenme süresi." },
  ],
});
