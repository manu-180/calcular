import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.trosak-poslodavca",
  h1: "Trošak poslodavca {{anio}}: koliko firmu košta radnik",
  title: "Trošak poslodavca {{anio}}: doprinosi {{ba.doprinosi-poslodavac-fbih-ukupno}} u FBiH",
  description: "Koliko firmu stvarno košta plata? U FBiH povrh bruta ide {{ba.doprinosi-poslodavac-fbih-ukupno}} doprinosa, u RS ništa. Upišite bruto i vidite mjesečni i godišnji trošak.",
  intro: [
    "U Federaciji BiH poslodavac na bruto dodaje {{ba.doprinosi-poslodavac-fbih-ukupno}} doprinosa. Stopa je pala u julu 2025, kada je zakon smanjio dio za penzijsko na {{ba.doprinosi-poslodavac-fbih[pio]}} i za zdravstveno na {{ba.doprinosi-poslodavac-fbih[zdravstvo]}}.",
    "U Republici Srpskoj doprinosi idu iz bruta, pa je trošak jednak bruto plati. Zato poređenje bruta između entiteta može zavarati.",
  ],
  comoSeCalcula: [
    "FBiH: bruto x {{ba.doprinosi-poslodavac-fbih-ukupno}}. Dijelovi su penzijsko {{ba.doprinosi-poslodavac-fbih[pio]}}, zdravstveno {{ba.doprinosi-poslodavac-fbih[zdravstvo]}} i nezaposlenost {{ba.doprinosi-poslodavac-fbih[nezaposlenost]}}.",
    "RS: nema doprinosa povrh bruta. Sve se plaća iz stope od {{ba.doprinosi-ukupno@rs}}.",
    "Trošak za godinu je mjesečni iznos pomnožen s 12. Topli obrok, regres i prevoz nisu uračunati.",
  ],
  ejemplo: [
    "Radnik u Sarajevu s bruto 2.000 KM košta firmu 2.100 KM mjesečno, odnosno 25.200 KM godišnje. Na račun mu stiže 1.272 KM.",
    "Radnik u Banjoj Luci s istim brutom košta 2.000 KM i prima 1.300 KM, ako mu posao nema pravo na oslobođenih {{ba.neoporezivo-rs}}.",
  ],
  faq: [
    {
      pregunta: "Kada su smanjeni doprinosi poslodavca u FBiH?",
      respuesta: "Zakon iz „Službenih novina FBiH” 33/25 u članu 4 mijenja član 10 i primjenjuje se od 1. jula 2025. Ukupno sa 10,5 odsto palo je na {{ba.doprinosi-poslodavac-fbih-ukupno}}.",
    },
    {
      pregunta: "Da li je tu sve što firma plaća na platu?",
      respuesta: "Nije. Računamo doprinose iz člana 10 Zakona o doprinosima. Posebne naknade koje propisuju kantoni i drugi propisi, te topli obrok ili regres, nisu dio obračuna.",
    },
    {
      pregunta: "Koliko najmanje može iznositi osnovica doprinosa u FBiH?",
      respuesta: "Član 7 Zakona o doprinosima kaže da osnovica ne može biti niža od najniže plate određene posebnim propisom. Kod rada do četiri sata dnevno ne može biti niža od 50 % tog iznosa.",
    },
  ],
  glosario: [
    { termino: "Doprinosi na platu", definicion: "Doprinosi koje poslodavac plaća povrh bruta." },
    { termino: "Doprinosi iz plate", definicion: "Doprinosi koji se odbijaju od bruto iznosa radnika." },
    { termino: "Trošak poslodavca", definicion: "Bruto plata zajedno s doprinosima na platu." },
  ],
});
