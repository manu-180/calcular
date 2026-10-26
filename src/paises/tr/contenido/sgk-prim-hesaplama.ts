import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.sgk-prim-hesaplama",
  h1: "SGK prim hesaplama 2026",
  title: "SGK Prim Hesaplama 2026: İşçi ve İşveren Payı",
  description:
    "Brüt kazanç üzerinden SGK primini kalem kalem hesaplayın: malullük, yaşlılık ve ölüm, genel sağlık, kısa vadeli sigorta ve işsizlik, işçi ve işveren payıyla.",
  intro: [
    "Hizmet akdiyle (4/a) çalışan bir sigortalının brüt kazancını girin. Hesaplama makinesi her sigorta kolunun işçi ve işveren payını ayrı ayrı gösterir.",
    "Oranlar SGK'nın 2026 prim oranları tablosundan, prim tavanı ise 2026 prime esas kazanç sınırlarından gelir.",
  ],
  comoSeCalcula: [
    "Malullük, yaşlılık ve ölüm sigortası: işçi {{tr.sgk-oranlari[isci-myo]}}, işveren {{tr.sgk-oranlari[isveren-myo]}}.",
    "Genel sağlık sigortası: işçi {{tr.sgk-oranlari[isci-gss]}}, işveren {{tr.sgk-oranlari[isveren-gss]}}. Kısa vadeli sigorta kolları yalnızca işveren tarafından ödenir: {{tr.sgk-oranlari[isveren-kvsk]}}.",
    "İşsizlik sigortası: işçi {{tr.sgk-oranlari[isci-issizlik]}}, işveren {{tr.sgk-oranlari[isveren-issizlik]}}.",
    "Prime esas kazanç alt sınırı {{tr.pek-sinirlari[alt]}}, üst sınırı {{tr.pek-sinirlari[ust]}}. Üst sınırı aşan kazançtan prim alınmaz.",
  ],
  ejemplo: [
    "Brüt asgari ücretten (33.030 TL) işçi payı olarak 4.954,50 TL kesilir. İmalat dışı bir işyerinde işveren 2 puanlık indirimle 7.184,03 TL öder: 6.523,43 TL SGK ve 660,60 TL işsizlik.",
  ],
  faq: [
    {
      pregunta: "SGK işçi payı yüzde kaç?",
      respuesta: "Toplam {{tr.sgk-oranlari[isci-myo]}} artı {{tr.sgk-oranlari[isci-gss]}}, yani brüt kazancın yüzde 14 kadarı. Buna işsizlik sigortası işçi payı da eklenir.",
    },
    {
      pregunta: "Prim tavanı 2026 yılında neden yükseldi?",
      respuesta: "7566 sayılı Kanunla üst sınır günlük alt sınırın 7,5 katından 9 katına çıkarıldı. Aylık üst sınır: {{tr.pek-sinirlari[ust]}}.",
    },
    {
      pregunta: "Bağ-Kur (4/b) primini de hesaplıyor mu?",
      respuesta: "Hayır. Bu sayfa hizmet akdiyle çalışanların (4/a) primlerini hesaplar. Kendi adına çalışanların primi beyan ettikleri kazanç üzerinden ayrıca hesaplanır.",
    },
  ],
  glosario: [
    { termino: "4/a sigortalı", definicion: "Bir işverene hizmet akdiyle bağlı çalışan sigortalı (eski SSK)." },
    { termino: "Prime esas kazanç", definicion: "Sigorta priminin hesaplandığı brüt kazanç; alt ve üst sınırları her yıl belirlenir." },
  ],
});
