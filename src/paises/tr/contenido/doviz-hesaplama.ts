import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tr.doviz-hesaplama",
  h1: "Döviz hesaplama: dolar, euro ve sterlin",
  title: "Döviz Hesaplama: TCMB Dolar, Euro ve Sterlin Kuru",
  description:
    "Dolar, euro ve sterlini Türk lirasına ya da Türk lirasını dövize çevirin. TCMB'nin günlük gösterge niteliğindeki döviz alış kuruyla.",
  intro: [
    "Tutarı girin, dövizi ve çevirme yönünü seçin. Hesaplama, Türkiye Cumhuriyet Merkez Bankasının her iş günü yayımladığı gösterge niteliğindeki döviz alış kurunu kullanır.",
    "Son kur: 1 ABD doları {{tr.usd}} ({{tr.usd#desde}} tarihli bülten).",
  ],
  comoSeCalcula: [
    "Dövizden Türk lirasına: döviz tutarı TCMB döviz alış kuruyla çarpılır.",
    "Türk lirasından dövize: TL tutarı aynı kura bölünür.",
    "Kurlar her iş günü yayımlanan TCMB bülteninden otomatik güncellenir. Hafta sonu ve tatil günlerinde son iş gününün kuru geçerlidir.",
  ],
  ejemplo: [
    "23 Ekim 2026 tarihli bültende ABD doları döviz alış kuru 49,5647 TL'dir. Bu kurla 100 dolar 4.956,47 TL eder.",
  ],
  faq: [
    {
      pregunta: "Bankada bu kurdan döviz alabilir miyim?",
      respuesta: "Hayır. TCMB kuru gösterge niteliğindedir. Bankalar ve döviz büroları kendi alış ve satış kurlarını uygular; aradaki fark işlem maliyetidir.",
    },
    {
      pregunta: "Hangi kur kullanılıyor?",
      respuesta: "TCMB'nin gösterge niteliğindeki döviz alış kuru. Bültende ayrıca döviz satış ve efektif kurlar da yer alır.",
    },
    {
      pregunta: "Kur ne zaman güncellenir?",
      respuesta: "TCMB her iş günü yeni bir kur bülteni yayımlar. Hesaplama makinesi en son bülteni gösterir.",
    },
  ],
  glosario: [
    { termino: "Döviz alış kuru", definicion: "Bir birim yabancı paranın Türk lirası karşılığı olarak alım işlemlerinde esas alınan kur." },
    { termino: "Gösterge niteliğindeki kur", definicion: "TCMB'nin piyasa işlemlerine göre her iş günü ilan ettiği referans kur." },
  ],
});
