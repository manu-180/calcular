import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.isveren-maliyeti-hesaplama",
  h1: "İşveren maliyeti hesaplama {{anio}}",
  title: "İşveren Maliyeti Hesaplama {{anio}}: SGK İşveren Payı",
  description:
    "Bir çalışanın işverene toplam maliyetini hesaplayın: brüt maaş, SGK işveren primi ve işsizlik sigortası işveren payı, 2 ve 5 puanlık indirimle.",
  intro: [
    "Çalışanın brüt maaşını girin ve işyerinizin yararlandığı SGK indirimini seçin. Hesaplama makinesi aylık ve yıllık toplam maliyeti gösterir.",
    "İşveren, brüt maaşın üstüne SGK işveren primini ve işsizlik sigortası işveren payını öder. Bu tutarlar çalışanın maaşından kesilmez.",
  ],
  comoSeCalcula: [
    "SGK işveren primi: malullük, yaşlılık ve ölüm sigortası {{tr.sgk-oranlari[isveren-myo]}}, genel sağlık sigortası {{tr.sgk-oranlari[isveren-gss]}}, kısa vadeli sigorta kolları {{tr.sgk-oranlari[isveren-kvsk]}}.",
    "Hazine indirimi: şartları sağlayan özel sektör işverenleri için malullük, yaşlılık ve ölüm primi işveren hissesinin {{tr.sgk-tesvik[diger]}} puanı (imalat sektöründe {{tr.sgk-tesvik[imalat]}} puanı) Hazine tarafından karşılanır.",
    "İşsizlik sigortası işveren payı: {{tr.sgk-oranlari[isveren-issizlik]}}.",
    "Primler en çok aylık {{tr.pek-sinirlari[ust]}} üzerinden hesaplanır. Toplam maliyet, brüt maaş ile bu işveren primlerinin toplamıdır.",
  ],
  ejemplo: [
    "Brüt asgari ücretle çalışan bir işçinin imalat dışı bir işyerine aylık maliyeti 40.214,03 TL'dir: 33.030 TL brüt ücret, 6.523,43 TL SGK işveren primi ve 660,60 TL işsizlik sigortası işveren payı.",
  ],
  faq: [
    {
      pregunta: "SGK işveren payı 2026 yılında ne kadar?",
      respuesta: "İndirimsiz oran SGK için %21,75, işsizlik sigortası için %2. Malullük, yaşlılık ve ölüm sigortası işveren hissesi 2026 Ocak ayından itibaren bir puan artırıldı.",
    },
    {
      pregunta: "Hangi işverenler indirimden yararlanır?",
      respuesta: "Bildirgelerini ve primlerini zamanında ödeyen, SGK'ya vadesi geçmiş borcu olmayan ve kayıt dışı işçi çalıştırmayan özel sektör işverenleri. Kamu işyerleri yararlanamaz.",
    },
    {
      pregunta: "İmalat sektöründeki 5 puan ne zamana kadar geçerli?",
      respuesta: "SGK açıklamasına göre imalat sektöründe 5 puanlık indirim 2026 yılı sonuna kadar uygulanır.",
    },
  ],
  glosario: [
    { termino: "İşveren hissesi", definicion: "Primin işveren tarafından ödenen ve çalışanın ücretinden kesilmeyen kısmı." },
    { termino: "Kısa vadeli sigorta kolları", definicion: "İş kazası, meslek hastalığı, hastalık ve analık sigortası. Primin tamamını işveren öder." },
  ],
});
