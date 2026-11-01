import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.mevduat-faizi-hesaplama",
  h1: "Mevduat faizi hesaplama",
  title: "Mevduat Faizi Hesaplama: Stopaj Sonrası Net Getiri",
  description:
    "Vadeli Türk lirası mevduatınızın net faiz getirisini hesaplayın. Brüt faiz, vadeye göre {{tr.mevduat-stopaj[bir-yil-ustu]}} ile {{tr.mevduat-stopaj[alti-ay]}} arası stopaj ve vade sonu tutarı.",
  intro: [
    "Yatıracağınız tutarı, bankanın yıllık brüt faiz oranını ve vadeyi gün olarak girin. Hesaplama makinesi brüt faizi, kesilecek stopajı ve elinize geçecek net getiriyi gösterir.",
    "Türk lirası mevduat faizinden gelir vergisi kesintisi (stopaj) yapılır. Oran vadeye göre değişir ve banka tarafından vade sonunda kesilir.",
  ],
  comoSeCalcula: [
    "Brüt faiz: anapara × yıllık faiz oranı × vade (gün) / 365.",
    "Stopaj: vadesiz ve 6 aya kadar vadeli hesaplarda {{tr.mevduat-stopaj[alti-ay]}}, 1 yıla kadar vadelilerde {{tr.mevduat-stopaj[bir-yil]}}, 1 yıldan uzun vadelilerde {{tr.mevduat-stopaj[bir-yil-ustu]}}. Hesaplama 183 güne kadar olan vadeyi 6 aya kadar, 366 güne kadar olanı 1 yıla kadar sayar.",
    "Net faiz: brüt faizden stopaj düşülünce kalan tutar. Vade sonunda hesabınızda anapara ile net faizin toplamı olur.",
  ],
  ejemplo: [
    "100.000 TL'yi yıllık yüzde 40 brüt faizle 32 günlüğüne yatırırsanız brüt faiz 3.506,85 TL olur. Yüzde 17,5 stopaj (613,70 TL) düşülünce net getiri 2.893,15 TL kalır.",
  ],
  faq: [
    {
      pregunta: "Mevduat faizinde stopaj oranı yüzde kaç?",
      respuesta: "Vadesiz ve 6 aya kadar vadeli hesaplarda {{tr.mevduat-stopaj[alti-ay]}}, 1 yıla kadar vadelilerde {{tr.mevduat-stopaj[bir-yil]}}, 1 yıldan uzun vadelilerde {{tr.mevduat-stopaj[bir-yil-ustu]}}. Bu oranlar 9 Temmuz 2025 tarihinden itibaren açılan veya vadesi yenilenen hesaplara uygulanır.",
    },
    {
      pregunta: "Döviz mevduatında oran aynı mı?",
      respuesta: "Hayır. Gelir İdaresi Başkanlığına göre döviz tevdiat hesaplarına yürütülen faizlerde stopaj, vade ayrımı olmaksızın yüzde 25 oranında kesilir. Bu sayfa Türk lirası mevduatı hesaplar.",
    },
    {
      pregunta: "Stopajı kim keser?",
      respuesta: "Faizi ödeyen banka, vade sonunda faizden kesintiyi yapar ve vergi dairesine yatırır. Hesabınıza net faiz geçer.",
    },
  ],
  glosario: [
    { termino: "Stopaj", definicion: "Faizi ödeyen bankanın gelir vergisini kaynakta kesip vergi dairesine yatırması." },
    { termino: "Vade", definicion: "Paranın bankada kalacağı ve faizin hesaplandığı süre." },
  ],
});
