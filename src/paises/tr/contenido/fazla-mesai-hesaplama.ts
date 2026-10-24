import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.fazla-mesai-hesaplama",
  h1: "Fazla mesai hesaplama",
  title: "Fazla Mesai Hesaplama: Saat Ücreti ve Zamlı Ücret",
  description:
    "Fazla mesai ücretinizi hesaplayın: aylık brüt ücretten saat ücreti, fazla çalışmada %50, fazla sürelerle çalışmada %25 zamlı ücret ve serbest zaman karşılığı.",
  intro: [
    "Haftalık {{tr.fazla-mesai[haftalik-sure]}} saati aşan çalışma fazla çalışmadır ve her saati normal saat ücretinin yüzde {{tr.fazla-mesai[fazla-calisma-zam]}} fazlasıyla ödenir. Sözleşmenizde haftalık süre daha kısa yazıyorsa, o süreyi aşan ve 45 saate kadar olan çalışma fazla sürelerle çalışmadır.",
    "Ücretinizi aylık ya da saatlik girin, fazla çalıştığınız saati yazın. Sonuç brüt tutardır; vergi ve SGK kesintileri bordroda normal ücretle birlikte yapılır.",
  ],
  comoSeCalcula: [
    "Saat ücreti: aylık brüt ücret 30 güne, günlük ücret 7,5 saate bölünür. Haftalık 45 saat altı iş gününe eşit dağıtıldığında günde 7,5 saat eder.",
    "Fazla çalışma: saat ücreti yüzde {{tr.fazla-mesai[fazla-calisma-zam]}} artırılır. Fazla sürelerle çalışma: yüzde {{tr.fazla-mesai[fazla-sure-zam]}} artırılır.",
    "İşçi isterse ücret yerine her fazla çalışma saati için 1 saat 30 dakika, her fazla sürelerle çalışma saati için 1 saat 15 dakika serbest zaman kullanabilir. Bu zaman altı ay içinde kullanılır.",
    "Bir yılda yapılabilecek fazla çalışma en çok {{tr.fazla-mesai[yillik-azami]}} saattir ve işçinin onayı gerekir.",
  ],
  ejemplo: [
    "Brüt asgari ücretle (33.030 TL) çalışan bir işçinin saat ücreti 146,80 TL'dir. Fazla çalışmada saat başına 220,20 TL ödenir; 10 saatlik fazla mesai 2.202 TL brüt eder.",
  ],
  faq: [
    {
      pregunta: "Fazla mesai ücreti yüzde kaç zamlı ödenir?",
      respuesta: "Haftalık 45 saati aşan her saat için normal saat ücretinin yüzde {{tr.fazla-mesai[fazla-calisma-zam]}} fazlası ödenir. Sözleşmedeki süreyi aşıp 45 saate kadar kalan çalışmada zam yüzde {{tr.fazla-mesai[fazla-sure-zam]}}.",
    },
    {
      pregunta: "Haftada 44 saat çalışırsam fazla mesai alır mıyım?",
      respuesta: "Sözleşmenizde haftalık süre 45 saat ise hayır. Sözleşmede daha kısa bir süre yazıyorsa, onu aşan saatler fazla sürelerle çalışma olarak yüzde {{tr.fazla-mesai[fazla-sure-zam]}} zamlı ödenir.",
    },
    {
      pregunta: "Fazla mesai yerine izin kullanabilir miyim?",
      respuesta: "Evet. Her fazla çalışma saati için 1,5 saat serbest zaman kullanabilirsiniz. Bu süre altı ay içinde, çalışma saatleri içinde ve ücretten kesinti yapılmadan kullandırılır.",
    },
  ],
  glosario: [
    { termino: "Fazla çalışma", definicion: "Haftalık 45 saati aşan çalışma." },
    { termino: "Fazla sürelerle çalışma", definicion: "Haftalık süre sözleşmeyle 45 saatin altında belirlenmişse, bu süreyi aşan ve 45 saate kadar yapılan çalışma." },
  ],
});
