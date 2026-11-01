import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.doprinosi-na-placu",
  h1: "Doprinosi na plaću {{anio}}: iz plaće i na plaću",
  title: "Doprinosi {{anio}}: mirovinsko {{hr.mio-samo-i}}, zdravstveno {{hr.zdravstveno}}",
  description: "Izračunajte doprinose: I. stup {{hr.mio-i}}, II. stup {{hr.mio-ii}}, zdravstveno {{hr.zdravstveno}}, uz umanjenje osnovice do {{hr.umanjenje-gornja}} bruto.",
  intro: [
    "Iz plaće se plaća mirovinsko: {{hr.mio-i}} za I. stup i {{hr.mio-ii}} za II. stup, ili {{hr.mio-samo-i}} ako ste samo u I. stupu. Na plaću poslodavac plaća zdravstveno od {{hr.zdravstveno}}.",
    "Kod nižih plaća osnovica I. stupa je manja, pa je i doprinos manji. Mirovinska prava pritom ostaju računata na neumanjenu osnovicu.",
  ],
  comoSeCalcula: [
    "Do {{hr.umanjenje-donja}} bruto osnovica I. stupa manja je za {{hr.umanjenje-iznos}}. Do {{hr.umanjenje-gornja}} umanjenje je pola razlike između te granice i bruto plaće.",
    "II. stup računa se na cijeli bruto, bez umanjenja, a mirovinski doprinosi najviše do {{hr.najvisa-osnovica}} mjesečno.",
    "Zdravstveno je {{hr.zdravstveno}} bruto plaće.",
  ],
  ejemplo: [
    "Bruto 2.000 eura: I. stup 300 eura, II. stup 100 eura, zdravstveno 330 eura. Ukupno 730 eura, od čega 400 eura ide iz plaće.",
    "Bruto 700 eura: osnovica I. stupa je 400 eura, pa je doprinos 60 eura. II. stup je 35 eura, a zdravstveno 115,50 eura.",
  ],
  faq: [
    {
      pregunta: "Koji iznosi vrijede za 2026.?",
      respuesta: "Naredba NN 150/2025 određuje prosječnu plaću od {{hr.prosjek-naredba}}, najnižu mjesečnu osnovicu {{hr.najniza-osnovica}}, najvišu mjesečnu {{hr.najvisa-osnovica}} i najvišu godišnju {{hr.najvisa-godisnja}}.",
    },
    {
      pregunta: "Što kaže zakon o umanjenju osnovice?",
      respuesta: "Članak 21.a Zakona o doprinosima (NN 114/2023) vrijedi od prosinca 2023. Primjenjuje se i na nepuno radno vrijeme, bez razmjernog smanjenja. Kod više poslodavaca dijeli se razmjerno plaći.",
    },
    {
      pregunta: "Plaćam li sam zdravstveno?",
      respuesta: "Ne. Doprinos od {{hr.zdravstveno}} plaća poslodavac povrh bruto plaće, pa se ne vidi kao odbitak na vašoj plaći.",
    },
  ],
  glosario: [
    { termino: "Osnovica", definicion: "Iznos na koji se računa doprinos." },
    { termino: "Generacijska solidarnost", definicion: "I. mirovinski stup, iz kojeg se plaćaju sadašnje mirovine." },
    { termino: "Kapitalizirana štednja", definicion: "II. mirovinski stup, na osobnom računu u mirovinskom fondu." },
  ],
});
