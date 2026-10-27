import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.asgari-ucret-hesaplama",
  h1: "Asgari ücret hesaplama {{anio}}",
  title: "Asgari Ücret {{anio}}: Brüt, Net ve İşveren Maliyeti",
  description:
    "{{anio}} asgari ücreti brüt {{tr.asgari-ucret}}. Net tutarı, SGK kesintilerini, günlük ücreti ve işverene maliyetini eksik gün dahil hesaplayın.",
  intro: [
    "2026 yılı için aylık brüt asgari ücret {{tr.asgari-ucret}} olarak belirlendi ({{tr.asgari-ucret#desde}} tarihinden itibaren).",
    "Asgari ücretten yalnızca SGK ve işsizlik sigortası primi kesilir. Gelir vergisi ve damga vergisi alınmaz. Ay içinde eksik çalıştıysanız gün sayısını girin.",
  ],
  comoSeCalcula: [
    "Brüt asgari ücretten {{tr.sgk-oranlari[isci-myo]}} ve {{tr.sgk-oranlari[isci-gss]}} SGK işçi primi ile {{tr.sgk-oranlari[isci-issizlik]}} işsizlik sigortası primi düşülür. Kalan tutar net asgari ücrettir.",
    "Günlük brüt asgari ücret, aylık tutarın otuzda biridir. Eksik günlerde brüt ücret günlük tutar ile çalışılan gün sayısının çarpımıdır.",
    "İşverene maliyet: brüt ücret, SGK işveren primi ve işsizlik sigortası işveren payının toplamıdır. İşyerinin yararlandığı Hazine indirimini seçebilirsiniz.",
  ],
  ejemplo: [
    "Tam ay çalışan bir işçinin brüt ücreti 33.030 TL'dir. 4.624,20 TL SGK primi ve 330,30 TL işsizlik primi düşülünce elinde 28.075,50 TL kalır.",
  ],
  faq: [
    {
      pregunta: "2026 asgari ücret net ne kadar?",
      respuesta: "Tam ay için net asgari ücret 28.075,50 TL. Brüt tutar {{tr.asgari-ucret}}.",
    },
    {
      pregunta: "Asgari ücretten vergi kesilir mi?",
      respuesta: "Hayır. 2022 yılından bu yana asgari ücret gelir vergisi ve damga vergisi dışında. Asgari ücretin üzerinde maaş alanlar için de asgari ücrete isabet eden vergi indirilir.",
    },
    {
      pregunta: "Asgari ücret yılda kaç kez belirlenir?",
      respuesta: "Asgari Ücret Tespit Komisyonu kararıyla belirlenir. 2026 tutarı tüm yıl için geçerli olarak açıklandı.",
    },
    {
      pregunta: "Günlük asgari ücret ne kadar?",
      respuesta: "Aylık brüt tutarın otuzda biri. SGK da 2026 için günlük kazanç alt sınırını 1.101 TL olarak ilan etti.",
    },
  ],
  glosario: [
    { termino: "Asgari ücret", definicion: "İşçiye normal bir çalışma günü karşılığında ödenmesi gereken en düşük ücret." },
    { termino: "Asgari Ücret Tespit Komisyonu", definicion: "İşçi, işveren ve hükümet temsilcilerinden oluşan ve asgari ücreti belirleyen kurul." },
  ],
});
