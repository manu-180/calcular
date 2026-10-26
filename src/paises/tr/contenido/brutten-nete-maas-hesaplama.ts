import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.brutten-nete-maas-hesaplama",
  h1: "Brütten nete maaş hesaplama 2026",
  title: "Brütten Nete Maaş Hesaplama 2026: Ay Ay Net Maaş",
  description:
    "Brüt maaşınızdan SGK primi, işsizlik sigortası, gelir vergisi ve damga vergisini düşün. Asgari ücret istisnası ve 2026 vergi dilimleriyle ay ay net maaş.",
  intro: [
    "Aylık brüt maaşınızı ve hesaplamak istediğiniz ayı girin. Hesaplama makinesi işçi SGK primini, işsizlik sigortası primini, gelir vergisini ve damga vergisini düşer, elinize geçecek net tutarı gösterir.",
    "Gelir vergisi yıl boyunca biriken matrah üzerinden hesaplandığı için aynı brüt maaşın neti yılın sonuna doğru azalır. Bu yüzden sonuçta on iki ayın tamamını da görürsünüz.",
  ],
  comoSeCalcula: [
    "SGK işçi primi: brüt maaşın {{tr.sgk-oranlari[isci-myo]}} kadarı malullük, yaşlılık ve ölüm sigortası, {{tr.sgk-oranlari[isci-gss]}} kadarı genel sağlık sigortası için kesilir. İşsizlik sigortası işçi payı {{tr.sgk-oranlari[isci-issizlik]}}. Primler en çok aylık {{tr.pek-sinirlari[ust]}} üzerinden alınır.",
    "Gelir vergisi matrahı: brüt maaştan SGK ve işsizlik primi düşülerek bulunur. Vergi, yılbaşından bu yana biriken (kümülatif) matraha 2026 tarifesi uygulanarak hesaplanır: {{tr.gv-tarife-ucret[0].hasta}} tutarına kadar {{tr.gv-tarife-ucret[0].tasa}}, sonra sırasıyla {{tr.gv-tarife-ucret[1].tasa}}, {{tr.gv-tarife-ucret[2].tasa}}, {{tr.gv-tarife-ucret[3].tasa}} ve {{tr.gv-tarife-ucret[-1].tasa}}.",
    "Asgari ücret istisnası: brüt asgari ücretin ({{tr.asgari-ucret}}) gelir vergisi matrahına düşen vergi, her ay hesaplanan vergiden indirilir. Asgari ücretin kendi kümülatif matrahı da dilimlere girdiği için istisna tutarı yıl içinde artar.",
    "Damga vergisi: brüt maaşın {{tr.damga-oranlari[ucret]}} kadarıdır. Asgari ücrete isabet eden kısım damga vergisinden de istisnadır, yani yalnızca asgari ücreti aşan kısım vergilenir.",
    "Net maaş: brüt maaştan SGK primi, işsizlik primi, kesilecek gelir vergisi ve damga vergisi çıkarılınca kalan tutardır.",
  ],
  ejemplo: [
    "2026 yılının Ocak ayında brüt 50.000 TL maaştan 7.000 TL SGK primi ve 500 TL işsizlik primi kesilir. Gelir vergisi matrahı 42.500 TL, hesaplanan vergi 6.375 TL olur. Asgari ücret istisnası (4.211,33 TL) düşülünce kesilecek gelir vergisi 2.163,67 TL kalır. Damga vergisi 128,80 TL. Net maaş: 40.207,53 TL.",
  ],
  faq: [
    {
      pregunta: "Net maaşım neden yılın ikinci yarısında düşüyor?",
      respuesta: "Gelir vergisi kümülatif matraha göre hesaplanır. Yıl içinde biriken matrah bir üst dilime geçtiğinde aynı brüt maaştan daha fazla vergi kesilir. Ocak ayında dilim yeniden başa döner.",
    },
    {
      pregunta: "Asgari ücret istisnası herkese uygulanır mı?",
      respuesta: "Evet, ücretle çalışan herkese uygulanır. Birden fazla işverenden ücret alıyorsanız istisna yalnızca en yüksek ücrete uygulanır.",
    },
    {
      pregunta: "SGK tavanı nedir?",
      respuesta: "Prim kesilen en yüksek aylık kazançtır. 2026 için aylık tutar: {{tr.pek-sinirlari[ust]}}. Bunun üstündeki maaş kısmından SGK ve işsizlik primi kesilmez, gelir vergisi ise kesilmeye devam eder.",
    },
    {
      pregunta: "Hesaplama makinesi işverenin ödediği primleri gösteriyor mu?",
      respuesta: "Hayır, bu sayfa çalışanın eline geçeni gösterir. İşverenin toplam maliyeti için işveren maliyeti hesaplama sayfasını kullanabilirsiniz.",
    },
  ],
  glosario: [
    { termino: "Kümülatif vergi matrahı", definicion: "Yılbaşından içinde bulunulan aya kadar biriken gelir vergisi matrahlarının toplamı. Vergi dilimi buna göre belirlenir." },
    { termino: "Asgari ücret istisnası", definicion: "Asgari ücrete isabet eden kazancın gelir vergisinden ve damga vergisinden muaf tutulması (Gelir Vergisi Kanunu md. 23/18)." },
    { termino: "Prime esas kazanç", definicion: "SGK priminin hesaplandığı kazanç. Alt sınırı brüt asgari ücret, üst sınırı onun dokuz katıdır." },
  ],
});
